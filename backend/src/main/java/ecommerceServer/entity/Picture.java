package ecommerceServer.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Picture {
	private byte[] picture;
	
	@Id
	private long id;
	
	public Picture() {
		
	}
	
	public Picture(long id, byte[] picture) {
		this.id = id;
		this.picture = picture;
	}

	public byte[] getPicture() {
		return picture;
	}

	public void setPicture(byte[] picture) {
		this.picture = picture;
	}

	public long getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
}
