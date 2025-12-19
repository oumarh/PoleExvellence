package com.example.PoleExcellence.Entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.Data;


@Entity
    @Data
public class Formations {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String titre;
    private String Duree;
    private Integer Prix;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;
    private String image;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime  Datedebut;
    
    @PrePersist
    protected void onCreate() {
        this.Datedebut = LocalDateTime.now();
    }
    
    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private Categorie categorieid;
}
