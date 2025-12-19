package com.example.PoleExcellence.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.example.PoleExcellence.Entities.Formations;
import com.example.PoleExcellence.Repositories.FormationsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FormationsService {
private final FormationsRepository formationsRepository;
    //Creer un nouveau Formation
	public Formations createFormation(Formations formations  ) {
		return formationsRepository.save(formations);
		}
	//Mettre à jour un Formation
	public Formations UpdateFormation(Formations formations) {
		return formationsRepository.save(formations);
	}
	//Recuperer tous les Formations
	public List<Formations> getFormation(){
	 return formationsRepository.findAll();
	}
	//Recuperer un Formation par id
	public Optional<Formations> getFormationById(Long id){
		return formationsRepository.findById(id);
	}
	//Supprimer un Formation
	public void  DeleteFormation(Long id){
		formationsRepository.deleteById(id);
	}
}
