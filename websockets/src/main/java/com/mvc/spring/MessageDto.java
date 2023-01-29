package com.mvc.spring;

public class MessageDto {

	private String message;

	public String getMessage() {
		return message + "in dto parsed";
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
