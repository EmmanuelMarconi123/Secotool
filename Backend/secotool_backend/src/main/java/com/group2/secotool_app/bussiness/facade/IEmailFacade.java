package com.group2.secotool_app.bussiness.facade;

import com.group2.secotool_app.model.dto.request.ResendRegistrationEmailRequestDto;
import com.group2.secotool_app.model.dto.request.UserRegistrationRequestDto;
import com.group2.secotool_app.model.entity.Product;
import com.group2.secotool_app.model.entity.User;
import jakarta.mail.MessagingException;

import java.time.LocalDate;

public interface IEmailFacade {
    void singUpNotification(UserRegistrationRequestDto user) throws MessagingException;
    void rentalNotification(Product product, User user, LocalDate startDate, LocalDate endDate, Double totalPrice) throws MessagingException;
    void singUpNotification(ResendRegistrationEmailRequestDto registrationEmailRequestDto) throws MessagingException;
}
