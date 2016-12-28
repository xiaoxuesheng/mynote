package com.datayes.dataplat.thrift.impl;


import com.datayes.dataplat.thrift.HelloWorld;
import org.apache.thrift.TException;

/**
 *
 */
public class HelloWorldImpl implements HelloWorld.Iface {
    @Override
    public String sayHello(String username) throws TException {
        return "hi,"+username;
    }
}
