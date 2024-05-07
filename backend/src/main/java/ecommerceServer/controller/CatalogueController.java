package ecommerceServer.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import ecommerceServer.repository.ProductRepository;
import ecommerceServer.repository.DutchAuctionRepository;
import ecommerceServer.repository.ForwardAuctionRepository;
import ecommerceServer.service.CatalogueFunction;
import ecommerceServer.service.CatalogueService;
import ecommerceServer.assembler.ProductModelAssembler;
import ecommerceServer.connection.CatalogueResponse;
import ecommerceServer.entity.Product;
import ecommerceServer.entity.DutchAuction;
import ecommerceServer.entity.ForwardAuction;
import ecommerceServer.exception.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/catalogue")
public class CatalogueController {
	@Autowired
	private final ProductRepository repo;
	@Autowired
	private final ProductModelAssembler assembler;
	@Autowired
	private final ForwardAuctionRepository forwardAucRepo;
	@Autowired
	private final DutchAuctionRepository dutchAucRepo;
	@Autowired
	private CatalogueService cataServe;
	
	
	CatalogueController(ProductRepository repo, ProductModelAssembler assembler, DutchAuctionRepository dutchAucRepo, ForwardAuctionRepository forwardAucRepo){
		this.repo = repo;
		this.assembler = assembler;
		this.dutchAucRepo = dutchAucRepo;
		this.forwardAucRepo = forwardAucRepo;
	}
	
	//Get Commands (Browse Catalogue)
	
	//Get all products from repo
	@GetMapping("/product")
	//public List<Product> getAll(){
	//	return repo.findAll();
	//}
	public CollectionModel<EntityModel<Product>> getAll(){
		
		List<EntityModel<Product>> products = repo.findAll().stream() //
			      .map(assembler::toModel) //
			      .collect(Collectors.toList());
		
		return CollectionModel.of(products, linkTo(methodOn(CatalogueController.class).getAll()).withSelfRel());
		
	}
	
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
		List<EntityModel<Product>> agr = CatalogueFunction.filterProductByName(repo.findAll(), name).stream().map(assembler::toModel).collect(Collectors.toList());
		return CollectionModel.of(agr, linkTo(methodOn(CatalogueController.class).getProductByName(name)).withSelfRel());
	}
	
	//Get All Dutch Auctions
	@GetMapping("/product/dutch")
	public CollectionModel<EntityModel<Product>> getDutch(){
		List<EntityModel<Product>> agr = CatalogueFunction.filterProductByType(repo.findAll(), "dutch").stream().map(assembler::toModel).collect(Collectors.toList());
		return CollectionModel.of(agr, linkTo(methodOn(CatalogueController.class).getDutch()).withSelfRel());
	}
	
	//Get All Forward Auctions
	@GetMapping("/product/forward")
	public CollectionModel<EntityModel<Product>> getForward(){
		List<EntityModel<Product>> agr = CatalogueFunction.filterProductByType(repo.findAll(), "forward").stream().map(assembler::toModel).collect(Collectors.toList());
		return CollectionModel.of(agr, linkTo(methodOn(CatalogueController.class).getForward()).withSelfRel());
	}
	
	//Get Products with name containing string and are Dutch auctions
	@GetMapping("/product/dutch/{name}")
	public List<Product> getProductByAuctionTypeDutch(@PathVariable String name){
		return CatalogueFunction.filterProductByType(CatalogueFunction.filterProductByName(repo.findAll(), name), "dutch");
	}
	
	//Get Products with name containing string and are Forward auctions
	@GetMapping("/product/forward/{name}")
	public List<Product> getProductByAuctionTypeForward(@PathVariable String name){
		return CatalogueFunction.filterProductByType(CatalogueFunction.filterProductByName(repo.findAll(), name), "forward");
	}
	
//	//Get Product Image Upon Request
//	@GetMapping("/product/image/{id}")
//	public byte[] getProductImage(@PathVariable long id) {
//		return cataServe.getProductPicture(id);
//	}
//	
	//Get All Products Sold By User
	@GetMapping("/product/seller")
	public List<Product> getProductBySeller(@RequestParam long sellerId){
		return CatalogueFunction.filterProductBySeller(repo.findAll(), sellerId);
	}
	
	//Put Commands (Update values of bids)
	
	//Update Value of (Bid on Forward, Purchase on Dutch)
	@PutMapping("/product/update/{id}/{value}")
	public ResponseEntity<CatalogueResponse> updateBid(@PathVariable long id, @PathVariable double value, @RequestParam long bidderId) {
		CatalogueResponse response = cataServe.updateBid(id, value, bidderId);
		return ResponseEntity.ok(response);
		/*
		return repo.findById(id)
				.map(product -> {
					product.setCurrentBid(value);
					return repo.save(product);
				})
				.orElseThrow(() -> new AuctionNotFoundException("Auction with that ID does not exist"));
		*/
	}
	
	//Updates Buy It Now price for dutch auctions (Seller Endpoint)
	@PutMapping("/product/update/dutch/{id}/{value}")
	public ResponseEntity<CatalogueResponse> updateDutchPrice(@PathVariable long auctionId, @PathVariable double value, @RequestParam long sellerId){
		CatalogueResponse response = cataServe.setDutchPrice(auctionId, value, sellerId);
		return ResponseEntity.ok(response);
	}
	
	
	//Post Commands (Create New Auctions)
	
	//Add new product to catalogue
	@PostMapping("/product/sell")
	public ResponseEntity<CatalogueResponse> createAuction(@RequestBody Product newProduct) throws ProductNotFoundException {
		if (!cataServe.inputCheck(newProduct)) {
			return ResponseEntity.ok(new CatalogueResponse(false, "Invalid Input"));
		}
		else {
			Product prod = newProduct;
			repo.save(prod);
			if (prod.getAuctionType().equals("dutch")){
				DutchAuction newAuction = new DutchAuction(
					prod.getId(),
					prod.getCurrentBid(),
					prod.getSellerId()
				);
				dutchAucRepo.save(newAuction);
				String tmp = "" + prod.getId();
				return ResponseEntity.ok(new CatalogueResponse(true, tmp));
			}
			else if (prod.getAuctionType().equals("forward")){
				ForwardAuction newAuction = new ForwardAuction(
					prod.getId(),
					prod.getCurrentBid(),
					prod.getEndTime(),
					prod.getSellerId()
				);
				forwardAucRepo.save(newAuction);
				String tmp = "" + prod.getId();
				return ResponseEntity.ok(new CatalogueResponse(true, tmp));
			}
			else {
				throw new ProductNotFoundException("Invalid Product Listing");
			}
		}
		
	}
	
	//Add image to product listing
//	@PostMapping("/product/sell/adv")
//	public ResponseEntity<CatalogueResponse> createPicture(@RequestBody Picture newPicture) throws ProductNotFoundException {
//		if (repo.findById(newPicture.getId()) != null) {
//			Picture pic = new Picture(
//					newPicture.getId(),
//					newPicture.getPicture());
//			return ResponseEntity.ok(new CatalogueResponse(true, "Image uploaded succesfully"));
//		}
//		else {
//			return ResponseEntity.ok(new CatalogueResponse(false, "Invalid"));
//		}
//	}


	//Delete Commands (Auction Finish)
	
	//Remove Auction based on Id
	@DeleteMapping("/product/end/{id}")
	public void endAuction(@PathVariable long id){
		repo.deleteById(id);

	}


}