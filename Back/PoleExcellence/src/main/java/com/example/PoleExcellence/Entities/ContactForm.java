package com.example.PoleExcellence.Entities;


import lombok.Data;


@Data
public class ContactForm {
	private String nom;
    private String email;
    private String objet;
    private String message;

}
