package ecommerceServer.service;

import java.util.ArrayList;
import java.util.List;

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
}
