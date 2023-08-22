package com.group2.secotool_app.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Column(nullable = false,unique = true)
    @Column(name = "name")
    private String name;

    //@Column(nullable = false)
    @Column(name = "description")
    private String description;

    //@Column(nullable = false)
    @Column(name = "price")
    private Double price;

    @OneToMany(mappedBy = "product", cascade = {
            CascadeType.PERSIST,
            CascadeType.REMOVE
    })
    @JsonIgnore
    private Set<Image> images;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST,mappedBy = "products")
    @JsonIgnore
    private Set<Feature> productFeatures;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST,mappedBy = "products")
    @JsonIgnore
    private Set<Category> productCategories;

}