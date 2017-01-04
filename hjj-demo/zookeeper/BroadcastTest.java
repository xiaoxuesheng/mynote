package com.jd.zookeeper.test;

import org.apache.log4j.Logger;
import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import java.util.concurrent.CountDownLatch;

/**
 * ZooKeeper广播测试
 *
 * User: zhaoming
 * Date: 14-4-3
 * Time: 下午4:03
 * To change this template use File | Settings | File Templates.
 */
public class BroadcastTest {
    private static Logger logger = Logger.getLogger(BroadcastTest.class);

    // 超时时间
    private static final int SESSION_TIMEOUT = 5000;
    // zookeeper server列表
    private String hosts = "127.0.0.1:2181";
    private String groupNode = "Aa";
    // 当前client创建的子节点
    private volatile String thisPath;

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
                        logger.info("连接建立成功");
                        latch.countDown();
                    }

                    if(event.getType() == Event.EventType.NodeCreated){
                        logger.info("创建Start节点");
                        doSomething();
                        zk.exists("/" + groupNode + "/start", true);
                    }
                    if(event.getType() == Event.EventType.NodeDeleted){
                        logger.info("删除Start节点");
                        zk.exists("/" + groupNode + "/start", true);
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

        Stat stat = zk.exists("/"+groupNode, false);
        if(zk.exists("/"+groupNode, false) == null){
            logger.info("队列节点不存在,创建队列节点。");
            zk.create("/" + groupNode, null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        }

        if(zk.exists("/" + groupNode + "/start", false)!=null){
            zk.delete("/" + groupNode + "/start", -1);
        }

//        logger.info("同步配置文件");
//        zk.exists("/" + groupNode + "/start", true);

        zk.create("/" + groupNode + "/start", null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);


    }

    private void doSomething() throws Exception {
        logger.info("同步配置文件...");
    }


    public static void main(String[] args) throws Exception {
        BroadcastTest broadcastTest = new BroadcastTest();

        try {
            broadcastTest.connectZookeeper();
            broadcastTest.addQueue();
        } catch (Exception e) {
            e.printStackTrace();
        }

        while(true){
            logger.info("等待中....");
            Thread.sleep(5000);
        }
    }
}
