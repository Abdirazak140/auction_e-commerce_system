package ecommerceServer.exception;

public class AuctionNotFoundException extends RuntimeException{
	public AuctionNotFoundException(String type) {
		super("Count not find any products with auction type: " + type);
	}
}