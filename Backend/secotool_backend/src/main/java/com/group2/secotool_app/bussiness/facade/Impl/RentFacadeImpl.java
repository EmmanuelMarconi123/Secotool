package com.group2.secotool_app.bussiness.facade.Impl;

import com.group2.secotool_app.bussiness.facade.IRentFacade;
import com.group2.secotool_app.bussiness.mapper.ProductDtoMapper;
import com.group2.secotool_app.bussiness.service.IProductService;
import com.group2.secotool_app.bussiness.service.IProductValidationService;
import com.group2.secotool_app.bussiness.service.IRentService;
import com.group2.secotool_app.bussiness.service.IUserService;
import com.group2.secotool_app.model.dto.RentProductDto;
import com.group2.secotool_app.model.dto.request.RentProductRequestDto;
import com.group2.secotool_app.model.entity.Product;
import com.group2.secotool_app.util.ProductUtils;
import com.group2.secotool_app.util.RentUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RentFacadeImpl implements IRentFacade {

    private final IRentService rentService;
    private final IProductService productService;
    private final IProductValidationService productValidationService;

    private final IUserService userService;
    private final ProductDtoMapper productDtoMapper;
    private final ProductUtils productUtils;
    private final RentUtils rentUtils;
    @Override
    public RentProductDto validateUserRangeOfDatesToRent(RentProductRequestDto rangeOfDates) {

        var prodToRent = productService.findProductById(rangeOfDates.productId());
        var startDate = rangeOfDates.startDate();
        var endDate = rangeOfDates.endDate();

        if (!productValidationService.isProductAvailableToRent(rangeOfDates,prodToRent))
            throw new RuntimeException(String.format("product %s is not available for rent between %s and %s", prodToRent.getName(), startDate, endDate));

        var totalDays = productUtils.daysQuantity(startDate,endDate);
        var totalPrice = rentUtils.calculateTotalPriceOfRent(totalDays,prodToRent.getPrice());

        return new RentProductDto(startDate,endDate,totalDays,totalPrice,productDtoMapper.toProductDto(prodToRent));
    }

    @Override
    public void registerRent(RentProductRequestDto rentProductRequestDto, Long userId) {
        var prodToRent = productService.findProductById(rentProductRequestDto.productId());
        var user = userService.findUserById(userId);
        var startDate = rentProductRequestDto.startDate();
        var endDate = rentProductRequestDto.endDate();

        if (!productValidationService.isProductAvailableToRent(rentProductRequestDto,prodToRent))
            throw new RuntimeException(
                    String.format("product %s is not available for rent between %s and %s", prodToRent.getName(), startDate, endDate)
            );

        var totalDays = productUtils.daysQuantity(startDate,endDate);
        var totalPrice = rentUtils.calculateTotalPriceOfRent(totalDays,prodToRent.getPrice());
        rentService.saveRent(prodToRent, startDate, endDate, user, totalDays, totalPrice);
    }


}
