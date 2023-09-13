package com.group2.secotool_app.presentation.Controllers;

import com.group2.secotool_app.bussiness.facade.IRentFacade;
import com.group2.secotool_app.model.dto.RentValidatedDto;
import com.group2.secotool_app.model.dto.request.RentProductRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api/rentals")
@RequiredArgsConstructor
public class RentController {

    private final IRentFacade rentFacade;


    @GetMapping("/historical")
    public ResponseEntity<?> userHistorylOfRentals(){
        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        return ResponseEntity.ok(rentFacade.userHistorylOfRentals(userId));
    }
    @PostMapping("/validate")
    public ResponseEntity<RentValidatedDto> validateUserRent(@RequestBody @Valid RentProductRequestDto rangeOfDates){
        return ResponseEntity.ok(rentFacade.validateUserRangeOfDatesToRent(rangeOfDates));
    }

    @PostMapping
    public ResponseEntity<String> rentProduct(@RequestBody @Valid RentProductRequestDto rentProductRequestDto){
        Long userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        rentFacade.registerRent(rentProductRequestDto, userId);
        return ResponseEntity.ok(String.format("producto %s succesful rented by %s from %s to %s",rentProductRequestDto.productId(),userId,rentProductRequestDto.startDate(),rentProductRequestDto.endDate()));
    }

}
