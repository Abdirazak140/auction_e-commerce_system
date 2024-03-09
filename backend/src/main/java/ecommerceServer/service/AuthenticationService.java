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
		User user = userRepository.findByUsername(username);
		
		if (user != null) {
			if (!user.getPassword().equals(password)) {
				
				return false;
				}

			return true;
			}

	        return false;
	    }
}
