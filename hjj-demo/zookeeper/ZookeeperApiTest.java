package com.jd.zookeeper.test;

import org.apache.log4j.Logger;
import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;
import org.junit.Test;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * Zookeeper API测试
 * User: zhaoming
 * Date: 14-4-1
 * Time: 上午9:30
 * To change this template use File | Settings | File Templates.
 */
public class ZookeeperApiTest {

    public static Logger logger = Logger.getLogger(ZookeeperApiTest.class);

    /**
     * server列表, 以逗号分割
     */
    protected String hosts = "10.25.3.88:2181,10.25.3.88:2182,10.25.3.88:2183";
    /**
     * 连接的超时时间, 毫秒
     */
    private static final int SESSION_TIMEOUT = 5000;
    /**
     * 线程锁
     */
    private CountDownLatch connectedSignal = new CountDownLatch(1);
    protected ZooKeeper zk;

    @Test
    public void apiTest() throws KeeperException, InterruptedException, IOException {

        ZooKeeper zk = new ZooKeeper(hosts, SESSION_TIMEOUT, new Watcher(){
            public void process(org.apache.zookeeper.WatchedEvent event){

                if (event.getState() == Event.KeeperState.SyncConnected) {
                    logger.info("【事件】连接完成");
                    connectedSignal.countDown();
                }

                if(event.getType() == Event.EventType.NodeCreated){
                    logger.info("【事件】节点创建");
                }
                if(event.getType() == Event.EventType.NodeDataChanged){
                    logger.info("【事件】节点数据变更");
                }
                if(event.getType() == Event.EventType.NodeDeleted){
                    logger.info("【事件】节点删除");
                }
                if(event.getType() == Event.EventType.NodeChildrenChanged){
                    logger.info("【事件】子节点变更");
                }

            }
        });
        logger.info("【动作】等待ZooKeeper连接完成");
        connectedSignal.await();
        logger.info("----------------------------------------------------------------------");

        Stat stat = zk.exists("/testRoot", true);
        if(stat == null){
            logger.info("【动作】创建一个节点testRoot, 数据是mydata,不进行ACL权限控制，节点为永久性的(即客户端shutdown了也不会消失");
            zk.create("/testRoot", "mydata".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        }

        logger.info("----------------------------------------------------------------------");

        logger.info("【动作】在testRoot下面创建一个testNode,数据为testNode,不进行ACL权限控制，节点为永久性的递增");
        zk.create("/testRoot/testNode","testNode".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);

        logger.info("----------------------------------------------------------------------");

        logger.info("【动作】取得/testRoot节点下的子节点名称,返回List<String>");
        List<String> nodeNames = zk.getChildren("/testRoot",true);
        for(String nodeName : nodeNames){
            logger.info("----节点名称 ：" + nodeName);
            logger.info("----数据内容 ：" + new String(zk.getData("/testRoot/"+nodeName, true, new Stat())));
            zk.delete("/testRoot/"+nodeName, -1);
        }


        logger.info("----------------------------------------------------------------------");
        logger.info("【动作】删除testRoot节点");
        zk.getData("/testRoot", true, new Stat());
        zk.setData("/testRoot", "testRoot".getBytes(), -1);
        zk.getData("/testRoot", true, new Stat());
        zk.delete("/testRoot", -1);

        logger.info("----------------------------------------------------------------------");
        logger.info("关闭ZooKeeper连接");
        zk.close();
    }

}
