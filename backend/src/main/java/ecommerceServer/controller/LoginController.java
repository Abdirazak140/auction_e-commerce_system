package ecommerceServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerceServer.connection.LoginRequest;
import ecommerceServer.service.AuthenticationService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class LoginController {
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
		String username = loginRequest.getUsername();
		String password = loginRequest.getPassword();
		
		boolean isSuccessful = authenticationService.validateLoginCredentials(username, password);
		
		if (isSuccessful) {
			return ResponseEntity.ok("Successful");
		}
		else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Incorrect username or password");
		}
	}
}
