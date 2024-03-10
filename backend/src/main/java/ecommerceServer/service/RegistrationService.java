package ecommerceServer.service;

import java.lang.reflect.Field;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerceServer.connection.AuthenticationMessage;
import ecommerceServer.entity.Session;
import ecommerceServer.entity.User;
import ecommerceServer.repository.SessionRepository;
import ecommerceServer.repository.UserRepository;

@Service
public class RegistrationService implements AuthenticationService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SessionRepository sessionRepository;
	
	public AuthenticationMessage registerUser(User user) {
		
		if (validate(user)) {
			if (userRepository.findByUsername(user.getUsername()) != null){

				return new AuthenticationMessage(false, "Sorry, username '" + user.getUsername() + "' is already taken");
			}
			
			userRepository.save(user);
			String sessionId = UUID.randomUUID().toString();
			Session session = new Session(sessionId, true, user.getId());
			sessionRepository.save(session);	
			return new AuthenticationMessage(true, session.getSessionId());
		}
		else {
			return new AuthenticationMessage(false, "Missing information");
		}
	}
	
	public boolean validate(User user) {
		Field[] fields = User.class.getDeclaredFields();
		
	    for (Field field : fields) {
	        if (!field.getName().equals("id")) {
	            try {
	                field.setAccessible(true);
	                Object value = field.get(user);

	                if (!isValidValue(value)) {
	                    return false;
	                }
	            } catch (IllegalAccessException e) {
	                e.printStackTrace(); 
	            }
	        }
	    }
	    
		return true;
	}
	
    private boolean isValidValue(Object value) {
        return value != null && !value.toString().trim().isEmpty();
    }

}
