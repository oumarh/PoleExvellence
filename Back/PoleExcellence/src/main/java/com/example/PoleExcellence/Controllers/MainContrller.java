package com.example.PoleExcellence.Controllers;


import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.PoleExcellence.Entities.Article;
import com.example.PoleExcellence.Entities.Candidats;
import com.example.PoleExcellence.Entities.Categorie;
import com.example.PoleExcellence.Entities.ContactForm;
import com.example.PoleExcellence.Entities.Entrepreneur;
import com.example.PoleExcellence.Entities.Formations;
import com.example.PoleExcellence.Entities.Offres;
import com.example.PoleExcellence.Entities.TypeCategorie;
import com.example.PoleExcellence.Entities.Users;
import com.example.PoleExcellence.Repositories.CandidatsRepository;
import com.example.PoleExcellence.Repositories.CategorieRepository;
import com.example.PoleExcellence.Repositories.EntrepreneurRepository;
import com.example.PoleExcellence.Services.ArticleService;
import com.example.PoleExcellence.Services.CandidatsService;
import com.example.PoleExcellence.Services.CategorieService;
import com.example.PoleExcellence.Services.EntrepreneurService;
import com.example.PoleExcellence.Services.FormationsService;
import com.example.PoleExcellence.Services.OffresService;
import com.example.PoleExcellence.Services.UsersService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/PoleExcellence")
public class MainContrller {
	private final ArticleService articleService;
	private final CandidatsService candidatsService;
	private final CategorieService categorieService;
	private final EntrepreneurService entrepreneurService;
	private final FormationsService formationsService;
	private final OffresService offresService;
	private final UsersService userService;
	private final EntrepreneurRepository entrepreneurRepository;
	private final CandidatsRepository candidatsRepository;
	private final CategorieRepository categorieRepository ;
    private final JavaMailSender mailSender;

