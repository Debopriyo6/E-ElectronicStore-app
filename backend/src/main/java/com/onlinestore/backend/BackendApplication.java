package com.onlinestore.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

//import com.mysql.cj.x.protobuf.MysqlxDatatypes.Scalar.String;

@SpringBootApplication
public class BackendApplication  extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
