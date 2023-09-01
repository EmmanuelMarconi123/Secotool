package com.group2.secotool_app.util;

import com.group2.secotool_app.model.dto.ProductDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductUtils {

    public List<ProductDto> removeDuplicated(List<ProductDto> productDtos){
        List<ProductDto> productDtoList = new ArrayList<>(productDtos);
        productDtoList.sort((p1,p2) -> p1.compareTo(p2));

        for (int i = 0; i < productDtoList.size() - 1; i++) {
            if (productDtoList.get(i).id().equals(productDtoList.get(i+1).id())){
                productDtoList.remove(i);
            }
        }
        return productDtoList;
    }
}
