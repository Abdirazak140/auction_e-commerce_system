package ecommerceServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerceServer.connection.PaymentRequest;
import ecommerceServer.connection.PaymentResult;
import ecommerceServer.service.PaymentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class PaymentController {
	
	@Autowired
	private PaymentService paymentService;
	
	//Submit Payment Request
	@PostMapping("/pay")
	public ResponseEntity<PaymentResult> login(@RequestBody PaymentRequest PaymentRequest){
		PaymentResult result = paymentService.makePayment(PaymentRequest);
		return ResponseEntity.ok(result);
	}
	
}
