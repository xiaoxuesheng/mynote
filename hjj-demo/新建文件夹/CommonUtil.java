package com.datayes.dataplat.hadoop;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Properties;

/**
 */

@Slf4j
public final class CommonUtil {

    private static Properties PROPS = null;

    static {
        PROPS = new Properties();
        try {
            PROPS.load(new InputStreamReader(CommonUtil.class.getResourceAsStream("/commons.properties"),"UTF-8"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String get(String key, String defaultValue) {
        return PROPS.getProperty(key, defaultValue);
    }

    public static String get(String key) {

        return PROPS.getProperty(key);

    }


}
