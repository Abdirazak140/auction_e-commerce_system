package ecommerceServer.entity;

public class Picture {
	private Byte[] picture;
	private String name;
	private long id;
	
	public Picture() {
		
	}
	
	public Picture(long id, String name, Byte[] picture) {
		this.id = id;
		this.name = name;
		this.picture = picture;
	}

	public Byte[] getPicture() {
		return picture;
	}

	public void setPicture(Byte[] picture) {
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
