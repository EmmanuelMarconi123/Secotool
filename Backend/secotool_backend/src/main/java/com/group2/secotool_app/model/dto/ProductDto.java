package com.group2.secotool_app.model.dto;

import java.util.List;
public record ProductDto(
        Long id,
        String name,
        String description,
        Double price,
        Boolean isFavorite,
        List<ImageDto> images,
        List<CategoryDto> productCategories

){

    public ProductDto {
        if (isFavorite == null) {
            isFavorite = false;
        }
    }
    public int compareTo(ProductDto productDto) {
        return Long.compare(this.id, productDto.id);
    }

}
