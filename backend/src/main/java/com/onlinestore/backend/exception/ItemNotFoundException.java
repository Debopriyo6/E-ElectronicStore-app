package com.onlinestore.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code=HttpStatus.NOT_FOUND)
public class ItemNotFoundException extends RuntimeException {
	
	
	public ItemNotFoundException(String message) {
		super(message);
	}

}
