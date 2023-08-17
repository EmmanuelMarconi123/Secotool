package com.group2.secotool_app.bussiness.service;

import com.group2.secotool_app.model.entity.User;

import java.util.List;

public interface IUserService {
    User findUserById(Long id);
    User findUserByUsername(String username);

    Long saveUser(User user);

    List<User> findAllUser();
}
