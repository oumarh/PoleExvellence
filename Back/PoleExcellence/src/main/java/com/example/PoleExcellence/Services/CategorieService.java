package com.example.PoleExcellence.Services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.example.PoleExcellence.Entities.Categorie;
import com.example.PoleExcellence.Repositories.CategorieRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategorieService {
private final CategorieRepository categorieRepository; 
    //Creer un nouveau Categorie
	public Categorie createCategorie(Categorie categorie ) {
		return categorieRepository.save(categorie);
		}
	//Mettre à jour un Categorie
	public Categorie UpdateCategorie(Categorie categorie) {
		return categorieRepository.save(categorie);
	}
	//Recuperer tous les Categories
	public List<Categorie> getCategorie(){
	 return categorieRepository.findAll();
	}
	//Recuperer un Categorie par id
	public Optional<Categorie> getCategorieById(Long id){
		return categorieRepository.findById(id);
	}
	//Supprimer un Categorie
	public void  DeleteCategorie(Long id){
		categorieRepository.deleteById(id);
	}
}
