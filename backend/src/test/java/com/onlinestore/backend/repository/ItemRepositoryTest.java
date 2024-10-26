package com.onlinestore.backend.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import com.onlinestore.backend.entity.Item;
import com.onlinestore.backend.service.ItemService;

@SpringBootTest
class ItemRepositoryTest {
	
	@Mock
	 private ItemRepository repo;
	
	@InjectMocks
	private ItemService ser;
	
	public List<Item> items;
	
	private org.slf4j.Logger logger=LoggerFactory.getLogger(this.getClass());

	

	
	
	
	@Test
	 public void test_findAllItems() {
	   List<Item> items=new ArrayList<>();
	   items.add(new Item(21,"Pizza","extra-chesse",2,99,"http:/pizza/abc", null));
	   items.add(new Item(22,"Burger","crunchy",1,56,"http:/burger/zkc", null));	
	   
	   when(repo.findAll()).thenReturn(items);
	   assertEquals(2,ser.findAllItems().size());
	}
	
	@Test
	public void test_addItem() {
	 Item item=new Item(24,"tea","irani-tea",1,20,"http:/tea/pqr/",null);
		when(repo.save(item)).thenReturn(item);
		assertEquals(item,ser.addItem(item));
		
	}
	
	@Test
	public void test_deleteAllItems() {
	 Item item=new Item(24,"tea","irani-tea",1,20,"http:/tea/pqr/",null);
		ser.deleteAllItem();
		verify(repo,times(1)).deleteAll();
		
	}
	
	
	
	
	
	
	
	}

       
	
	
	

