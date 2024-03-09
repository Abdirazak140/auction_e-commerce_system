package ecommerceServer.service;

public class AuthenticationMessage {
	private boolean state;
	private String msg;
	
	public AuthenticationMessage(boolean state, String msg) {
		this.state = state;
		this.msg = msg;
	}
	
	public boolean isState() {
		return state;
	}
	
	public void setState(boolean state) {
		this.state = state;
	}
	
	public String getMsg() {
		return msg;
	}
	
	public void setMsg(String msg) {
		this.msg = msg;
	}
}
