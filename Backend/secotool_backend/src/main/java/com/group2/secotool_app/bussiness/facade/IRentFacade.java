package com.group2.secotool_app.bussiness.facade;

import com.group2.secotool_app.model.dto.RentValidatedDto;
import com.group2.secotool_app.model.dto.request.RentProductRequestDto;

public interface IRentFacade {
    RentValidatedDto validateUserRangeOfDatesToRent(RentProductRequestDto rangeOfDates);

    void registerRent(RentProductRequestDto rentProductRequestDto, Long userId);
}
