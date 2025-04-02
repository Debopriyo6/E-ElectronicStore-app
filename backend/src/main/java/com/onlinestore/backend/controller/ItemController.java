package com.onlinestore.backend.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.onlinestore.backend.entity.Item;
import com.onlinestore.backend.exception.ItemNotFoundException;
import com.onlinestore.backend.service.ItemService;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
public class ItemController {

	@Autowired
	private   ItemService service;
	
	private org.slf4j.Logger logger =LoggerFactory.getLogger(this.getClass());
	
	@GetMapping("/getitem")
	public List<Item> getfindAllItems(){
		List<Item> findAllItems = service.findAllItems();
		logger.info("List of items->{}",findAllItems);
		return findAllItems;
	}
	@GetMapping("/get/{id}")
	public Item getaddOneitem(@PathVariable int id) {
		Item item = service.getOneItem(id);
		if(item==null)
		 throw new ItemNotFoundException("This specific id item does'not exist:" +id);
		logger.info("All items->{}",item);
		return item;
	}
	
	@PostMapping("/postitem")
	public ResponseEntity<Item> getaddItem(@Valid @RequestBody Item item) {
	          Item item2 = service.addItem(item);
		URI location=ServletUriComponentsBuilder.
				fromCurrentRequest().
				path("{id}").
				buildAndExpand(item2.getId()).
				toUri();
		logger.info("item added successfully->{}",item2);
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/putitem")
	public Item geteditItem(@RequestBody Item item) {
		 Item editItem = service.editItem(item);
		 logger.info("Item details renewed successfully->{}",editItem);
		 return editItem;
		
	}
	@DeleteMapping("delitem/{id}")
	public void getdeleteItemById( @PathVariable int id) {
		logger.info("item deleted with id:",id);
		service.deleteItemById(id);
	}
	@DeleteMapping("/delitem")
	public void getdeleteAllItem() {
		logger.info("All items deleted");
		service.deleteAllItem();
	}
	
}
