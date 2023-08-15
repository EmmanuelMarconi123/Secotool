package com.group2.secotool_app.bussiness.facade.Impl;

import com.group2.secotool_app.bussiness.facade.IImageFacade;
import com.group2.secotool_app.bussiness.service.IImageService;
import com.group2.secotool_app.bussiness.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ImageFacade implements IImageFacade {
    private final IImageService imageService;
    private final IProductService productService;

}
