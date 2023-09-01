package com.group2.secotool_app.persistence;

import com.group2.secotool_app.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    Optional<Product> findByName(String name);
    boolean existsByName(String name);

    @Query("SELECT p FROM Product p ORDER BY RAND() LIMIT 10")
    List<Product> getTenRandomProducts();

    @Query("SELECT p FROM Product p JOIN p.productFeatures f WHERE f.name = :featureName")
    List<Product> findAllByFeatureName(@Param("featureName") String featureName);

    @Query("SELECT p FROM Product p JOIN p.productCategories c WHERE c.name = :category")
    List<Product> findAllByCategory(@Param("category") String category);

    @Query("SELECT p FROM Product p JOIN p.productFeatures f WHERE f.id = :featureId")
    List<Product> findAllByFeatureId(@Param("featureId")Long featureId);

    @Query("SELECT p FROM Product p JOIN p.productCategories c WHERE c.id = :categoryId")
    List<Product> findAllByCategoryId(@Param("categoryId") Long categoryId);

    @Procedure(name = "deleteRelationsWithCategoryAndFeatures")
    void deleteRelationsWithCategoryAndFeatures(@Param("product_id") Long product_id);
}
