package ecommerceServer.service;

import java.lang.reflect.Field;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerceServer.entity.User;
import ecommerceServer.repository.UserRepository;

@Service
public class RegistrationService implements AuthenticationService{
	// TODO: Add more validation checks
	@Autowired
	private UserRepository userRepository;
	
	public AuthenticationMessage registerUser(User user) {
		
		if (validate(user)) {
			if (userRepository.findByUsername(user.getUsername()) != null){

				return new AuthenticationMessage(false, "Sorry, username '" + user.getUsername() + "' is already taken");
			}
			
			userRepository.save(user);
			return new AuthenticationMessage(true, "Successful");
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

	                if (value == null) {
	                    return false;
	                }
	            } catch (IllegalAccessException e) {
	                e.printStackTrace(); 
	            }
	        }
	    }
	    
		return true;
	}
}
