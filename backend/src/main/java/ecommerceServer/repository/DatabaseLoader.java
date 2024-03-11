package ecommerceServer.repository;


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
  CommandLineRunner initDatabase(UserRepository userRepository, ProductRepository productRepository, SessionRepository sessionRepository, DutchAuctionRepository dutchAuctionRepository, ForwardAuctionRepository forwardAuctionRepository) {
    return args -> {
      

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
