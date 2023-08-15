package com.group2.secotool_app.model.dto;

public record ProductDto(
        Long id,
        String name,
        String category,
        String description,
        Double price
){
}
