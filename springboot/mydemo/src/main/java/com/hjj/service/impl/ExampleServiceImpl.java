package com.hjj.service.impl;

import com.hjj.service.ExampleService;
import org.springframework.stereotype.Service;

/**
 * Created by jianjun.hao on 2016/8/3.
 */
@Service
public class ExampleServiceImpl implements ExampleService {
    @Override
    public String get() {
        return "service hello ";
    }
}
