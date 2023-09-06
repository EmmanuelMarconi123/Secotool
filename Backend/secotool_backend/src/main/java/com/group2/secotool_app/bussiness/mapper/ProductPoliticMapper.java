package com.group2.secotool_app.bussiness.mapper;

import com.group2.secotool_app.model.dto.request.ProductPoliticRequestDto;
import com.group2.secotool_app.model.entity.ProductPolitic;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductPoliticMapper {

    @Mapping(source = "title", target = "title")
    @Mapping(source = "description", target = "description")
    ProductPolitic toProductPolitic(ProductPoliticRequestDto productPoliticRequestDto);

}
