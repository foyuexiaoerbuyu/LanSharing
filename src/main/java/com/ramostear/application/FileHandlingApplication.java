package com.ramostear.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.InetAddress;

@SpringBootApplication
public class FileHandlingApplication {

	public static void main(String[] args) {
		SpringApplication.run(FileHandlingApplication.class, args);
		try {
			InetAddress addr = InetAddress.getLocalHost();
			System.out.println("Local HostAddress: "+addr.getHostAddress());
			Runtime.getRuntime().exec("cmd   /c   start   http://"+addr.getHostAddress()+":8080/files");//可以指定自己的路径
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
