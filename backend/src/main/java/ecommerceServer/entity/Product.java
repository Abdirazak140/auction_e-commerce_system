package ecommerceServer.entity;

import java.text.SimpleDateFormat;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

	private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
	private String name;
	private double currentBid;
	//Time format "yyyy-MM-dd HH:mm"
	private String endTime;
	private long currentWinnerID;
	private String auctionType;
	private long sellerId;
	
	Product() {}
	
	//
	public Product(String name, double cb, String time, long winID, String aucType, long sellerId) {
		this.name = name;
		this.currentBid = cb;
		this.endTime = time;
		this.currentWinnerID = winID;
		this.auctionType = aucType;
		this.sellerId = sellerId;
	}
	
	//Dutch Auction
	public Product(String name, double startingBid, String aucType, long sellerId) {
		this.name = name;
		this.currentBid = startingBid;
		this.auctionType = aucType;
		this.sellerId = sellerId;
	}
	
	//Forward Auction
	public Product(String name, double startingBid, String time, String aucType, long sellerId) {
		this.name = name;
		this.currentBid = startingBid;
		this.endTime = time;
		this.auctionType = aucType;
		this.sellerId = sellerId;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getCurrentBid() {
		return currentBid;
	}
	public void setCurrentBid(double currentBid) {
		this.currentBid = currentBid;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public long getCurrentWinnerID() {
		return currentWinnerID;
	}
	public void setCurrentWinnerID(long currentWinnerID) {
		this.currentWinnerID = currentWinnerID;
	}
	public String getAuctionType() {
		return auctionType;
	}
	public void setAuctionType(String auctionType) {
		this.auctionType = auctionType;
	}
	public long getSellerId() {
		return this.sellerId;
	}
	public void setSellerId(long id) {
		this.sellerId = id;
	}
	
	@Override
	public boolean equals(Object o) {

		if (this == o)
			return true;
	    if (!(o instanceof Product))
	    	return false;
	    Product prod = (Product) o;
	    return Objects.equals(this.id, prod.id); //Make more verbose later
	  }

	  @Override
	  public int hashCode() {
	    return Objects.hash(this.id, this.name, this.currentBid, this.endTime, this.currentWinnerID, this.auctionType);
	  }
}