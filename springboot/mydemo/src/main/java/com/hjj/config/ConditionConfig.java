package com.hjj.config;

import com.hjj.service.ListService;
import com.hjj.service.impl.LinuxListService;
import com.hjj.service.impl.WindowsListService;
import com.hjj.util.condition.LinuxCondition;
import com.hjj.util.condition.WindowsCondition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

/**
 *
 * 根据不同条件创建不同的bean
 * --------------------------------------------------------------------
 *
 */
@Configuration
public class ConditionConfig {

    @Bean
    @Conditional(WindowsCondition.class)
    public ListService windowsListService(){
        return new WindowsListService();
    }


    @Bean
    @Conditional(LinuxCondition.class)
    public ListService linuxListService(){
        return new LinuxListService();
    }




}
