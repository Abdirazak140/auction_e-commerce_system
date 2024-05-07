package ecommerceServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ecommerceServer.entity.Picture;

public interface ImageRepository extends JpaRepository<Picture, Long>{
	
}