    @PostMapping("Sendmail")
    public ResponseEntity<?> sendContactMail(@RequestBody ContactForm form) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("ohaidara80@gmail.com"); // ton mail de réception
            message.setSubject(form.getObjet());
            message.setText("Nom: " + form.getNom() + "\nEmail: " + form.getEmail() + "\nMessage: " + form.getMessage());
            mailSender.send(message);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'envoi");
        }
    }
 
	    //Recuperer tous les Articles
		@GetMapping("/article")
		public List<Article> getArticle(){
			return articleService.getArticle();
		}
		//Recuperer un Article
		@GetMapping("/article/{id}")
		public ResponseEntity<Article> getArticleById(@PathVariable Long id){
			Optional<Article> article = articleService.getArticleById(id);
			return article.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
		}
		//Creer une Article
		@PostMapping("/article")
		public Article CreateArticle(@RequestBody Article article){
			return articleService.createArticle( article);
		}
		//Mettre à jour un Article
		@PutMapping("/article/{id}")
		public ResponseEntity<Article> UpdateArticle(@PathVariable Long id,@RequestBody Article articleDetails) {
			Optional<Article> article =articleService.getArticleById(id);
			if (article.isPresent()) {
				Article UpdateArticle = article.get();
				UpdateArticle.setTitre(articleDetails.getTitre());
				UpdateArticle.setContenu(articleDetails.getContenu());
				UpdateArticle.setDatedepubli(articleDetails.getDatedepubli());
				UpdateArticle.setImage(articleDetails.getImage());
				// Mettre à jour la catégorie si elle est fournie
				if (articleDetails.getCategorieid() != null && articleDetails.getCategorieid().getId() != null) {
					Optional<Categorie> categorie = categorieService.getCategorieById(articleDetails.getCategorieid().getId());
					categorie.ifPresent(UpdateArticle::setCategorieid);
				}
				return ResponseEntity.ok(articleService.UpdateArticle(UpdateArticle));
			} else {
				return ResponseEntity.notFound().build();
			}
		}
		//Supprimer un Article
		@DeleteMapping("/article/{id}")
		public ResponseEntity<Void> deleteArticle(@PathVariable Long id){
			Optional<Article> article = articleService.getArticleById(id);
			if (article.isPresent()) {
				articleService.DeleteArticle(id);
				return ResponseEntity.noContent().build();
			}  else {
				return ResponseEntity.notFound().build();
			}
		}
		
		        //Recuperer tous les Candidats
				@GetMapping("/candidat")
				public List<Candidats> getCandidat(){
					return candidatsService.getCandidat();
				}
				//Recuperer un Candidat
				@GetMapping("/candidat/{id}")
				public ResponseEntity<Candidats> getCandidatById(@PathVariable Long id){
					Optional<Candidats> candidat = candidatsService.getCandidatById(id);
					return candidat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
				}
				//Creer une Candidat
				@PostMapping("/candidat")
				public Candidats CreateCandidat(@RequestBody Candidats candidats ){
					return candidatsService.createCandidat( candidats);
				}
				@GetMapping("/candidatcount")
			    public long getcandidatCount() {
			        return candidatsRepository.count();
			    }
				//Mettre à jour un Candidat
				@PutMapping("/candidat/{id}")
				public ResponseEntity<Candidats> UpdateCandidat(@PathVariable Long id,@RequestBody Candidats candidatDetails) {
					Optional<Candidats> candidat =candidatsService.getCandidatById(id);
					if (candidat.isPresent()) {
						Candidats UpdateCandidat = candidat.get();
						UpdateCandidat.setNom(candidatDetails.getNom());
						UpdateCandidat.setPrenom(candidatDetails.getPrenom());
						UpdateCandidat.setEmail(candidatDetails.getEmail());
						UpdateCandidat.setProfession(candidatDetails.getProfession());
						UpdateCandidat.setTelephone(candidatDetails.getTelephone());
						UpdateCandidat.setOrganisation(candidatDetails.getOrganisation());
						UpdateCandidat.setAddress(candidatDetails.getAddress());
						UpdateCandidat.setSpecialisation(candidatDetails.getSpecialisation());						
						return ResponseEntity.ok(candidatsService.UpdateCandidat(UpdateCandidat));
					} else {
						return ResponseEntity.notFound().build();
					}
				}
				//Supprimer un Candidat
				@DeleteMapping("/candidat/{id}")
				public ResponseEntity<Void> deleteCandidat(@PathVariable Long id){
					Optional<Candidats> candidat = candidatsService.getCandidatById(id);
					if (candidat.isPresent()) {
						candidatsService.DeleteCandidat(id);
						return ResponseEntity.noContent().build();
					}  else {
						return ResponseEntity.notFound().build();
					}
				}
				
				@GetMapping("/candidats/inscrits-between")
			    public List<Candidats> getCandidatsBetweenDates(
			            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
			            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
			        return candidatsRepository.findByDateInscriptionBetween(start, end);
			    }
				
				//Recuperer tous les Categories
				@GetMapping("/categorie")
				public List<Categorie > getCategorie(){
					return categorieService .getCategorie();
				}
				//Recuperer un Categorie
				@GetMapping("/categorie/{id}")
				public ResponseEntity<Categorie> getCategorieById(@PathVariable Long id){
					Optional<Categorie> categorie = categorieService.getCategorieById(id);
					return categorie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
				}
				//Creer une Categorie
				@PostMapping("/categorie")
				public Categorie CreateCategorie(@RequestBody Categorie categorie ){
					return categorieService.createCategorie( categorie);
				}
				//Mettre à jour un Categorie
				@PutMapping("/categorie/{id}")
				public ResponseEntity<Categorie> UpdateCategorie(@PathVariable Long id,@RequestBody Categorie categorieDetails) {
					Optional<Categorie> categorie =categorieService.getCategorieById(id);
					if (categorie.isPresent()) {
						Categorie UpdateCategorie = categorie.get();
						UpdateCategorie.setNom(categorieDetails.getNom());
						UpdateCategorie.setDatecreation(categorieDetails.getDatecreation());						
						return ResponseEntity.ok(categorieService.UpdateCategorie(UpdateCategorie));
					} else {
						return ResponseEntity.notFound().build();
					}
				}
				//recuperer par type
				@GetMapping("/type/{type}")
				public List<Categorie> getCategoriesByType(@PathVariable TypeCategorie type) {
				    return categorieRepository.findByType(type);
				}
				//Supprimer un Categorie
				@DeleteMapping("/categorie/{id}")
				public ResponseEntity<Void> deleteCategorie(@PathVariable Long id){
					Optional<Categorie> categorie = categorieService.getCategorieById(id);
					if (categorie.isPresent()) {
						categorieService.DeleteCategorie(id);
						return ResponseEntity.noContent().build();
					}  else {
						return ResponseEntity.notFound().build();
					}
				}
				
				
				//Recuperer tous les Entrepreneurs
				@GetMapping("/entrepreneur")
				public List<Entrepreneur  > getEntrepreneur(){
					return entrepreneurService.getEntrepreneur();
				}
				//Recuperer un Entrepreneur
				@GetMapping("/entrepreneur/{id}")
				public ResponseEntity<Entrepreneur> getEntrepreneurById(@PathVariable Long id){
					Optional<Entrepreneur> entrepreneur = entrepreneurService.getEntrepreneurById(id);
					return entrepreneur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
				}
				//Creer un Entrepreneur
				@PostMapping("/entrepreneur")
				public Entrepreneur CreateEntrepreneur(@RequestBody Entrepreneur entrepreneur ){
					return entrepreneurService.createEntrepreneur( entrepreneur);
				}
				 @GetMapping("/entrepreneurcount")
				    public long getEntrepreneurCount() {
				        return entrepreneurRepository.count();
				    }
				//Mettre à jour un Entrepreneur
				@PutMapping("/entrepreneur/{id}")
				public ResponseEntity<Entrepreneur> UpdateEntrepreneur(@PathVariable Long id,@RequestBody Entrepreneur entrepreneurDetails) {
					Optional<Entrepreneur> entrepreneur =entrepreneurService.getEntrepreneurById(id);
					if (entrepreneur.isPresent()) {
						Entrepreneur UpdateEntrepreneur = entrepreneur.get();
						UpdateEntrepreneur.setNom(entrepreneurDetails.getNom());
						UpdateEntrepreneur.setPrenom(entrepreneurDetails.getPrenom());
						UpdateEntrepreneur.setProfession(entrepreneurDetails.getProfession());
						UpdateEntrepreneur.setEmail(entrepreneurDetails.getEmail());
						UpdateEntrepreneur.setTelephone(entrepreneurDetails.getTelephone());
						UpdateEntrepreneur.setActivite(entrepreneurDetails.getActivite());
						UpdateEntrepreneur.setAddress(entrepreneurDetails.getAddress());
						UpdateEntrepreneur.setOrganisation(entrepreneurDetails.getOrganisation());
						return ResponseEntity.ok(entrepreneurService.UpdateEntrepreneur(UpdateEntrepreneur));
					} else {
						return ResponseEntity.notFound().build();
					}
				}
				//Supprimer un Entrepreneur
				@DeleteMapping("/entrepreneur/{id}")
				public ResponseEntity<Void> deleteEntrepreneur(@PathVariable Long id){
					Optional<Entrepreneur> entrepreneur = entrepreneurService.getEntrepreneurById(id);
					if (entrepreneur.isPresent()) {
						entrepreneurService.DeleteEntrepreneur(id);
						return ResponseEntity.noContent().build();
					}  else {
						return ResponseEntity.notFound().build();
					}
				}
				
				@GetMapping("/entrepreneurs/inscrits-between")
			    public List<Entrepreneur> getEntrepreneursBetweenDates(
			            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
			            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
			        return entrepreneurRepository.findByDateInscriptionBetween(start, end);
			    }
				
				//Recuperer tous les Formations
				@GetMapping("/formation")
				public List<Formations> getFormation(){
					return formationsService.getFormation();
				}
				//Recuperer un Formation
				@GetMapping("/formation/{id}")
				public ResponseEntity<Formations> getFormationById(@PathVariable Long id){
					Optional<Formations> entrepreneur = formationsService.getFormationById(id);
					return entrepreneur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
				}
				//Creer un Formation
				@PostMapping("/formation")
				public Formations CreateFormation(@RequestBody Formations formations ){
					return formationsService.createFormation( formations);
				}
				//Mettre à jour un Formation
				@PutMapping("/formation/{id}")
				public ResponseEntity<Formations> UpdateFormation(@PathVariable Long id,@RequestBody Formations FormationDetails) {
					Optional<Formations> formation =formationsService.getFormationById(id);
					if (formation.isPresent()) {
						Formations UpdateFormation = formation.get();
						UpdateFormation.setTitre(FormationDetails.getTitre());
						UpdateFormation.setDescription(FormationDetails.getDescription());
						UpdateFormation.setDuree(FormationDetails.getDuree());
						UpdateFormation.setPrix(FormationDetails.getPrix());
						UpdateFormation.setImage(FormationDetails.getImage());
						// Mettre à jour la catégorie si elle est fournie
				      if (FormationDetails.getCategorieid() != null && FormationDetails.getCategorieid().getId() != null) {
				      	Optional<Categorie> categorie = categorieService.getCategorieById(FormationDetails.getCategorieid().getId());
				      	categorie.ifPresent(UpdateFormation::setCategorieid);
				      }
						return ResponseEntity.ok(formationsService.UpdateFormation(UpdateFormation));
					} else {
						return ResponseEntity.notFound().build();
					}
				}
				//Supprimer un Formation
				@DeleteMapping("/formation/{id}")
				public ResponseEntity<Void> deleteFormation(@PathVariable Long id){
					Optional<Formations> formation = formationsService.getFormationById(id);
					if (formation.isPresent()) {
						formationsService.DeleteFormation(id);
						return ResponseEntity.noContent().build();
					}  else {
						return ResponseEntity.notFound().build();
					}
				}
				
				//Recuperer tous les Offres
				@GetMapping("/offre")
				public List<Offres> getOffre(){
					return offresService.getOffre();
				}
				//Recuperer un Offre
				@GetMapping("/offre/{id}")
				public ResponseEntity<Offres> getOffreById(@PathVariable Long id){
					Optional<Offres> entrepreneur = offresService.getOffreById(id);
					return entrepreneur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
				}
				//Creer un Offre
				@PostMapping("/offre")
				public Offres CreateOffre(@RequestBody Offres offres ){
					return offresService.createOffre( offres);
				}
				//Mettre à jour un Offre
				@PutMapping("/offre/{id}")
				public ResponseEntity<Offres> UpdateOffre(@PathVariable Long id,@RequestBody Offres offresDetails) {
					Optional<Offres> offre =offresService.getOffreById(id);
					if (offre.isPresent()) {
						Offres UpdateOffre = offre.get();
						UpdateOffre.setTitre(offresDetails.getTitre());
						UpdateOffre.setDescription(offresDetails.getDescription());
						UpdateOffre.setImage(offresDetails.getImage());
						UpdateOffre.setPrix(offresDetails.getPrix());
						// Mettre à jour la catégorie si elle est fournie
				      if (offresDetails.getCategorieid() != null && offresDetails.getCategorieid().getId() != null) {
				      	Optional<Categorie> categorie = categorieService.getCategorieById(offresDetails.getCategorieid().getId());
				      	categorie.ifPresent(UpdateOffre::setCategorieid);
				      }
						return ResponseEntity.ok(offresService.UpdateOffre(UpdateOffre));
					} else {
						return ResponseEntity.notFound().build();
					}
				}
				//Supprimer un Offre
				@DeleteMapping("/offre/{id}")
				public ResponseEntity<Void> deleteOffre(@PathVariable Long id){
					Optional<Offres> offre = offresService.getOffreById(id);
					if (offre.isPresent()) {
						offresService.DeleteOffre(id);
						return ResponseEntity.noContent().build();
					}  else {
						return ResponseEntity.notFound().build();
					}
				}
				
				//Recuperer tous les Offres
			 	@GetMapping("/user")
			 	public List<Users> getUsers(){
			 		return userService.getUsers();
			 	}
			 	//Recuperer un Offre
			 	@GetMapping("/user/{id}")
			 	public ResponseEntity<Users> getUserById(@PathVariable Long id){
			 		Optional<Users> user = userService.getUserById(id);
			 		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
			 	}
			 	//Mettre à jour un Offre
			 	@PutMapping("/user/{id}")
			 	public ResponseEntity<Users> UpdateUser(@PathVariable Long id,@RequestBody Users userDetails) {
			 		Optional<Users> user =userService.getUserById(id);
			 		if (user.isPresent()) {
			 			Users UpdateUser = user.get();
			 			UpdateUser.setFirstname(userDetails.getFirstname());
			 			UpdateUser.setLastmane(userDetails.getLastmane());
			 			UpdateUser.setEmail(userDetails.getEmail());
			 			UpdateUser.setPassword(userDetails.getPassword());			
			 			UpdateUser.setRole(userDetails.getRole());
			 			UpdateUser.setTelephone(userDetails.getTelephone());
			 			return ResponseEntity.ok(userService.UpdateUser(UpdateUser));
			 		} else {
			 			return ResponseEntity.notFound().build();
			 		}
			 	}
			 	//Supprimer un Offre
			 	@DeleteMapping("/user/{id}")
			 	public ResponseEntity<Void> deleteUser(@PathVariable Long id){
			 		Optional<Users> user = userService.getUserById(id);
			 		if (user.isPresent()) {
			 			userService.DeleteUser(id);
			 			return ResponseEntity.noContent().build();
			 		}  else {
			 			return ResponseEntity.notFound().build();
			 		}
			 	}
				
			 	@PostMapping("/upload-image")
			 	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
			 	    //String uploadDir = "uploads/images/";
			 	    String projectRoot = System.getProperty("user.dir");
			 	    String uploadDir = projectRoot + File.separator + "uploads" + File.separator + "images" + File.separator;
			 	    String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

			 	    File dest = new File(uploadDir + filename);
			 	    file.transferTo(dest);

			 	    return ResponseEntity.ok("http://localhost:8080/PoleExcellence/uploads/images/" + filename); // On retourne le chemin à stocker dans la base
			 	}
			 	 @GetMapping("/uploads/images/{filename:.+}")
			     public ResponseEntity<Resource> getImage(@PathVariable String filename) throws MalformedURLException {
			         Path imagePath = Paths.get(System.getProperty("user.dir"), "uploads", "images", filename);
			        Resource resource = new UrlResource(imagePath.toUri());

			         if (resource.exists() && resource.isReadable()) {
			             return ResponseEntity.ok().body(resource);
			         } else {
			             return ResponseEntity.notFound().build();
			         }
			     }
}