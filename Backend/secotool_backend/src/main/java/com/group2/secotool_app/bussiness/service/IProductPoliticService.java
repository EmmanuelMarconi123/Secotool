package com.group2.secotool_app.bussiness.service;

import com.group2.secotool_app.model.dto.ProductPoliticDto;
import com.group2.secotool_app.model.dto.request.ProductPoliticRequestDto;
import com.group2.secotool_app.model.entity.Category;

import java.util.List;

public interface IProductPoliticService {
    void save(ProductPoliticRequestDto productPoliticRequestDto);

    void update(ProductPoliticRequestDto productPoliticRequestDto, Long id);

    void delete(Long id);

    List<ProductPoliticDto> findAll();

}
