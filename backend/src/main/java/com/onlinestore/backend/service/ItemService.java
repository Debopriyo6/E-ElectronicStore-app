package com.onlinestore.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinestore.backend.entity.Item;
import com.onlinestore.backend.repository.ItemRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ItemService {

	@Autowired
	private  ItemRepository repo;
	
	public List<Item> findAllItems(){
		return repo.findAll();
		
	}
	
	public Item addItem(Item items) {
		
		Item item1 = repo.save(items);
		return item1;
	}
	public Item getOneItem(int id) {
		return repo.findById(id).orElse(null);
	}
	
	public Item editItem(Item item) {
		return repo.save(item);
	}
	
	public void deleteItemById(int id) {
		repo.deleteById(id);
	}
	
	public void deleteAllItem() {
		repo.deleteAll();
	}
	
}
