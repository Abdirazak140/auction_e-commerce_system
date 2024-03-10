package ecommerceServer.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerceServer.entity.Session;
import ecommerceServer.entity.User;
import ecommerceServer.repository.SessionRepository;
import ecommerceServer.repository.UserRepository;

@Service
public class LoginService implements AuthenticationService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SessionRepository sessionRepository;
	
	public AuthenticationMessage login(String username, String password) {
		AuthenticationMessage result;
		User loginEntry = new User();
		loginEntry.setUsername(username);
		loginEntry.setPassword(password);
		
		if (validate(loginEntry)) {
			Session session = new Session();
			session.setAuthState(true);
			session.setSessionId(UUID.randomUUID().toString());
			sessionRepository.save(session);
			result = new AuthenticationMessage(true, session.getSessionId());
		}
		else {
			result = new AuthenticationMessage(false, "Incorrect username or password");
		}
		
		return result;
	 }
	
	public boolean validate(User loginEntry) {
		User user = userRepository.findByUsername(loginEntry.getUsername());
		if (user != null) {
			if (!user.getPassword().equals(loginEntry.getPassword())) {
				
				return false;
				}
		
			return true;
			}
		
		    return false;
	}
}
