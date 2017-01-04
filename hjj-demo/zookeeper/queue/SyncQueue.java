package com.jd.zookeeper.test.queue;

import org.apache.log4j.Logger;
import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * 同步队列
 *
 * User: zhaoming
 * Date: 14-4-3
 * Time: 下午4:03
 * To change this template use File | Settings | File Templates.
 */
public class SyncQueue {
    private static Logger logger = Logger.getLogger(SyncQueue.class);

    // 超时时间
    private static final int SESSION_TIMEOUT = 5000;
    // zookeeper server列表
    private String hosts = "127.0.0.1:2181";
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
        logger.info("等待连接建立....");
        latch.await();
        logger.info("连接成功");
    }

    /**
     * 加入队列
     */
    private void addQueue() throws KeeperException, InterruptedException {

        Stat stat = zk.exists("/SyncQueue", false);
        if(zk.exists("/SyncQueue", false) == null){
            logger.info("同步队列节点不存在,创建同步队列节点。");
            zk.create("/SyncQueue", null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        }

        //加入队列
        thisPath = zk.create("/SyncQueue/Queue", null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
        zk.exists(thisPath, true);

        //获取队列目录下等待的数量
        List<String> nodes = zk.getChildren("/SyncQueue", false);
        logger.info("队列节点数量 ：" + nodes.size());
        if(nodes.size() > 2){
            for(String node : nodes){
                zk.delete("/SyncQueue/"+node, -1);
            }
        }

    }

    private void doSomething(){
        logger.info("得到执行权限...");
    }


    public static void main(String[] args) throws Exception {
        SyncQueue syncQueueTest = new SyncQueue();
        syncQueueTest.connectZookeeper();
        syncQueueTest.addQueue();
        while(true){
            logger.info("等待中....");
            Thread.sleep(5000);
        }
    }
}
