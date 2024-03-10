package ecommerceServer.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Session {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String sessionId;
	private boolean authState;
	private long userId;
	
	public Session(){}
	
	public Session(String sessionId, boolean authState, long userId) {
		this.sessionId = sessionId;
		this.authState = authState;
		this.userId = userId;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public long getId() {
		return id;
	}

	public boolean isAuthState() {
		return authState;
	}
	
	public void setAuthState(boolean authState) {
		this.authState = authState;
	}
	
	public String getSessionId() {
		return sessionId;
	}
	
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
	
}
