package ecommerceServer.connection;

public class PaymentRequest {
	private String sessionId;
	private String creditCardNumber;
	private String nameOnCard;
	private String expDate;
	private String securityCode;
	private double totalPayment;
	private long productId;
	
	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public String getSessionId() {
		return sessionId;
	}
	
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	
	public String getCreditCardNumber() {
		return creditCardNumber;
	}
	
	public void setCreditCardNumber(String creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}
	
	public String getNameOnCard() {
		return nameOnCard;
	}
	
	public void setNameOnCard(String nameOnCard) {
		this.nameOnCard = nameOnCard;
	}
	
	public String getExpDate() {
		return expDate;
	}
	
	public void setExpDate(String expDate) {
		this.expDate = expDate;
	}
	
	public String getSecurityCode() {
		return securityCode;
	}
	
	public void setSecurityCode(String securityCode) {
		this.securityCode = securityCode;
	}

	public double getTotalPayment() {
		return totalPayment;
	}

	public void setTotalPayment(double totalPayment) {
		this.totalPayment = totalPayment;
	}
}
