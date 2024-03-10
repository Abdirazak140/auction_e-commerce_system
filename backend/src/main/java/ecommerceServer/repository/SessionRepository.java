package ecommerceServer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecommerceServer.entity.Session;


public interface SessionRepository extends JpaRepository<Session, Long>{

	Session findBySessionId(String sessionId);
	
	void deleteBySessionId(String sessionId);
	
	void deleteById(long id);
}
