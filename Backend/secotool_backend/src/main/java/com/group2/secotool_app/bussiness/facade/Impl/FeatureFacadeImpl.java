package com.group2.secotool_app.bussiness.facade.Impl;

import com.group2.secotool_app.bussiness.facade.IFeatureFacade;
import com.group2.secotool_app.bussiness.mapper.FeatureDtoMapper;
import com.group2.secotool_app.bussiness.mapper.FeatureMapper;
import com.group2.secotool_app.bussiness.service.IFeatureService;
import com.group2.secotool_app.bussiness.service.IProductService;
import com.group2.secotool_app.model.dto.FeatureDto;
import com.group2.secotool_app.model.dto.request.FeatureRequestDto;
import com.group2.secotool_app.model.entity.Feature;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FeatureFacadeImpl implements IFeatureFacade {
    private final IFeatureService featureService;
    private final IProductService productService;
    private final FeatureDtoMapper featureDtoMapper;
    private final FeatureMapper featureMapper;
    @Override
    public List<FeatureDto> getAllFeatures() {
        List<FeatureDto> featureDtos = new ArrayList<>();
        List<Feature> features = featureService.findAll();
        features.forEach(feature -> featureDtos.add(featureDtoMapper.toFeatureDto(feature)));
        return featureDtos;
    }

    @Override
    public void saveFeature(FeatureRequestDto featureRequestDto) {
        featureService.save(featureMapper.toFeature(featureRequestDto));
    }

    @Override
    public void updateFeature(FeatureRequestDto featureRequestDto, Long id) {
        var feature = featureMapper.toFeature(featureRequestDto);
        feature.setId(id);
        featureService.update(feature);
    }

    @Override
    public void deleteFeature(Long id) {
        featureService.delete(id);
    }



    //buscar todas las features aasociadas
    @Override
    public void associateProductToFeature(Long prodId, Long featureId) {
        var prod = productService.findProductById(prodId);
        var feature = featureService.findById(featureId);
        featureService.associateProductToFeature(prod,feature);
    }
}
