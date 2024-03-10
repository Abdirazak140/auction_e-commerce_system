package ecommerceServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ecommerceServer.connection.LoginRequest;
import ecommerceServer.entity.Session;
import ecommerceServer.repository.SessionRepository;
import ecommerceServer.service.AuthenticationMessage;
import ecommerceServer.service.LoginService;
import jakarta.servlet.http.HttpSession;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private SessionRepository sessionRepository;
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
		String username = loginRequest.getUsername();
		String password = loginRequest.getPassword();
		AuthenticationMessage result = loginService.login(username, password);
		
		if (result.isState()) {
			return ResponseEntity.ok(result.getMsg());
		}
		else {
			return ResponseEntity.ok(result.getMsg());
		}
	}
	
	@PostMapping("/getAuthState")
	public ResponseEntity<Boolean> getAuthState(@RequestParam String sessionId){
        Session session = sessionRepository.findBySessionId(sessionId);
        if (session == null) {
        	return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(session.isAuthState());
	}
	
	@DeleteMapping("/logout")
	public ResponseEntity<String> logout(@RequestParam String sessionId){
		//TODO: Implement deletebySessionId
		Session session = sessionRepository.findBySessionId(sessionId);
		sessionRepository.findById(session.getId());
		
//        sessionRepository.deleteBySessionId(sessionId);
		return ResponseEntity.ok("Successful");
	}
	
	@PatchMapping("/reset")
	public ResponseEntity<String> resetPassword(){
		//TODO: Add reset password functionality
		return ResponseEntity.ok("");
	}
}
