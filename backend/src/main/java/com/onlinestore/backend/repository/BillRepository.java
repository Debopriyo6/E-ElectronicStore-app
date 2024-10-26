package com.onlinestore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinestore.backend.entity.Bill;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {

	

}
