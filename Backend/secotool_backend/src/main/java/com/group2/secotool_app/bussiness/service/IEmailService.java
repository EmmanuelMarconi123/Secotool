package com.group2.secotool_app.bussiness.service;

public interface IEmailService {
    void sendEmail(String to, String subject, String body);
}
