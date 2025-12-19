package com.example.PoleExcellence.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.example.PoleExcellence.Entities.Candidats;
import com.example.PoleExcellence.Repositories.CandidatsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidatsService {
   private final CandidatsRepository candidatsRepository;
   
    //Creer un nouveau Candidat
 	public Candidats createCandidat(Candidats candidats ) {
 		return candidatsRepository.save(candidats);
 		}
 	//Mettre à jour un Candidat
 	public Candidats UpdateCandidat(Candidats candidats) {
 		return candidatsRepository.save(candidats);
 	}
 	//Recuperer tous les Candidates
 	public List<Candidats> getCandidat(){
 	 return candidatsRepository.findAll();
 	}
 	//Recuperer un Candidat par id
 	public Optional<Candidats> getCandidatById(Long id){
 		return candidatsRepository.findById(id);
 	}
 	//Supprimer un Candidat
 	public void  DeleteCandidat(Long id){
 		candidatsRepository.deleteById(id);
 	}
}
