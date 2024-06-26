package ecommerceServer.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import ecommerceServer.entity.Product;
import ecommerceServer.exception.AuctionNotFoundException;
import ecommerceServer.exception.ProductNotFoundException;

public class CatalogueFunction {
	public static List<Product> filterProductByType(List<Product> productList, String type){
		List<Product> tmp = new ArrayList<Product>();
		List<Product> full = productList;
		for (int i = 0; i < full.size(); i++) {
			if (full.get(i).getAuctionType().equals(type)) {
				tmp.add(full.get(i));
			}
		}
		if (tmp.size() < 1) {
			throw new AuctionNotFoundException(type);
		}
		else {
			return tmp;
		}
	}
	
	public static List<Product> filterProductByName(List<Product> productList, String name){
		List<Product> tmp = new ArrayList<Product>();
		List<Product> full = productList;
		for (int i = 0; i < full.size(); i++) {
			if (full.get(i).getName().contains(name)) {
				tmp.add(full.get(i));
			}
		}
		if (tmp.size() < 1) {
			throw new ProductNotFoundException(name);
		}
		else {
			return tmp;
		}
	}

	public static List<Product> filterProductBySeller(List<Product> productList, long sellerId){
		List<Product> tmp = new ArrayList<Product>();
		List<Product> full = productList;
		for (int i = 0; i < full.size(); i++) {
			if (full.get(i).getSellerId() == sellerId) {
				tmp.add(full.get(i));
			}
		}
		if (tmp.size() < 1) {
			throw new ProductNotFoundException(sellerId);
		}
		else {
			return tmp;
		}
	}
	
	public static List<Product> filterProductByActive(List<Product> productList){
		List<Product> tmp = new ArrayList<Product>();
		List<Product> full = productList;
		LocalDateTime date = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		String text = date.format(formatter);
		LocalDateTime parsedDate = LocalDateTime.parse(text, formatter);
		for (int i = 0; i < full.size(); i++) {
			if (full.get(i).getAuctionType().equals("forward")) {
				if (LocalDateTime.parse(full.get(i).getEndTime(), formatter).isAfter(parsedDate)) {
					tmp.add(full.get(i));
				}
			}
		}
		if (tmp.size() < 1) {
			throw new AuctionNotFoundException("active dutch");
		}
		else {
			return tmp;
		}
	}
}
