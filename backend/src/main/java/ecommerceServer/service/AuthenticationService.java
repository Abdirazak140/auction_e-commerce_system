package ecommerceServer.service;

import ecommerceServer.entity.User;

public interface AuthenticationService {

	boolean validate(User user);
}
