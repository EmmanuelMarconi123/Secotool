package com.group2.secotool_app.model.dto;

import java.util.List;
public record ProductDto(
        Long id,
        String name,
        String description,
        Double price,
        List<ImageDto> images,
        List<CategoryDto> productCategories

){
    public int compareTo(ProductDto productDto) {
        return Long.compare(this.id, productDto.id);
    }
}
