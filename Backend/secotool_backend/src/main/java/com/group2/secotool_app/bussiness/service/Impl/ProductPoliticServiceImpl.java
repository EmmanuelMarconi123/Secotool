package com.group2.secotool_app.bussiness.service.Impl;

import com.group2.secotool_app.bussiness.mapper.ProductPoliticDtoMapper;
import com.group2.secotool_app.bussiness.mapper.ProductPoliticMapper;
import com.group2.secotool_app.bussiness.service.IProductPoliticService;
import com.group2.secotool_app.model.dto.ProductPoliticDto;
import com.group2.secotool_app.model.dto.request.ProductPoliticRequestDto;
import com.group2.secotool_app.persistence.ProductPoliticRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductPoliticServiceImpl implements IProductPoliticService {

    private final ProductPoliticRepository productPoliticRepository;
    private final ProductPoliticMapper productPoliticMapper;
    private final ProductPoliticDtoMapper productPoliticDtoMapper;

    @Override
    public void save(ProductPoliticRequestDto productPoliticRequestDto) {
        if (productPoliticRepository.existsByName(productPoliticRequestDto.title()))
            throw new RuntimeException("politic already exists");
        productPoliticRepository.save(productPoliticMapper.toProductPolitic(productPoliticRequestDto));
    }

    @Override
    public void update(ProductPoliticRequestDto productPoliticRequestDto,Long id) {
        if (!productPoliticRepository.existsById(id))
            throw new RuntimeException("can not update a politic that doesn't exists");
        var politic = productPoliticMapper.toProductPolitic(productPoliticRequestDto);
        politic.setId(id);
        productPoliticRepository.save(politic);
    }

    @Override
    public void delete(Long id) {
        productPoliticRepository.deleteById(id);
    }

    @Override
    public List<ProductPoliticDto> findAll() {
        var politics = productPoliticRepository.findAll();
        List<ProductPoliticDto> politicsDto = new ArrayList<>();
        politics.forEach(politic -> politicsDto.add(productPoliticDtoMapper.toProductPoliticDto(politic)));
        return politicsDto;
    }
}
