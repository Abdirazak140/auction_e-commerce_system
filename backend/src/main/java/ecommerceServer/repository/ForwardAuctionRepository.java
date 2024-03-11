package ecommerceServer.repository;

import ecommerceServer.entity.ForwardAuction;
import ecommerceServer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface ForwardAuctionRepository extends JpaRepository<ForwardAuction, Long> {

}
