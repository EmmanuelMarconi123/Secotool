package com.group2.secotool_app.model.dto.request;

import java.time.LocalDate;

public record RentProductRequestDto(
        Long productId,
        LocalDate startDate,
        LocalDate endDate
) {
}
