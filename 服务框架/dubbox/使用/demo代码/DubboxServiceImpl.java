package com.hjj.demo.service.impl;

import com.hjj.demo.service.DubboxService;

import org.springframework.stereotype.Service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * rest协议在zookeeper上的节点名
 *
 * "rest://10.30.101.252:8080/services/com.hjj.demo.service.DubboxService?actives=10&anyhost=true&application=hjj-demo&default.accepts=5&default.loadbalance=leastactive&default.retries=0&dubbo=2.8.4&generic=false&interface=com.hjj.demo.service.DubboxService&methods=get&pid=13004&server=servlet&side=provider&timeout=7200000&timestamp=1483680702807",
 "
 *
 *
 * dubbo协议在zookeeper上的节点名
 *
 dubbo://10.30.101.252:20880/com.hjj.demo.service.DubboxService?actives=10&anyhost=true&application=hjj-demo&default.accepts=5&default.loadbalance=leastactive&default.retries=0&dubbo=2.8.4&generic=false&interface=com.hjj.demo.service.DubboxService&methods=get&pid=13004&serialization=kryo&side=provider&timeout=7200000&timestamp=1483680702357"
 */
@Service
@Path("dubbox")
public class DubboxServiceImpl implements DubboxService {

    @GET
    @Path("get")
    @Produces({MediaType.TEXT_HTML})
    @Override
    public String get() {
        return "dubbox";
    }
}
