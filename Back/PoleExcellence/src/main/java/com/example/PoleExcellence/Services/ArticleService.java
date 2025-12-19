package com.example.PoleExcellence.Services;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.PoleExcellence.Entities.Article;
import com.example.PoleExcellence.Repositories.ArticleRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleService {
	
    private final ArticleRepository articleRepository;
    
    //Creer un nouveau article
  	public Article createArticle(Article article) {
  		return articleRepository.save(article);
  		}
  	//Mettre à jour un article
  	public Article UpdateArticle(Article article) {
  		return articleRepository.save(article);
  	}
  	//Recuperer tous les articles
  	public List<Article> getArticle(){
  	 return articleRepository.findAll();
  	}
  	//Recuperer un article par id
  	public Optional<Article> getArticleById(Long id){
  		return articleRepository.findById(id);
  	}
  	//Supprimer un article
  	public void  DeleteArticle(Long id){
  		articleRepository.deleteById(id);
  	}

}
