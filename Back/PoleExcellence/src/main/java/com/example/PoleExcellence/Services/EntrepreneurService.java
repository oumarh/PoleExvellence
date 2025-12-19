package com.example.PoleExcellence.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.example.PoleExcellence.Entities.Entrepreneur;
import com.example.PoleExcellence.Repositories.EntrepreneurRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EntrepreneurService {
private final EntrepreneurRepository entrepreneurRepository;
    //Creer un nouveau Entrepreneur
	public Entrepreneur createEntrepreneur(Entrepreneur entrepreneur ) {
		return entrepreneurRepository.save(entrepreneur);
		}
	//Mettre à jour un Entrepreneur
	public Entrepreneur UpdateEntrepreneur(Entrepreneur entrepreneur) {
		return entrepreneurRepository.save(entrepreneur);
	}
	//Recuperer tous les Entrepreneurs
	public List<Entrepreneur> getEntrepreneur(){
	 return entrepreneurRepository.findAll();
	}
	//Recuperer un Entrepreneur par id
	public Optional<Entrepreneur> getEntrepreneurById(Long id){
		return entrepreneurRepository.findById(id);
	}
	//Supprimer un Entrepreneur
	public void  DeleteEntrepreneur(Long id){
		entrepreneurRepository.deleteById(id);
	}
}
