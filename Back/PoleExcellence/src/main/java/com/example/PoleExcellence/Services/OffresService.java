package com.example.PoleExcellence.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.example.PoleExcellence.Entities.Offres;
import com.example.PoleExcellence.Repositories.OffresRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OffresService {
private final OffresRepository offresRepository;
    //Creer un nouveau Offre
	public Offres createOffre(Offres offres ) {
		return offresRepository.save(offres);
		}
	//Mettre à jour un Offre
	public Offres UpdateOffre(Offres offres) {
		return offresRepository.save(offres);
	}
	//Recuperer tous les Offres
	public List<Offres> getOffre(){
	 return offresRepository.findAll();
	}
	//Recuperer un Offre par id
	public Optional<Offres> getOffreById(Long id){
		return offresRepository.findById(id);
	}
	//Supprimer un Offre
	public void  DeleteOffre(Long id){
		offresRepository.deleteById(id);
	}
}
