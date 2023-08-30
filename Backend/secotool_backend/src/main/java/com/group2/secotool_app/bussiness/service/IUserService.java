package com.group2.secotool_app.bussiness.service;

import com.group2.secotool_app.model.entity.User;
import com.group2.secotool_app.model.entity.UserRole;

import java.util.List;

public interface IUserService {
    User findUserById(Long id);
    User findUserByUsername(String username);

    Long saveUser(User user);

    List<User> findAllUser();

    void changeUserRole(Long userId, UserRole userRole);
}
