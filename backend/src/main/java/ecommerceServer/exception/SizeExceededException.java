package ecommerceServer.exception;

public class SizeExceededException extends RuntimeException{
	public SizeExceededException(Long id){
		super("Could not find product with id: " + id);
	}
	
	public SizeExceededException(String name){
		super("Could not find product containing: " + name);
	}
}
