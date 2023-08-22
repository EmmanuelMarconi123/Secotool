package com.group2.secotool_app.bussiness.facade.Impl;

import com.group2.secotool_app.bussiness.facade.ICategoryFacade;
import com.group2.secotool_app.bussiness.mapper.CategoryDtoMapper;
import com.group2.secotool_app.bussiness.mapper.CategoryMapper;
import com.group2.secotool_app.bussiness.service.ICategoryService;
import com.group2.secotool_app.bussiness.service.IProductService;
import com.group2.secotool_app.model.dto.CategoryDto;
import com.group2.secotool_app.model.dto.request.CategoryRequestDto;
import com.group2.secotool_app.model.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CategoryFacadeImpl implements ICategoryFacade {
    private final ICategoryService categoryService;
    private final IProductService productService;
    private final CategoryDtoMapper categoryDtoMapper;
    private final CategoryMapper categoryMapper;
    @Override
    public List<CategoryDto> getAllCategory() {
        List<CategoryDto> categoryDtos = new ArrayList<>();
        List<Category> categories = categoryService.findAll();
        categories.forEach(category -> categoryDtos.add(categoryDtoMapper.toCategoryDto(category)));
        return categoryDtos;
    }

    @Override
    public void saveCategory(CategoryRequestDto categoryRequestDto) {
        categoryService.save(categoryMapper.toCategory(categoryRequestDto));
    }

    @Override
    public void updateCategory(CategoryRequestDto categoryRequestDto, Long id) {
        var category = categoryMapper.toCategory(categoryRequestDto);
        category.setId(id);
        categoryService.update(category);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryService.delete(id);
    }

    @Override
    public void associateProductToCategory(String prodName, String categoryName) {
        var prod = productService.findByName(prodName);
        var category = categoryService.findByName(categoryName);
        categoryService.associateProductToCategory(prod,category);
    }
}
