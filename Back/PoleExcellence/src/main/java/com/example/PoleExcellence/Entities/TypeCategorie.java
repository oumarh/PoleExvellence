package com.example.PoleExcellence.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum TypeCategorie {
	ARTICLE,
    FORMATION,
    OFFRE
}
