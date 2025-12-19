package com.example.PoleExcellence.Entities;


import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Entrepreneur {
@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String profession;
    private Double telephone;
    private String organisation;
    private String address;
    private String activite;
    private LocalDate dateInscription;
    
    @ManyToOne
    //@JoinColumn(name = "Offres_id")
    //@JsonFormat(shape = JsonFormat.Shape.STRING)
    private Offres Offreid;
}
