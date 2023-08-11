package com.group2.secotool_app.bussiness.facade;


import com.group2.secotool_app.model.dto.ProductDto;
import com.group2.secotool_app.model.dto.request.ProductRequestDto;

import java.util.List;

public interface IProductFacade {
    List<ProductDto> getAllProducts();
    List<ProductDto> getTenRandomProducts();

    String save(ProductRequestDto productRequestDto);

    String deleteById(Long id);

    List<ProductDto> paginateProducts(int page);

    ProductDto findProductById(Long id);
}
