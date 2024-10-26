package com.onlinestore.backend.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bill {
	
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private String pname;
	
	private Integer total_price;
	
//	@OneToMany(mappedBy = "bill")
//	private List<Item> items;
	
	

}
