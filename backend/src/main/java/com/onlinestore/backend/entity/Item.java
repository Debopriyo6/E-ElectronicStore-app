package com.onlinestore.backend.entity;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
	
	@Id
	private Integer id;
	@NotBlank
	@Length(min=4,message="Itemname must be atleast 4 character long")
	private String itemname;
	@NotBlank
	@Length(min=4,message="description must be atleast 4 character long")
	private String description;
   private int amount;
   @NotNull
	private long price;
	private String image;
	
	@ManyToOne(fetch=FetchType.EAGER)
//	@ToString.Exclude
	private User user;
	


	
}
