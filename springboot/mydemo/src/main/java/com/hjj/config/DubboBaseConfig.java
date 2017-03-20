package com.hjj.config;

import com.alibaba.dubbo.config.*;
import org.springframework.context.annotation.Bean;

/**
 * 通联数据机密
 * --------------------------------------------------------------------
 * 通联数据股份公司版权所有 © 2013-2017
 * <p/>
 * 注意：本文所载所有信息均属于通联数据股份公司资产。本文所包含的知识和技术概念均属于
 * 通联数据产权，并可能由中国、美国和其他国家专利或申请中的专利所覆盖，并受商业秘密或
 * 版权法保护。
 * 除非事先获得通联数据股份公司书面许可，严禁传播文中信息或复制本材料。
 * <p/>
 * DataYes CONFIDENTIAL
 * --------------------------------------------------------------------
 * Copyright © 2013-2016 DataYes, All Rights Reserved.
 * <p/>
 * NOTICE: All information contained herein is the property of DataYes
 * Incorporated. The intellectual and technical concepts contained herein are
 * proprietary to DataYes Incorporated, and may be covered by China, U.S. and
 * Other Countries Patents, patents in process, and are protected by trade
 * secret or copyright law.
 * Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is obtained from DataYes.
 * <p/>
 * Created by jianjun.hao
 * 2017/2/17.
 */
public class DubboBaseConfig {


    @Bean
    public RegistryConfig registry() {
        RegistryConfig registryConfig = new RegistryConfig();
        registryConfig.setAddress("10.24.21.83:2181");
        registryConfig.setProtocol("zookeeper");
        return registryConfig;
    }

    @Bean
    public ApplicationConfig application() {
        ApplicationConfig applicationConfig = new ApplicationConfig();
        applicationConfig.setName("springboot-dubbo-demo-client");
        return applicationConfig;
    }

    @Bean
    public MonitorConfig monitorConfig() {
        MonitorConfig mc = new MonitorConfig();
        mc.setProtocol("registry");
        return mc;
    }

//    @Bean
//    public ReferenceConfig referenceConfig() {
//        ReferenceConfig rc = new ReferenceConfig();
//        rc.setMonitor(monitorConfig());
//        return rc;
//    }

    @Bean
    public ProtocolConfig protocol() {
        ProtocolConfig protocolConfig = new ProtocolConfig();
        protocolConfig.setPort(20880);
        protocolConfig.setName("dubbo");
        return protocolConfig;
    }

    @Bean
    public ProviderConfig provider() {
        ProviderConfig providerConfig = new ProviderConfig();
//        providerConfig.setMonitor(monitorConfig());
        providerConfig.setAccepts(5);
        providerConfig.setRetries(0);
        providerConfig.setLoadbalance("leastactive");
        return providerConfig;
    }
}
