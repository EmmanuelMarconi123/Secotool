package com.group2.secotool_app.bussiness.service.Impl;

import com.group2.secotool_app.bussiness.service.IProductService;
import com.group2.secotool_app.bussiness.service.IProductValidationService;
import com.group2.secotool_app.model.dto.request.RentProductRequestDto;
import com.group2.secotool_app.model.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductValidationServiceImpl implements IProductValidationService {

    private final IProductService productService;

    @Override
    public void validateProductNameIsNotAvailable(String name) {
        if (productService.existProductByName(name))
            throw new RuntimeException("product name already exists on database");
    }

    @Override
    public boolean isProductAvailableToRent(RentProductRequestDto rentProductRequestDto, Product productToRent) {
        var productsAvailable = productService.getAllProductsByRangeOfDateAvailableToRent(rentProductRequestDto.startDate(),rentProductRequestDto.endDate());
        return productsAvailable.contains(productToRent);
    }
}
