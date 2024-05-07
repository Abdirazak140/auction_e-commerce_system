package ecommerceServer.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Picture {
	private byte[] picture;
	private String name;
	
	@Id
	private long id;
	
	public Picture() {
		
	}
	
	public Picture(long id, String name, byte[] picture) {
		this.id = id;
		this.name = name;
		this.picture = picture;
	}

	public byte[] getPicture() {
		return picture;
	}

	public void setPicture(byte[] picture) {
		this.picture = picture;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
}
