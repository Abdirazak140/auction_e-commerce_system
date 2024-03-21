package ecommerceServer.connection;

public class CatalogueResponse {
	private boolean isSuccessful;
	private String msg;
	
	public CatalogueResponse(boolean isSuccessful, String msg) {
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
