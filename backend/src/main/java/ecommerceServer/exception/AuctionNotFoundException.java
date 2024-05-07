package ecommerceServer.exception;

public class AuctionNotFoundException extends RuntimeException{

	public AuctionNotFoundException(String name){
		super("Could not find auction with type: " + name);
	}
}

