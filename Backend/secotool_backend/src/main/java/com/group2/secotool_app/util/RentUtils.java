package com.group2.secotool_app.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RentUtils {

    public Double calculateTotalPriceOfRent(long totalDays, Double productPrice){
        return productPrice * totalDays;
    }

}
