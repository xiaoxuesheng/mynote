package com.datayes.dataplat.hadoop;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 *
 */
public class BeanManagerUtil implements ApplicationContextAware{


    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext arg) throws BeansException {
        applicationContext = arg;
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    public static Object getBean(String name) throws BeansException {
        return applicationContext.getBean(CommonUtil.get(name));
    }
}
