package com.group2.secotool_app.persistence;

import com.group2.secotool_app.model.entity.ProductPolitic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPoliticRepository extends JpaRepository<ProductPolitic,Long> {
    boolean existsByName(String title);
}
