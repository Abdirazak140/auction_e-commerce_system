package ecommerceServer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerceServer.connection.LoginRequest;


@RestController
@RequestMapping("/api/users")
public class LoginProxy {
	
	@PostMapping("/login")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){

		return ResponseEntity.ok(loginRequest.getUsername());
	}
}
