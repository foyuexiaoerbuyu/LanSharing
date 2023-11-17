package com.ramostear.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.management.MBeanServer;
import javax.management.ObjectName;
import java.lang.management.ManagementFactory;
import java.net.InetAddress;
import java.util.Set;

@SpringBootApplication
public class FileHandlingApplication {

	private static ConfigurableApplicationContext context;

	public static void main(String[] args) {
		context = SpringApplication.run(FileHandlingApplication.class, args);
		try {
			InetAddress addr = InetAddress.getLocalHost();
//			System.out.println("Local HostAddress: "+addr.getHostAddress()+"    = =   "+getLocalPort());
			Runtime.getRuntime().exec("cmd   /c   start   http://"+addr.getHostAddress()+":8088/files");//可以指定自己的路径
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	/**
	 * 获取当前机器端口号
	 *
	 */
	public static String getLocalPort() throws Exception {
		MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
		Set<ObjectName> objectNames = mBeanServer.queryNames(new ObjectName("*:type=Connector,*"), null);
		if (objectNames == null || objectNames.size() <= 0) {
			throw new IllegalStateException("Cannot get the names of MBeans controlled by the MBean server.");
		}
		for (ObjectName objectName : objectNames) {
			String protocol = String.valueOf(mBeanServer.getAttribute(objectName, "protocol"));
			String port = String.valueOf(mBeanServer.getAttribute(objectName, "port"));
			// windows下属性名称为HTTP/1.1, linux下为org.apache.coyote.http11.Http11NioProtocol
			if (protocol.equals("HTTP/1.1") || protocol.equals("org.apache.coyote.http11.Http11NioProtocol")) {
				return port;
			}
		}
		throw new IllegalStateException("Failed to get the HTTP port of the current server");
	}

	/**
	 * 获取当前机器的IP
	 *
	 */
	public static String getLocalIP() throws Exception {
		InetAddress addr = InetAddress.getLocalHost();
		byte[] ipAddr = addr.getAddress();
		String ipAddrStr = "";
		for (int i = 0; i < ipAddr.length; i++) {
			if (i > 0) {
				ipAddrStr += ".";
			}
			ipAddrStr += ipAddr[i] & 0xFF;
		}
		return ipAddrStr;
	}


	public static void stopApplication() {
		context.close();
	}
}
