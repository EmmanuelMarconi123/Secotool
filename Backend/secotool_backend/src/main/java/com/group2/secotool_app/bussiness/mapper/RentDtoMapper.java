package com.group2.secotool_app.bussiness.mapper;

import com.group2.secotool_app.model.dto.RentDto;
import com.group2.secotool_app.model.entity.Rent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RentDtoMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "rentalStartDate", target = "rentalStartDate")
    @Mapping(source = "rentalEndDate", target = "rentalEndDate")
    RentDto toRentDto(Rent rent);
}
