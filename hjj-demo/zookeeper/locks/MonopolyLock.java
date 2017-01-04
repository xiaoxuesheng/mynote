package com.jd.zookeeper.test.locks;

import org.apache.log4j.Logger;
import org.apache.zookeeper.*;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * Zookeeper 独享锁
 * User: zhaoming
 * Date: 14-5-14
 * Time: 上午9:27
 * To change this template use File | Settings | File Templates.
 */
public class MonopolyLock implements Watcher{

    public static Logger logger = Logger.getLogger(MonopolyLock.class);

    /**
     * server列表, 以逗号分割
     */
    protected String hosts = "127.0.0.1:2181";
    /**
     * 连接的超时时间, 毫秒
     */
    private static final int SESSION_TIMEOUT = 50000;
    /**
     * 线程锁
     */
    private CountDownLatch connectedSignal = new CountDownLatch(1);

    private ZooKeeper zk;

    private String thisNode;

    /**
     * 连接zookeeper server
     */
    public void connect() throws Exception {
        zk = new ZooKeeper(hosts, SESSION_TIMEOUT, this);
        logger.info("等待连接完成");
        connectedSignal.await();
        logger.info("继续...");
        registerQueue();

    }

    /**
     * 注册
     */
    public void registerQueue() throws KeeperException, InterruptedException {
        if(zk.exists("/MonopolyLock",false) == null){
            zk.create("/MonopolyLock", null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
            logger.info("独享锁节点不存在，创建独享锁节点。");
        }

        //加入队列
        thisNode = zk.create("/MonopolyLock/lock", null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
        logger.info(thisNode);
        logger.info("成功加入队列");
    }

    public void process(WatchedEvent event) {
        if (event.getState() == Event.KeeperState.SyncConnected) {
            logger.info("连接建立, 回调process接口");
            connectedSignal.countDown();
            logger.info("放开闸门, wait在connect方法上的线程将被唤醒");
        }
    }

    /**
     * 获取锁
     * @return
     * @throws KeeperException
     * @throws InterruptedException
     */
    public boolean getLock() throws KeeperException, InterruptedException {
        boolean flag = false;
        List<String> nodes = zk.getChildren("/MonopolyLock", false);
        Collections.sort(nodes);
        for(String temps : nodes){
            logger.info(temps+"_______");
        }

        if(nodes != null && nodes.size()>0){
            logger.info(nodes.get(0));
            logger.info(thisNode);
            //判断当前应用是否在队列的第一位
            if(("/MonopolyLock/" + nodes.get(0)).equals(thisNode)){

                flag = true;
            }
        }
        return flag;
    }

    public static void main(String[] args) throws Exception {
        MonopolyLock monopolyLock = new MonopolyLock();
        monopolyLock.connect();
        while(true){
            try {
                if(monopolyLock.getLock()){
                    logger.info("MonopolyLock ----------- 得到执行权限");
                }else{
                    logger.info("MonopolyLock ----------- 被拒绝");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            Thread.sleep(5000);
        }
    }
}
