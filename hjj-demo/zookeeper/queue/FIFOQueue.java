package com.jd.zookeeper.test.queue;

import org.apache.log4j.Logger;
import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * FIFO队列
 * 实现思路如下:
 *     在特定的目录下创建 SEQUENTIAL 类型的子目录 /queue_i，这样就能保证所有成员加入队列时都是
 * 有编号的，出队列时通过 getChildren( ) 方法可以返回当前所有的队列中的元素，然后消费其中最小
 * 一个，这样就能保证 FIFO。
 *
 * User: zhaoming
 * Date: 14-4-3
 * Time: 下午4:03
 * To change this template use File | Settings | File Templates.
 */
public class FIFOQueue {
    private static Logger logger = Logger.getLogger(FIFOQueue.class);

    // 超时时间
    private static final int SESSION_TIMEOUT = 5000;
    // zookeeper server列表
    private String hosts = "127.0.0.1:2181";
    private ZooKeeper zk;
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

                    if(event.getType() == Event.EventType.NodeDeleted){
                        doSomething();
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

    /**
     * 加入队列
     */
    private void addQueue() throws KeeperException, InterruptedException {

        Stat stat = zk.exists("/FIFOQueue", false);
        if(stat == null){
            logger.info("FIFO队列节点不存在,创建FIFO队列节点。");
            zk.create("/FIFOQueue", null, ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.PERSISTENT);
        }

        //加入队列
        logger.info("加入队列");
        zk.create("/FIFOQueue/Queue", null, ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.EPHEMERAL_SEQUENTIAL);

        //获取队列目录下等待的数量
        List<String> nodes = zk.getChildren("/FIFOQueue", false);
        logger.info("队列节点数量 ：" + nodes.size());
        Collections.sort(nodes);
        if(nodes.size() > 2){
            logger.info("删除节点名称：" + "/FIFOQueue/"+nodes.get(0));
            zk.delete("/FIFOQueue/"+nodes.get(0), -1);
        }
        zk.exists("/FIFOQueue/"+nodes.get(nodes.size()-1), true);


    }

    private void doSomething() throws Exception {
        logger.info("得到执行权限...");
    }


    public static void main(String[] args) throws Exception {
        FIFOQueue fifoQueue = new FIFOQueue();
        fifoQueue.connectZookeeper();
        fifoQueue.addQueue();
        while(true){
            logger.info("等待中....");
            Thread.sleep(5000);
        }
    }
}
