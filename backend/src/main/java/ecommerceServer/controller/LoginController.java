package ecommerceServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ecommerceServer.connection.LoginRequest;
import ecommerceServer.service.AuthenticationMessage;
import ecommerceServer.service.LoginService;
import jakarta.servlet.http.HttpSession;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession httpSession){
		String username = loginRequest.getUsername();
		String password = loginRequest.getPassword();
		
		AuthenticationMessage result = loginService.login(username, password);
		
		if (result.isState()) {
			httpSession.setAttribute("auth", Boolean.TRUE);
			return ResponseEntity.ok(result.getMsg());
		}
		else {
			return ResponseEntity.ok(result.getMsg());
		}
	}
	
	@GetMapping("/getAuthState")
	public ResponseEntity<Boolean> getAuthState(HttpSession httpSession){
		if (httpSession.getAttribute("auth") == null) {
			return ResponseEntity.ok(false);
		}
		return ResponseEntity.ok(true);
	}
	
	@GetMapping("/logout")
	public ResponseEntity<String> logout(HttpSession httpSession){
		httpSession.setAttribute("auth", Boolean.FALSE);
		return ResponseEntity.ok("Successful");
	}
}
