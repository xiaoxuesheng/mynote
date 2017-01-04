package com.jd.zookeeper.test.locks;

import org.apache.log4j.Logger;
import org.apache.zookeeper.*;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * 时序控制锁
 * User: zhaoming
 * Date: 14-5-14
 * Time: 上午9:51
 * To change this template use File | Settings | File Templates.
 */
public class SequenceLock implements Watcher{

    public static Logger logger = Logger.getLogger(MonopolyLock.class);

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
        if(zk.exists("/SequenceLock",false) == null){
            zk.create("/SequenceLock", null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
            logger.info("时序锁节点不存在，创建时序锁节点。");
        }

        //加入队列
        thisNode = zk.create("/SequenceLock/lock", null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
        logger.info("成功加入队列");
    }

    public void process(WatchedEvent event) {
        if (event.getState() == Watcher.Event.KeeperState.SyncConnected) {
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
        List<String> nodes = zk.getChildren("/SequenceLock", false);
        Collections.sort(nodes);
        if(nodes != null && nodes.size()>0){
            //判断当前应用是否在队列的第一位
            if(("/SequenceLock/" + nodes.get(0)).equals(thisNode)){
                zk.delete(thisNode, -1);          //释放
                flag = true;
            }
        }
        return flag;
    }

    public static void main(String[] args) throws Exception {
        SequenceLock sequenceLock = new SequenceLock();
        sequenceLock.connect();
        while(true){
            try {
                if(sequenceLock.getLock()){
                    logger.info("SequenceLock ----------- 得到执行权限");
                    sequenceLock.registerQueue();
                }else{
                    logger.info("SequenceLock ----------- 被拒绝");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            Thread.sleep(5000);
        }
    }
}
