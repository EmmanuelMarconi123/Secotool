package com.group2.secotool_app.bussiness.facade;

import com.group2.secotool_app.model.dto.FeatureDto;
import com.group2.secotool_app.model.dto.request.FeatureRequestDto;

import java.util.List;

public interface IFeatureFacade {
    List<FeatureDto> getAllFeatures();

    void saveFeature(FeatureRequestDto featureRequestDto);

    void updateFeature(FeatureRequestDto featureRequestDto, Long id);

    void deleteFeature(Long id);

    void associateProductToFeature(Long prodId, Long featureId);
}
