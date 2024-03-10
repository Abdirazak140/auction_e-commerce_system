package ecommerceServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ecommerceServer.entity.Session;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long>{

	Session findBySessionId(String sessionId);
	
	void deleteBySessionId(String sessionId);
	
	void deleteById(long id);
}
