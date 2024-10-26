package com.onlinestore.backend.controller;

import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlinestore.backend.entity.Bill;
import com.onlinestore.backend.service.BillService;

@RestController
@CrossOrigin
public class BillController {
	@Autowired
	private BillService service;
	
private  org.slf4j.Logger logger=LoggerFactory.getLogger(this.getClass());
	 
	@GetMapping("/bill")
	public List<Bill> getshowBill(){
		 List<Bill> showBill = service.showBill();
		 logger.info("List of bills->{}",showBill);
		 return showBill;
	}
	
	@PostMapping("/getbill")
	public Bill getpostBill(@RequestBody Bill bill) {
		logger.info("Your Bill {}->",bill);
		return service.postBill(bill);
		
	}
	
	@DeleteMapping("delbill/{id}")
	public void getdeleteBillById(@PathVariable int id) {
		service.deleteBillById(id);
	}
	@DeleteMapping("delbill")
	public void getdeleteAllBill() {
		service.deleteAllBill();
	}
		
	}


