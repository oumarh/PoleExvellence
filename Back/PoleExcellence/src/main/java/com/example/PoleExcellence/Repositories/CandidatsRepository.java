package com.example.PoleExcellence.Repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.PoleExcellence.Entities.Candidats;

public interface CandidatsRepository extends JpaRepository<Candidats, Long> {

    @Query("SELECT c FROM Candidats c WHERE c.dateInscription BETWEEN :start AND :end")
    List<Candidats> findByDateInscriptionBetween(@Param("start") LocalDate start, @Param("end") LocalDate end);

}
