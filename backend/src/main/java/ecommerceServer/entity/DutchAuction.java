package ecommerceServer.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class DutchAuction {
	@Id
    private Long id;
	
	private long productId;
	private int auctionStatus;
	private long buyerId;
	private double currentPrice;
	
	public DutchAuction() {
	}

	public DutchAuction(long productId, double startingPrice) {
		this.setId(productId);
		this.setCurrentPrice(startingPrice);
		this.setProductId(productId);
		this.setAuctionStatus(1);
	}

	public long getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(long buyerBid) {
		this.buyerId = buyerBid;
	}


	public void setCurrentPrice(long currentPrice) {
		this.currentPrice = currentPrice;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public int getAuctionStatus() {
		return auctionStatus;
	}

	public void setAuctionStatus(int auctionStatus) {
		this.auctionStatus = auctionStatus;
	}

	public double getCurrentPrice() {
		return currentPrice;
	}

	public void setCurrentPrice(double currentPrice) {
		this.currentPrice = currentPrice;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
