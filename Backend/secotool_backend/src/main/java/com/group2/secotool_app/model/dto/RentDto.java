package com.group2.secotool_app.model.dto;

import java.time.LocalDate;

public record RentDto(
        Long id,
        LocalDate rentalStartDate,
        LocalDate rentalEndDate
) {
}
