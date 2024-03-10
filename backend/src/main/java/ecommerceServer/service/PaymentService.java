package ecommerceServer.service;

import java.lang.reflect.Field;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerceServer.connection.PaymentRequest;
import ecommerceServer.connection.PaymentResult;
import ecommerceServer.entity.Session;
import ecommerceServer.entity.User;
import ecommerceServer.exception.UserNotFoundException;
import ecommerceServer.repository.SessionRepository;
import ecommerceServer.repository.UserRepository;

@Service
public class PaymentService {
	
	private PaymentRequest request;
	private PaymentResult response;
	
	@Autowired
	private SessionRepository sessionRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public PaymentResult makePayment(PaymentRequest request) {
		this.request = request;
		this.response = new PaymentResult();
		return validateEntry();
	}
	
	public PaymentRequest getRequest() {
		return request;
	}

	public void setRequest(PaymentRequest request) {
		this.request = request;
	}

	public PaymentResult getResponse() {
		return response;
	}

	public void setResponse(PaymentResult response) {
		this.response = response;
	}
	
    public PaymentResult validateEntry() {
        Field[] fields = request.getClass().getDeclaredFields();
        boolean validEntry = true;

        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object value = field.get(request);

                if (!isValidValue(value)) {
                    validEntry = false;
                    break;
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        if (validEntry) {
            return handlePayment();
        } else {
        	response.setErrorMsg("Error: Missing required information");
        	response.setPaymentSuccessful(false);
            
        	return sendPaymentResult();
        }
    }
    
    private boolean isValidValue(Object value) {
        return value != null && !value.toString().trim().isEmpty();
    }
    
	public PaymentResult handlePayment() {
		boolean isSuccessful = true;
		String sessionId = request.getSessionId();
		Session session = sessionRepository.findBySessionId(sessionId);
		double totalPayment = request.getTotalPayment();
		// TODO: Payment API will be used here to process payment for delieverable 3

		if (isSuccessful) {
			Optional<User> searchedUser = userRepository.findById(session.getUserId());
			User user = searchedUser.orElseThrow(() -> new UserNotFoundException(session.getUserId()));
        	response.setUser(user);
        	response.setPaymentSuccessful(true);
        	response.setTotalPaid(totalPayment);
		}
		else {
			response.setErrorMsg("Error: Payment failed");
			response.setPaymentSuccessful(false);
		}
		
		return sendPaymentResult();
	}
	
	public PaymentResult sendPaymentResult() {
		return response;
	}

}
