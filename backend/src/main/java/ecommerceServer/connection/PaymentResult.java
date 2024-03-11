package ecommerceServer.connection;

import ecommerceServer.entity.User;

public class PaymentResult {
	
	private boolean isPaymentSuccessful;
	private String shipmentDetails;
	private User user;
	private String productName;
	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	private double totalPaid;
	private String errorMsg;
		
	public boolean isPaymentSuccessful() {
		return isPaymentSuccessful;
	}
	
	public void setPaymentSuccessful(boolean isPaymentSuccessful) {
		this.isPaymentSuccessful = isPaymentSuccessful;
	}
	
	public String getShipmentDetails() {
		return shipmentDetails;
	}
	
	public void setShipmentDetails(String shipmentDetails) {
		this.shipmentDetails = shipmentDetails;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public double getTotalPaid() {
		return totalPaid;
	}
	
	public void setTotalPaid(double totalPaid) {
		this.totalPaid = totalPaid;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
}
