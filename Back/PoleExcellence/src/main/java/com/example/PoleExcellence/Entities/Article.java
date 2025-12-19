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
public class Article {
@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String titre;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String contenu;
    private String image;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime  datedepubli;
    
    @PrePersist
    protected void onCreate() {
        this.datedepubli = LocalDateTime.now();
    }
    
    @ManyToOne
    @JoinColumn(name = "categorie_id")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Categorie categorieid;
}
