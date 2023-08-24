package com.group2.secotool_app.bussiness.facade;


import com.group2.secotool_app.model.dto.ProductDto;
import com.group2.secotool_app.model.dto.ProductFullDto;
import com.group2.secotool_app.model.dto.request.AssignProductToCategoryDto;
import com.group2.secotool_app.model.dto.request.AssignProductToFeatureDto;
import com.group2.secotool_app.model.dto.request.ProductRequestDto;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IProductFacade {
    List<ProductDto> getAllProducts();
    List<ProductDto> getTenRandomProducts();
    List<ProductDto> getAllProductsAssociateWithACategory(Long categoryId);

    @Transactional(rollbackOn = {RuntimeException.class})
    String save(ProductRequestDto productRequestDto, AssignProductToCategoryDto assignProductToCategoryDto, AssignProductToFeatureDto assignProductToFeatureDto, List<MultipartFile> images);

    String deleteById(Long id);

    List<ProductDto> paginateProducts(int page);

    ProductFullDto findProductById(Long id);

    void updateProduct(Long id, ProductRequestDto productRequestDto);

    List<ProductDto> getAllProductsAssociateWithAFeature(Long featureId);
}
