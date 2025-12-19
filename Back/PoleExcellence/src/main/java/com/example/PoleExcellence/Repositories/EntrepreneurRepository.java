package com.example.PoleExcellence.Repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.PoleExcellence.Entities.Entrepreneur;

public interface EntrepreneurRepository extends JpaRepository<Entrepreneur, Long> {

    @Query("SELECT e FROM Entrepreneur e WHERE e.dateInscription BETWEEN :start AND :end")
    List<Entrepreneur> findByDateInscriptionBetween(@Param("start") LocalDate start, @Param("end") LocalDate end);

}
