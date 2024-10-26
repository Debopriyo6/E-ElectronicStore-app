package com.onlinestore.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinestore.backend.entity.User;
import com.onlinestore.backend.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private  UserRepository repo;
	
	public List<User> findAllUser(){
		return repo.findAll();
		
	}
	public User addUser(User user) {
		return repo.save(user);
	}
	
	public User findUserById( int id) {
		return repo.findById(id).orElse(null);
	}
    
	public void deleteUserById(int id) {
		repo.deleteById(id);
	}
	public void deleteAllUser() {
		repo.deleteAll();
	}
	
	public User editUserDetails(User user) {
	return	repo.save(user);
	}
}
