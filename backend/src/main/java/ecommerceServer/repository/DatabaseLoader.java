package ecommerceServer.repository;


import ecommerceServer.entity.Product;

import java.text.SimpleDateFormat;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;



@Configuration
class DatabaseLoader {

  private static final Logger log = LoggerFactory.getLogger(DatabaseLoader.class);

  @Bean
  CommandLineRunner initDatabase(ProductRepository productRepository) {

	  /*
	   * Preloaded Products 
	   */
    return args -> {
    	//SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    	
    	log.info("Preloading " + productRepository.save(new Product("Computer", 0.0, "2025-04-02 08:00", 0, "Forward")));
    	log.info("Preloading " + productRepository.save(new Product("Bean", 50.00,  "2024-04-03 09:00", 0, "Dutch")));
    };
  }
  
  @Autowired
  Environment env;
  @Bean
  public DataSource dataSource() {
	  final DriverManagerDataSource dataSource = new DriverManagerDataSource();
	  dataSource.setDriverClassName(env.getProperty("spring.datasource.driverclass-name"));
	  dataSource.setUrl(env.getProperty("spring.datasource.url"));
	  return dataSource;
  }
  
}
