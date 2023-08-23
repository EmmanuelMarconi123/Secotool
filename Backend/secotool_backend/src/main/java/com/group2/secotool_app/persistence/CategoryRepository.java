package com.group2.secotool_app.persistence;

import com.group2.secotool_app.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    boolean existsByName(String name);

    Optional<Category> findByName(String name);

}
