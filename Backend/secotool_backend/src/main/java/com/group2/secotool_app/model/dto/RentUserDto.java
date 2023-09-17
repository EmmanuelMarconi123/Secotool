package com.group2.secotool_app.model.dto;

public record RentUserDto(
        Long productId,
        String productName,
        RentDto rentalData
) {
    public int compareTo(RentUserDto rentUserDto) {
        return this.rentalData.rentalStartDate().compareTo(rentUserDto.rentalData().rentalStartDate());
    }
}
