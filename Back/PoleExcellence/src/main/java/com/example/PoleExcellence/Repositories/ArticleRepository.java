package com.example.PoleExcellence.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.PoleExcellence.Entities.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {

}
