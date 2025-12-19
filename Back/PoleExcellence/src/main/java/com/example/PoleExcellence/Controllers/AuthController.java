package com.example.PoleExcellence.Controllers;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PoleExcellence.Configs.JwtUtil;
import com.example.PoleExcellence.Entities.Users;
import com.example.PoleExcellence.Repositories.UsersRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        Users user = userRepository.findByEmail(email).orElseThrow();
        String token = jwtUtil.generateToken(userDetails, user);

        return Map.of("token", token);
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Cet utilisateur existe déjà.");
        }

        // Encode le mot de passe
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Attribue un rôle par défaut si non fourni
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Inscription réussie !"));
    }
    
  
	@PostMapping("/forgot-password")
public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
    String email = request.get("email");
    Optional<Users> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Aucun utilisateur avec cet email."));
    }

    Users user = userOpt.get();
    String token = UUID.randomUUID().toString();
    user.setResetToken(token);
    userRepository.save(user);

    String resetLink = "http://localhost:4200/reset-password?token=" + token;

    // Envoi réel de l'email de réinitialisation
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(user.getEmail());
    message.setSubject("Réinitialisation de votre mot de passe");
    message.setText("Bonjour,\n\nPour réinitialiser votre mot de passe, cliquez sur le lien suivant :\n" + resetLink + "\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet email.");
    mailSender.send(message);

    return ResponseEntity.ok(Map.of("message", "Un lien de réinitialisation a été envoyé."));
}

@PostMapping("/reset-password")
public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
    String token = request.get("token");
    String newPassword = request.get("password");

    Optional<Users> userOpt = userRepository.findByResetToken(token);
    if (userOpt.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Token invalide ou expiré."));
    }

    Users user = userOpt.get();
    user.setPassword(passwordEncoder.encode(newPassword));
    user.setResetToken(null); // Invalide le token
    userRepository.save(user);

    return ResponseEntity.ok(Map.of("message", "Mot de passe réinitialisé avec succès."));
}

}
