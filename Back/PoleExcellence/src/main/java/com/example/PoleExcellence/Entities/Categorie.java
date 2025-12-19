package com.example.PoleExcellence.Entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class Categorie {
@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String nom;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime  datecreation;
    @Enumerated(EnumType.STRING)
    private TypeCategorie type;
    
    @PrePersist
    protected void onCreate() {
        this.datecreation = LocalDateTime.now();
    }
}
