package com.group2.secotool_app.bussiness.mapper;

import com.group2.secotool_app.model.dto.ProductPoliticDto;
import com.group2.secotool_app.model.entity.ProductPolitic;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductPoliticDtoMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "description", target = "description")
    ProductPoliticDto toProductPoliticDto(ProductPolitic productPolitic);
}
