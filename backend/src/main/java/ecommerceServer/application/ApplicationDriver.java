package ecommerceServer.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "ecommerceServer")
@EnableJpaRepositories(basePackages = "ecommerceServer.repository")
@EntityScan("ecommerce.entity")
public class ApplicationDriver {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationDriver.class, args);
	}
}
