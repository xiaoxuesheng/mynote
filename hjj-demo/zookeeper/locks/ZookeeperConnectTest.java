package com.jd.zookeeper.test.locks;

import org.apache.log4j.Logger;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;
import org.junit.Test;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * Zookeeper锁连接测试类
 * User: zhaoming
 * Date: 14-3-31
 * Time: 下午4:03
 * To change this template use File | Settings | File Templates.
 */
public class ZookeeperConnectTest {

    public static Logger logger = Logger.getLogger(ZookeeperConnectTest.class);

    /**
     * server列表, 以逗号分割
     */
    protected String hosts = "127.0.0.1:2181";
    /**
     * 连接的超时时间, 毫秒
     */
    private static final int SESSION_TIMEOUT = 5000;
    /**
     * 线程锁
     */
    private CountDownLatch connectedSignal = new CountDownLatch(1);

    protected ZooKeeper zk;

    /**
     * 连接zookeeper server
     */
    @Test
    public void connect() throws Exception {
        zk = new ZooKeeper(hosts, SESSION_TIMEOUT, new Watcher(){
            public void process(WatchedEvent event) {
                logger.info("连接建立, 回调process接口");
                if (event.getState() == Event.KeeperState.SyncConnected) {
                    logger.info("放开闸门, wait在connect方法上的线程将被唤醒");
                    connectedSignal.countDown();
                }
            }
        });
        logger.info("等待连接完成");
        connectedSignal.await();

        logger.info("继续...");
    }

    public void getQueue() throws KeeperException, InterruptedException {
        if(zk.exists("/tmp", false) != null){
            List<String> strings = zk.getChildren("/tmp", false);
            Collections.sort(strings);
            System.out.println("队列节点长度 ：" + strings.size());
            for(String node : strings){
                System.out.println("node : " + node);
            }
            System.out.println("================");
        }else{
            System.out.println("队列节点不存在");
        }
    }

    public static void main(String[] args) throws Exception {
        ZookeeperConnectTest zookeeperConnectTest = new ZookeeperConnectTest();
        zookeeperConnectTest.connect();
        while(true){
            try {
                zookeeperConnectTest.getQueue();
            } catch (Exception e) {
                e.printStackTrace();
            }
            Thread.sleep(1000);
        }
    }

}

