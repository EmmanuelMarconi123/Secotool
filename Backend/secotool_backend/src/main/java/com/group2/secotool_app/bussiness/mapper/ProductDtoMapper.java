package com.group2.secotool_app.bussiness.mapper;

import com.group2.secotool_app.model.dto.ProductDto;
import com.group2.secotool_app.model.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductDtoMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "price", target = "price")
    @Mapping(source = "images", target = "images")
    @Mapping(source = "productCategories", target = "productCategories")
    ProductDto toProductDto (Product product);
}
