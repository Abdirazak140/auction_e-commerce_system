package ecommerceServer.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import ecommerceServer.repository.ProductRepository;
import ecommerceServer.entity.Product;
import ecommerceServer.exception.*;


@RestController
public class CatalogueController {
	private final ProductRepository repo;
	
	CatalogueController(ProductRepository repo){
		this.repo = repo;
	}
	
	//Get Commands
	
	//Get all products from repo
	@GetMapping("/product")
	List<Product> getAll(){
		return repo.findAll();
	}
	
	//Get Single Product by id
	@GetMapping("/product/{id}")
	Product getProductByID(@PathVariable Long id) {
		return repo.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
	}
	
	//Get Products with name containing String
	@GetMapping("/product/{name}")
	List<Product> getProductByName(@PathVariable String name){
		return CatalogueResultFilter.filterProductByName(repo.findAll(), name);
	}
	
	//Get Products with name containing string and are Dutch auctions
	@GetMapping("/product/{name}/dutch")
	List<Product> getProductByAuctionTypeDutch(@PathVariable String name){
		return CatalogueResultFilter.filterProductByType(CatalogueResultFilter.filterProductByName(repo.findAll(), name), "dutch");
	}
	
	//Get Products with name containing string and are Forward auctions
	@GetMapping("/product/{name}/forward")
	List<Product> getProductByAuctionTypeForward(@PathVariable String name){
		return CatalogueResultFilter.filterProductByType(CatalogueResultFilter.filterProductByName(repo.findAll(), name), "forward");
	}
}