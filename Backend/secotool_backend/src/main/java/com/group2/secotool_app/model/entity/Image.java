package com.group2.secotool_app.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Column(nullable = false)
    @Column(name = "url")
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id",nullable = false)
    @JsonIgnore
    private Product product;

    @OneToOne(mappedBy = "image", cascade = {
            CascadeType.PERSIST,
            CascadeType.REMOVE
    },fetch = FetchType.LAZY)
    private Category category;
}
