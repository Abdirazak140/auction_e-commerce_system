// UserRepository.java
package ecommerceServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ecommerceServer.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}