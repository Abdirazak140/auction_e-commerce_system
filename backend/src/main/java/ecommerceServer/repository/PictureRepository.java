package ecommerceServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ecommerceServer.entity.Picture;

import java.time.LocalDateTime;
import java.util.List;

public interface PictureRepository extends JpaRepository<Picture, Long>{

}
