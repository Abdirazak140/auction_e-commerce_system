package ecommerceServer.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerceServer.connection.CatalogueResponse;
import ecommerceServer.entity.ForwardAuction;
import ecommerceServer.entity.Picture;
import ecommerceServer.entity.Product;
import ecommerceServer.exception.AuctionNotFoundException;
import ecommerceServer.exception.PictureNotFoundException;
import ecommerceServer.exception.ProductNotFoundException;
import ecommerceServer.repository.ImageRepository;
import ecommerceServer.repository.ProductRepository;
import java.time.LocalDateTime;

@Service
public class CatalogueService {
	
	@Autowired
	private ProductRepository catalogueRepository;
	
	@Autowired
	private ImageRepository imageRepository;
	
	//This Method should not be reached in normal use, only for testing purposes
	public CatalogueResponse updateBid(long id, double value) {
		Optional<Product> prodOptional = catalogueRepository.findById(id);
		if (!prodOptional.isPresent()) {
			return new CatalogueResponse(false, "Product with that id does not exist");
		}
		else {
			Product prod = prodOptional.get();
			//Dutch Value Checks
			if (prod.getAuctionType().equals("dutch")) {
				//Value is greater or equal to current dutch price
				if (value >= prod.getCurrentBid()) {
					return new CatalogueResponse(false, "New Price must be lower than current price");
				}
				//Value is negative
				else if (value <= 0) {
					return new CatalogueResponse(false, "New Price must be a positive value");
				}
				//Value is valid
				else {
					catalogueRepository.findById(id).map(product -> {
						product.setCurrentBid(value); 
						return catalogueRepository.save(product);
					});
					String tmp = "New price of " + value + " has been set for product " + prod.getName() + " with auction ID " + id;
					return new CatalogueResponse(true, tmp);
				}
			}
			//Forward Value Checks
			if (prod.getAuctionType().equals("forward")) {
				//Value is less or equal to current bid/starting price
				if (value <= prod.getCurrentBid()) {
					return new CatalogueResponse(false, "New bid must be higher than current price");
				}
				//Value is negative
				else if (value <= 0) {
					return new CatalogueResponse(false, "New bid must be a positive value");
				}
				//Value is valid
				else {
					catalogueRepository.findById(id).map(product -> {
						product.setCurrentBid(value);
						return catalogueRepository.save(product);
					});
					String tmp = "Bid of " + value + " has been placed for product " + prod.getName() + " with auction ID " + id;
					return new CatalogueResponse(true, tmp);
				}
			}
			return new CatalogueResponse(false, "Unknown auction type");
		}
	}
	
	public boolean inputCheck(Product prod) {
		LocalDateTime date = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		String text = date.format(formatter);
		LocalDateTime parsedDate = LocalDateTime.parse(text, formatter);
		
		if (prod.getAuctionType().equals("dutch")) {
			//Check if starting bid is higher than 0, name is not empty
			if (prod.getCurrentBid() > 0 && !prod.getName().equals("")) {
				return true;
			}
			else {
				return false;
			}
		}
		else if (prod.getAuctionType().equals("forward")) {
			//Check if starting bid is positive, name is not empty, end time is later than right now
			if (prod.getCurrentBid() >= 0 && !prod.getName().equals("") && LocalDateTime.parse(prod.getEndTime(), formatter).isAfter(parsedDate)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
	
	
	public Byte[] getProductPicture(long id) throws ProductNotFoundException, PictureNotFoundException {
		Optional<Product> prodOptional = catalogueRepository.findById(id);
		if (!prodOptional.isPresent()) {
			throw new ProductNotFoundException(id);
		}
		
		Optional<Picture> picOptional = imageRepository.findById(id);
		if (!picOptional.isPresent()) {
			throw new PictureNotFoundException(id);
		}
		else {
			Picture pic = picOptional.get();
			return pic.getPicture();
		}
		
		
	}
	
}