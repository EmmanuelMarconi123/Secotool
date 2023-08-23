package com.group2.secotool_app.bussiness.facade;

import com.group2.secotool_app.model.dto.CategoryDto;
import com.group2.secotool_app.model.dto.request.CategoryRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICategoryFacade {
    List<CategoryDto> getAllCategory();

    void saveCategory(CategoryRequestDto categoryRequestDto, MultipartFile image);

    void updateCategory(CategoryRequestDto categoryRequestDto,Long id);

    void deleteCategory(Long id);

    void associateProductToCategory(Long prodId, Long categoryId);
}
