package ecommerceServer.connection;

public class AuctionResponse {
	private boolean isSuccessful;
	private String msg;
	
	public AuctionResponse(boolean isSuccessful, String msg) {
		this.isSuccessful = isSuccessful;
		this.msg = msg;
	}
	
	public boolean isSuccessful() {
		return isSuccessful;
	}
	
	public void setSuccessful(boolean isSuccessful) {
		this.isSuccessful = isSuccessful;
	}
	
	public String getMsg() {
		return msg;
	}
	
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}
