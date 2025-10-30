package com.tradeshift.tradeshift.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "portfolios")
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be empty")
    @Column(nullable = false)
    private String name;

    private String description;

    @NotNull(message = "Value cannot be null")
    private Double value;

    public Portfolio() {}

    public Portfolio(String name, String description, Double value) {
        this.name = name;
        this.description = description;
        this.value = value;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }
}
