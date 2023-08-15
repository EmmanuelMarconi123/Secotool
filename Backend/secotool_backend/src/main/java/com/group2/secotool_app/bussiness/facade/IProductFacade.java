package com.group2.secotool_app.bussiness.facade;


import com.group2.secotool_app.model.dto.ProductDto;
import com.group2.secotool_app.model.dto.request.ProductRequestDto;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IProductFacade {
    List<ProductDto> getAllProducts();
    List<ProductDto> getTenRandomProducts();

    @Transactional(rollbackOn = {RuntimeException.class})
    String save(ProductRequestDto productRequestDto, List<MultipartFile> images);

    String deleteById(Long id);

    List<ProductDto> paginateProducts(int page);

    ProductDto findProductById(Long id);
}
