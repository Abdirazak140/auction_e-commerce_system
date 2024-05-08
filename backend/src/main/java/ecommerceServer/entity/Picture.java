package ecommerceServer.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Picture {
	
	@Lob
	private byte[] picture;
	
	@Id
	private long id;
	private String fileName;
	private String fileType;
	
	public Picture() {
	}
	
	public Picture(long id, String fileName, String fileType, byte[] picture) {
		this.id = id;
		this.fileName = fileName;
		this.fileType = fileType;
		this.picture = picture;
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

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	
}
