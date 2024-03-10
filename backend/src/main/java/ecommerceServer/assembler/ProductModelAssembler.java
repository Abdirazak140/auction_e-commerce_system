package ecommerceServer.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import ecommerceServer.controller.CatalogueController;
import ecommerceServer.entity.Product;
 

@Component
public class ProductModelAssembler implements RepresentationModelAssembler<Product, EntityModel<Product>>{
	@Override
	public EntityModel<Product> toModel(Product product){
		return EntityModel.of(product,
				linkTo(methodOn(CatalogueController.class).getProductByID(product.getId())).withSelfRel(),
				linkTo(methodOn(CatalogueController.class).getAll()).withRel("products"),
				linkTo(methodOn(CatalogueController.class).getProductByName(product.getName())).withSelfRel(),//,
				linkTo(methodOn(CatalogueController.class).getProductByAuctionTypeDutch(product.getAuctionType())).withRel("dutch"),
				linkTo(methodOn(CatalogueController.class).getProductByAuctionTypeForward(product.getAuctionType())).withRel("forward"))
				;
	}
}
