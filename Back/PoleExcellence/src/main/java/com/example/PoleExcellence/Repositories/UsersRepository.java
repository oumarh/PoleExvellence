package com.example.PoleExcellence.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.PoleExcellence.Entities.Users;

public interface UsersRepository extends JpaRepository<Users, Long>{
	Optional<Users> findByEmail(String email);
	Optional<Users> findByResetToken(String token);
}
