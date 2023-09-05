package com.group2.secotool_app.model.dto;

import java.util.List;

public record ProductFullDto(
        Long id,
        String name,
        String description,
        Double price,
        Boolean isFavorite,
        List<ImageDto> images,
        List<FeatureDto> productFeatures,
        List<CategoryDto> productCategories,
        List<RentDto> productRentals
) {
}
