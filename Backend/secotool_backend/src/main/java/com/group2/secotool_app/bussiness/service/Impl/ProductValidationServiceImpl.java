package com.group2.secotool_app.bussiness.service.Impl;

import com.group2.secotool_app.bussiness.service.IProductValidationService;
import com.group2.secotool_app.persistence.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductValidationServiceImpl implements IProductValidationService {

    private final ProductRepository productRepository;

    @Override
    public boolean validateProductNameIsNotAvaible(String name) {
        return productRepository.existsByName(name);
    }
}
