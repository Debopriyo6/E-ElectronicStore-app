package com.onlinestore.backend.entity;



import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User { 
	
	@Id
	@GeneratedValue
	private Integer id;
	@NotBlank
	@Length(min=3,message="name must be atleast 3 character long")
	private String name;
	@NotBlank(message="please enter your mail-id")
	@Email(regexp=".+[@].+[\\.].+", message="please enter a valid email,must include @")
	private String email;
	@NotBlank(message="enter your address")
	@Length(min=4,message="address must be 4 character long")
	private String address;
	
	@Pattern(regexp="^\\d{10}$",message="invalid no entered")
	private String phno;
	
	@OneToMany( fetch=FetchType.LAZY,  mappedBy="user")
	@JsonIgnore
	@ToString.Exclude
	private List<Item> items;
}
