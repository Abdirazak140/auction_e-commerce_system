package ecommerce.exception;

public class ProductNotFoundException extends RuntimeException{
	public ProductNotFoundException(Long id){
		super("Could not find product with id: " + id);
	}
	
	public ProductNotFoundException(String name){
		super("Could not find product containing: " + name);
	}
}
