package ecommerceServer.repository;

import ecommerceServer.entity.DutchAuction;
import ecommerceServer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface DutchAuctionRepository extends JpaRepository<DutchAuction, Long> {

}