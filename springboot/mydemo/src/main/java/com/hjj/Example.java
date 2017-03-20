package com.hjj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
* Created by jianjun.hao on 2016/8/3.
*/

//@RestControlle

//@Configuration
//@EnableAutoConfiguration
//@ComponentScan
@SpringBootApplication //等价于@Configuration+@EnableAutoConfiguration+@ComponentScan
//@ImportResource("classpath:spring-boot.xml")
@PropertySource("classpath:spring-boot.properties")
//classpath下面的application.properties会自动扫描
public class Example {


    public static void main(String[] args) throws Exception {
        SpringApplication.run(Example.class, args);
    }
}
