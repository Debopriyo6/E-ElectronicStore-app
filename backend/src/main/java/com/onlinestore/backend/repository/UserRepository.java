package com.onlinestore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinestore.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

}
