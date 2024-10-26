package com.onlinestore.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.onlinestore.backend.entity.User;
import com.onlinestore.backend.exception.UserNotFoundException;
import com.onlinestore.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
public class UserController {
	@Autowired
	private UserService service;
	
	private org.slf4j.Logger logger=LoggerFactory.getLogger(this.getClass());
	
	@GetMapping("/user")
	public ResponseEntity<List<User>> getfindAllUser(){
		List<User> user = service.findAllUser();
		if(user.size()<=0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		logger.info("All user details->{}",user);
		return ResponseEntity.of(Optional.of(user));
	}
	
	@PostMapping("/postuser")
	public ResponseEntity<User> postaddUser(@Valid @RequestBody User user) {
		User addUser = service.addUser(user);
		URI location=ServletUriComponentsBuilder.
				fromCurrentRequest().
				path("{/id}").
				buildAndExpand(addUser.getId()).
				toUri();
		logger.info("User added successfully",addUser);
		return ResponseEntity.created(location).build();
	}
	
	
	@GetMapping("/user/{id}")
	public User getfindUserById(@PathVariable int id) {
		User user = service.findUserById(id);
		if(user==null)
			throw new UserNotFoundException("This id does not exist:"+id);
		logger.info("user details with id",id);
			return user;
	}
	
	
	@DeleteMapping("/del")
	public void getdeleteAllUser() {
		service.deleteAllUser();
		logger.info("All users deleted successfully");
	}
	
	
	
	@DeleteMapping("del/{id}")
	public void getdeleteUserById(@PathVariable int id) {
	    service.deleteUserById(id);
	    
	}
	
	@PutMapping("/modify")
	public ResponseEntity<User> modifyeditUserDetails(@RequestBody User user) {
		User editUserDetails = service.editUserDetails(user);
		logger.info("User details updated->{}",editUserDetails);
		return ResponseEntity.ok(editUserDetails);
		
	}

}
