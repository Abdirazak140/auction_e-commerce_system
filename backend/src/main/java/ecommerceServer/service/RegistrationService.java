package ecommerceServer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerceServer.entity.User;
import ecommerceServer.repository.UserRepository;

@Service
public class RegistrationService {

	@Autowired
	private UserRepository userRepository;
	
	public boolean registerUser(User user) {
		if (isValidUserData(user)) {
			if (userRepository.findByUsername(user.getUsername()) != null){
				return false;
			}
			
			userRepository.save(user);
			return true;
		}
		else {
			return false;
		}
	}
	
	private boolean isValidUserData(User user) {
		if (user == null) {
			return false;
		}
		// TODO: I am to lazy to finish the rest (tom problem)
		return true;
	}
}
