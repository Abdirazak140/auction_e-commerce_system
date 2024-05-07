package ecommerceServer.exception;

public class PictureNotFoundException extends RuntimeException{
	public PictureNotFoundException(long id){
		super("Product id: " + id + " does not have an attached image");
	}
}
