package ecommerceServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerceServer.connection.AuthenticationMessage;
import ecommerceServer.entity.User;
import ecommerceServer.repository.UserRepository;
import ecommerceServer.service.RegistrationService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class RegistrationController {
	
	@Autowired
	private RegistrationService registrationService;
	
	//Create new User account
	@PutMapping("/register")
	public ResponseEntity<String> register(@RequestBody User user){
		
		AuthenticationMessage result = registrationService.registerUser(user);
		
		if (result.isState()) {
			return ResponseEntity.ok(result.getMsg());
		}
		else {
			return ResponseEntity.ok("Error: " + result.getMsg());
		}
	}
}
