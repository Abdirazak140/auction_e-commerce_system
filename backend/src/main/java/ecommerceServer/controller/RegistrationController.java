package ecommerceServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerceServer.entity.User;
import ecommerceServer.repository.UserRepository;
import ecommerceServer.service.AuthenticationService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class RegistrationController {
	
	private AuthenticationService authenticationService;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/register")

	public ResponseEntity<String> register(@RequestBody User user){

//		boolean isSuccessful = authenticationService.validateRegistration(user);
		
		if (true) {
			userRepository.save(user);
			return ResponseEntity.ok("Successful");
		}
		else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Registration Failed");
		}
	}
}
