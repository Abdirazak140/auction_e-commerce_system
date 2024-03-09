package ecommerceServer.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerceServer.entity.User;
import ecommerceServer.repository.UserRepository;

@Service
public class LoginService implements AuthenticationService{
	
	@Autowired
	private UserRepository userRepository;
	
	public AuthenticationMessage login(String username, String password) {
		AuthenticationMessage result;
		User loginEntry = new User();
		loginEntry.setUsername(username);
		loginEntry.setPassword(password);
		
		if (validate(loginEntry)) {
			result = new AuthenticationMessage(true, "Successful");
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
