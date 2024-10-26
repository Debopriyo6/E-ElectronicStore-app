package com.onlinestore.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinestore.backend.entity.Bill;
import com.onlinestore.backend.repository.BillRepository;

@Service
public class BillService {

	@Autowired
	private BillRepository repo;
	
	public List<Bill> showBill(){
		return repo.findAll();
	}
	
	public Bill postBill(Bill bill) {
		return repo.save(bill);
	}
	
	public void deleteBillById(int id) {
		repo.deleteById(id);
	}
	
	public void deleteAllBill() {
		repo.deleteAll();
	}
	
	
}