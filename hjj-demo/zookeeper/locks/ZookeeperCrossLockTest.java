package com.jd.zookeeper.test.locks;

import org.apache.log4j.Logger;
import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * Zookeeper 交叉锁实现
 *
 * 场景描述:
 *     在分布式应用, 往往存在多个进程提供同一服务. 这些进程有可能在相同的机器上, 也有可能分布在不同的机器上.
 *     如果这些进程共享了一些资源, 可能就需要分布式锁来锁定对这些资源的访问.本文将介绍如何利用zookeeper实现
 *     分布式锁.
 *
 * 思路:
 *     进程需要访问共享数据时, 就在"/locks"节点下创建一个sequence类型的子节点, 称为thisPath. 当thisPath
 *     在所有子节点中最小时, 说明该进程获得了锁. 进程获得锁之后, 就可以访问共享资源了. 访问完成后, 需要将
 *     thisPath删除. 锁由新的最小的子节点获得.有了清晰的思路之后, 还需要补充一些细节. 进程如何知道thisPath
 *     是所有子节点中最小的呢? 可以在创建的时候, 通过getChildren方法获取子节点列表, 然后在列表中找到排名比
 *     thisPath前1位的节点, 称为waitPath, 然后在waitPath上注册监听, 当waitPath被删除后, 进程获得通知, 此
 *     时说明该进程获得了锁.
 *
 * 思考:
 *    思维缜密的朋友可能会想到, 上述的方案并不安全. 假设某个client在获得锁之前挂掉了, 由于client创建的节点是
 *    ephemeral类型的, 因此这个节点也会被删除, 从而导致排在这个client之后的client提前获得了锁. 此时会存在多
 *    个client同时访问共享资源.
 *
 *    如何解决这个问题呢? 可以在接到waitPath的删除通知的时候, 进行一次确认, 确认当前的thisPath是否真的是列表
 *    中最小的节点.
 *
 * User: zhaoming
 * Date: 14-4-2
 * Time: 上午9:32
 * To change this template use File | Settings | File Templates.
 */
public class ZookeeperCrossLockTest {
    private static Logger logger = Logger.getLogger(ZookeeperCrossLockTest.class);

    // 超时时间
    private static final int SESSION_TIMEOUT = 5000;
    // zookeeper server列表
    private String hosts = "127.0.0.1:2181";
    private String groupNode = "locks";
    private String subNode = "sub";

    private ZooKeeper zk;
    // 当前client创建的子节点
    private volatile String thisPath;
    // 当前client等待的子节点
    private volatile String waitPath;

    private CountDownLatch latch = new CountDownLatch(1);

    /**
     * 连接zookeeper
     */
    public void connectZookeeper() throws Exception {
        zk = new ZooKeeper(hosts, SESSION_TIMEOUT, new Watcher() {
            public void process(WatchedEvent event) {
                try {
                    // 连接建立时, 打开latch, 唤醒wait在该latch上的线程
                    if (event.getState() == Event.KeeperState.SyncConnected) {
                            latch.countDown();
                    }

                    // 发生了waitPath的删除事件
                    if (event.getType() == Event.EventType.NodeDeleted && event.getPath().equals(waitPath)) {
                        logger.info("NodeDeleted开始。。。。");
                        // 确认thisPath是否真的是列表中的最小节点
                        List<String> childrenNodes = zk.getChildren("/" + groupNode, false);
                        String thisNode = thisPath.substring(("/" + groupNode + "/").length());
                        // 排序
                        Collections.sort(childrenNodes);
                        int index = childrenNodes.indexOf(thisNode);
                        if (index == 0) {
                            // 确实是最小节点
                            doSomething();
                        } else {
                            // 说明waitPath是由于出现异常而挂掉的
                            // 更新waitPath
                            waitPath = "/" + groupNode + "/" + childrenNodes.get(index - 1);
                            // 重新注册监听, 并判断此时waitPath是否已删除
                            if (zk.exists(waitPath, true) == null) {
                                doSomething();
                            }
                        }
                        logger.info("NodeDeleted结束。。。。");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        // 等待连接建立
        latch.await();
        logger.info("等待连接建立....");

        //创建根节点
        if(zk.exists("/" + groupNode,false) == null){
            zk.create("/" + groupNode, "initParams".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.PERSISTENT);
        }

        // 创建子节点
        thisPath = zk.create("/" + groupNode + "/" + subNode, null, ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.EPHEMERAL_SEQUENTIAL);

        // wait一小会, 让结果更清晰一些
        Thread.sleep(10);

        // 注意, 没有必要监听"/locks"的子节点的变化情况
        List<String> childrenNodes = zk.getChildren("/" + groupNode, false);
        logger.info("childrenNodes.size ========="+childrenNodes.size());
        // 列表中只有一个子节点, 那肯定就是thisPath, 说明client获得锁
        if (childrenNodes.size() == 1) {
            doSomething();
        } else {
            String thisNode = thisPath.substring(("/" + groupNode + "/").length());
            // 排序
            Collections.sort(childrenNodes);
            int index = childrenNodes.indexOf(thisNode);
            if (index == -1) {
                // never happened
                logger.info("永远也不会进来的....");
            } else if (index == 0) {
                // inddx == 0, 说明thisNode在列表中最小, 当前client获得锁
                doSomething();
            } else {
                // 获得排名比thisPath前1位的节点
                this.waitPath = "/" + groupNode + "/" + childrenNodes.get(index - 1);
                // 在waitPath上注册监听器, 当waitPath被删除时, zookeeper会回调监听器的process方法
                zk.getData(waitPath, true, new Stat());
                logger.info("监听节点"+this.waitPath+"....");
            }
        }
    }

    private void doSomething() throws Exception {
        try {
            System.out.println("gain lock: " + thisPath);
            Thread.sleep(2000);
            logger.info("干了一些开心的事儿....");
        } finally {
            System.out.println("finished: " + thisPath);
            // 将thisPath删除, 监听thisPath的client将获得通知
            // 相当于释放锁
            zk.delete(this.thisPath, -1);
            zk.close();
        }
    }

    public static void main(String[] args) throws Exception {
        while(true){
            try {
                logger.info("ZookeeperCrossLockTest ------ begin");
                ZookeeperCrossLockTest zookeeperCrossLockTest = new ZookeeperCrossLockTest();
                zookeeperCrossLockTest.connectZookeeper();
                logger.info("ZookeeperCrossLockTest ------ end");
            } catch (Exception e) {
                e.printStackTrace();
            }
            Thread.sleep(5000);
        }
    }
}