package loader;

import repository.ProductRepository;
import entity.Product;

import java.text.SimpleDateFormat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



@Configuration
class ProductLoader {

  private static final Logger log = LoggerFactory.getLogger(ProductLoader.class);

  @Bean
  CommandLineRunner initDatabase(ProductRepository repository) {

	  /*
	   * Preloaded Products 
	   */
    return args -> {
    	//SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    	
    	log.info("Preloading " + repository.save(new Product("Computer", 0.0, "2025-04-02 08:00", 0, "Forward")));
    	log.info("Preloading " + repository.save(new Product("Bean", 50.00,  "2024-04-03 09:00", 0, "Dutch")));
    };
  }
}
