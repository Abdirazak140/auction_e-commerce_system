package ecommerceServer.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import ecommerceServer.repository.ProductRepository;
import ecommerceServer.service.CatalogueService;
import ecommerceServer.assembler.ProductModelAssembler;
import ecommerceServer.entity.Product;
import ecommerceServer.exception.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/catalogue")
public class CatalogueController {
	@Autowired
	private final ProductRepository repo;
	@Autowired
	private final ProductModelAssembler assembler;
	
	
	CatalogueController(ProductRepository repo, ProductModelAssembler assembler){
		this.repo = repo;
		this.assembler = assembler;
	}
	
	//Get Commands
	
	//Get all products from repo
	@GetMapping("/product")
	public List<Product> getAll(){
		return repo.findAll();
	}
	/*
	public CollectionModel<EntityModel<Product>> getAll(){
		
		List<EntityModel<Product>> products = repo.findAll().stream() //
			      .map(assembler::toModel) //
			      .collect(Collectors.toList());
		
		return CollectionModel.of(products, linkTo(methodOn(CatalogueController.class).getAll()).withSelfRel());
		
	}
	*/
	
	//Get Single Product by id
	@GetMapping("/product/all/id/{id}")
	public EntityModel<Product> getProductByID(@PathVariable Long id) {
		Product product = repo.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
		return assembler.toModel(product);
	}
	
	//*** NO CLUE IF THIS METHOD WORKS IN THEORY ***
	//Get Products with name containing String
	@GetMapping("/product/all/name/{name}")
	public CollectionModel<EntityModel<Product>> getProductByName(@PathVariable String name){
		List<EntityModel<Product>> agr = CatalogueService.filterProductByName(repo.findAll(), name).stream().map(assembler::toModel).collect(Collectors.toList());
		return CollectionModel.of(agr, linkTo(methodOn(CatalogueController.class).getProductByName(name)).withSelfRel());
	}
	
	@GetMapping("/product/dutch")
	public CollectionModel<EntityModel<Product>> getDutch(){
		List<EntityModel<Product>> agr = CatalogueService.filterProductByType(repo.findAll(), "dutch").stream().map(assembler::toModel).collect(Collectors.toList());
		return CollectionModel.of(agr, linkTo(methodOn(CatalogueController.class).getDutch()).withSelfRel());
	}
	
	@GetMapping("/product/forward")
	public CollectionModel<EntityModel<Product>> getForward(){
		List<EntityModel<Product>> agr = CatalogueService.filterProductByType(repo.findAll(), "forward").stream().map(assembler::toModel).collect(Collectors.toList());
		return CollectionModel.of(agr, linkTo(methodOn(CatalogueController.class).getForward()).withSelfRel());
	}
	
	//Get Products with name containing string and are Dutch auctions
	@GetMapping("/product/dutch/{name}")
	public List<Product> getProductByAuctionTypeDutch(@PathVariable String name){
		return CatalogueService.filterProductByType(CatalogueService.filterProductByName(repo.findAll(), name), "dutch");
	}
	
	//Get Products with name containing string and are Forward auctions
	@GetMapping("/product/forward/{name}")
	public List<Product> getProductByAuctionTypeForward(@PathVariable String name){
		return CatalogueService.filterProductByType(CatalogueService.filterProductByName(repo.findAll(), name), "forward");
	}
}