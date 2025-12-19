package com.example.PoleExcellence.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.PoleExcellence.Entities.Users;
import com.example.PoleExcellence.Repositories.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersService implements UserDetailsService {
private final UsersRepository usersRepository;
    //Creer un nouveau User
	public Users  createUser(Users users) {
		return usersRepository.save(users);
		}
	//Mettre à jour un User
	public Users UpdateUser(Users users) {
		return usersRepository.save(users);
	}
	//Recuperer tous les Users
	public List<Users> getUsers(){
	 return usersRepository.findAll();
	}
	//Recuperer un User par id
	public Optional<Users> getUserById(Long id){
		return usersRepository.findById(id);
	}
	//Supprimer un User
	public void  DeleteUser(Long id){
		usersRepository.deleteById(id);
	}
	
	@Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = usersRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }
}
