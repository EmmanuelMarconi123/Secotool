package com.group2.secotool_app.bussiness.mapper;

import com.group2.secotool_app.model.dto.ProductFullDto;
import com.group2.secotool_app.model.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductFullDtoMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "price", target = "price")
    @Mapping(source = "images", target = "images")
    @Mapping(source = "productFeatures", target = "productFeatures")
    @Mapping(source = "productCategories", target = "productCategories")
    ProductFullDto toProductFullDto(Product product);
}
