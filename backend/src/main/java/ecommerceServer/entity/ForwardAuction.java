package ecommerceServer.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ForwardAuction {


	@Id
    private Long id;

	private long productId;
	private int auctionStatus;
	private double startingPrice;
	  private String endTime;
	  private double highestBid;
	  private long currentHighestBidderId;
  
  	public ForwardAuction() {
	}
  
	public ForwardAuction(long productId, double startingPrice, String endTime) {
		this.setId(productId);
		this.setProductId(productId);
		this.setStartingPrice(startingPrice);
		this.setHighestBid(startingPrice);
		this.setAuctionStatus(1);
		this.setEndTime(endTime);
	}

	public double getHighestBid() {
		return highestBid;
	}

	public void setHighestBid(double highestBid) {
		this.highestBid = highestBid;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime2) {
		this.endTime = endTime2;
	}

	public long getCurrentHighestBidderId() {
		return currentHighestBidderId;
	}

	public void setCurrentHighestBidderId(long currentHighestBidderId) {
		this.currentHighestBidderId = currentHighestBidderId;
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

	public double getStartingPrice() {
		return startingPrice;
	}

	public void setStartingPrice(double startingPrice) {
		this.startingPrice = startingPrice;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
}
