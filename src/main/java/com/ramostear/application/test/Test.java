package com.ramostear.application.test;

import java.io.File;

public class Test {

    public static void main(String[] args) {
        File file = new File("C:\\work\\upload\\");		//获取其file对象
        File[] fs = file.listFiles();	//遍历path下的文件和目录，放在File数组中
        for(File f: fs != null ? fs : new File[0]){					//遍历File[]数组
            if(!f.isDirectory())		//若非目录(即文件)，则打印
                System.out.println(f);
        }
    }
}
