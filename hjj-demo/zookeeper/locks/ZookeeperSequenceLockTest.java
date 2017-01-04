package com.jd.zookeeper.test.locks;

import org.apache.log4j.Logger;
import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * Zookeeper 顺序锁实现
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
public class ZookeeperSequenceLockTest {
    private static Logger logger = Logger.getLogger(ZookeeperSequenceLockTest.class);

    // 超时时间
    private static final int SESSION_TIMEOUT = 5000;
    // zookeeper server列表
    private String hosts = "127.0.0.1:2181";
    private String groupNode = "locks";
    private String subNode = "sub";

    private ZooKeeper zk;
    // 当前client创建的子节点
    private volatile String thisPath;

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
                        System.out.println("SyncConnected---------------------------");
                        latch.countDown();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        // 等待连接建立
        logger.info("等待连接建立....");
        latch.await();

    }

    public void getLock()  throws Exception {


        if(zk.exists("/" + groupNode,false) == null){
            zk.create("/" + groupNode, "initParams".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.PERSISTENT);
        }

        List<String> nodes = zk.getChildren("/" + groupNode, false);
        if(nodes == null || nodes.size() == 0){
            thisPath = zk.create("/" + groupNode + "/" + subNode, null, ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.EPHEMERAL_SEQUENTIAL);
            logger.info("创建了一个新的");

            String queryCondition = doSomething(new String(zk.getData("/" + groupNode, false, new Stat())));
            zk.setData("/" + groupNode, queryCondition.getBytes(), -1);

        }else{
            if(this.thisPath != null && zk.exists(this.thisPath, false) != null){
                String queryCondition = doSomething(new String(zk.getData("/" + groupNode, false, new Stat())));
                zk.setData("/" + groupNode, queryCondition.getBytes(), -1);
                logger.info("继续使用已创建的");
            }else{
                logger.info("没拿到。。。");
            }
        }
    }

    /**
     * 做一些事
     * @param queryCondition 查询条件
     * @return 新查询条件
     * @throws Exception
     */
    private String doSomething(String queryCondition) throws Exception {
        logger.info("得到执行权限: " + thisPath);
        logger.info("       参数: " + queryCondition);
        return queryCondition+"a";
    }

    public static void main(String[] args) throws Exception {
        ZookeeperSequenceLockTest zookeeperSequenceLockTest = new ZookeeperSequenceLockTest();
        zookeeperSequenceLockTest.connectZookeeper();
        while(true){
            try {
                logger.info("ZookeeperSequenceLockTest ------ 获取顺序锁");
                zookeeperSequenceLockTest.getLock();
            } catch (Exception e) {
                e.printStackTrace();
            }
            Thread.sleep(5000);
        }
    }
}