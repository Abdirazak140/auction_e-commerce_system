// UserRepository.java
package ecommerceServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ecommerceServer.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);
	
	@Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = :newPassword WHERE u.username = :username")
	void updatePasswordByUsername(@Param("username") String username, @Param("newPassword") String newPassword);
}