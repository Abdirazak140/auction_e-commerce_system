package ecommerceServer.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerceServer.entity.User;
import ecommerceServer.repository.UserRepository;

@Service
public class AuthenticationService {
	
	@Autowired
	private UserRepository userRepository;
	
	public boolean validateLoginCredentials(String username, String password) {
		Optional<User> userOptional = userRepository.findByUsername(username);
		
		if (userOptional.isPresent()) {
			User user = userOptional.get();

			if (!user.getPassword().equals(password)) {
				
				return false;
				}

			return true;
			}

	        return false;
	    }
	
	public boolean validateRegistration(User user) {
		
		return true;
	}
}
