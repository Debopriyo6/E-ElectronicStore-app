package com.onlinestore.backend.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import com.onlinestore.backend.entity.User;
import com.onlinestore.backend.service.UserService;

@SpringBootTest(classes= {UserRepositoryTest.class})
class UserRepositoryTest {
	
	
	@Mock
	private  UserRepository repo;
	
	@InjectMocks
	private UserService ser;
	
	
	private org.slf4j.Logger logger=LoggerFactory.getLogger(this.getClass());
     

	public  List<User> users;

	
	@Test
	public void testfindAllUser() {
		
		List<User> users=new ArrayList<User>();
		users.add(new User(1,"adam","adam@gmail.com","kolkata",798093756, null));
		users.add(new User(2,"alex","alex@gmail.com","kolkata",798093785, null));
		when(repo.findAll()).thenReturn(users);
		assertEquals(2,ser.findAllUser().size());
		
	}
	
	

	@Test
	public void testfindById() {
//	   User user = ser.findUserById(1);
//	   assertEquals("abc", user.getName());
//	   logger.info("User->{}",user);
	   
		List<User> users=new ArrayList<User>();
		users.add(new User(1,"adam","adam@gmail.com","kolkata",79809376, null));
		users.add(new User(2,"alex","alex@gmail.com","Mumbai",79809375, null));
		int id=1;
		when(repo.findAll()).thenReturn(users);
		assertEquals(id,ser.findUserById(id).getId());

		
	}
	@Test
	public void test_addUser() {
		User user=new User(1,"adam","adam@gmail.com","kolkata",79809376, null);
		when(repo.save(user)).thenReturn(user);
		assertEquals(user,ser.addUser(user));
		
	}
	
	@Test
	public void test_deleteAllUser() {
		User user=new User(1,"adam","adam@gmail.com","kolkata",79809376, null);
		ser.deleteAllUser();
		verify(repo,times(1)).deleteAll();
		
	}
	
	
	
	
	
	
	}

       
	
	
	

