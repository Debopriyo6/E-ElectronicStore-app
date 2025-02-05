package com.onlinestore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinestore.backend.entity.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item,Integer> {

}
