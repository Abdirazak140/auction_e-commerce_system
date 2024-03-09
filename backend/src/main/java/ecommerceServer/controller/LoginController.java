package ecommerceServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import org.springframework.ui.Model;
import ecommerceServer.connection.LoginRequest;
import ecommerceServer.service.AuthenticationMessage;
import ecommerceServer.service.LoginService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
@SessionAttributes("auth")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, Model model){
		String username = loginRequest.getUsername();
		String password = loginRequest.getPassword();
		
		AuthenticationMessage result = loginService.login(username, password);
		
		if (result.isState()) {
			model.addAttribute("auth", true);
			return ResponseEntity.ok(result.getMsg());
		}
		else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Incorrect username or password");
		}
	}
	
	@GetMapping("/getAuthState")
	public ResponseEntity<Boolean> getAuthState(@ModelAttribute("auth") Boolean state){
		if (state == null) {
			return ResponseEntity.ok(false);
		}
		return ResponseEntity.ok(state);
	}
}
