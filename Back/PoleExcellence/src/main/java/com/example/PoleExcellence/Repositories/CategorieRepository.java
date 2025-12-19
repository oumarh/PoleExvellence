package com.example.PoleExcellence.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.PoleExcellence.Entities.Categorie;
import com.example.PoleExcellence.Entities.TypeCategorie;

public interface CategorieRepository extends JpaRepository<Categorie, Long>{
	List<Categorie> findByType(TypeCategorie type);
}
