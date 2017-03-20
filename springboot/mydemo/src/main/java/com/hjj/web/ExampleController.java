package com.hjj.web;

import com.alibaba.dubbo.config.annotation.Reference;
import com.datayes.dataplat.webservice.DataCheckService;
import com.datayes.dataplat.webservice.DefaultDataCheckService;
import com.hjj.service.ExampleService;
import com.hjj.service.ListService;
import com.hjj.service.impl.ExampleServiceImpl;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by jianjun.hao on 2016/8/3.
 */
@RestController
public class ExampleController implements ApplicationContextAware {


    @Resource
    private ExampleService exampleService;

    private ApplicationContext applicationContext;

    @Resource
    private ListService listService;

    @Resource
    private DefaultDataCheckService defaultDataCheckService;



    @Value("${name}")
    private String name;

    @Value("${age}")
    private String age;

    @Value("${sex}")
    private int sex;

    @RequestMapping("/")
    String home() {
        return exampleService.get()+"Hello World!"+name+"||"+age+"||"+sex+"||"+applicationContext.getBean(ListService.class).showListCmd()+"||"+listService.showListCmd();
    }

    @RequestMapping("/dubbo/consumer")
    String consumer() {
        return defaultDataCheckService.isValidate();
    }

    //异常
    @ExceptionHandler(RuntimeException.class)
    public String runtimeExceptionHandler(RuntimeException runtimeException,
                                          ModelMap modelMap) {


        modelMap.put("status", 1);
        modelMap.put("message",runtimeException.getLocalizedMessage());

        return "exception";
    }




    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
