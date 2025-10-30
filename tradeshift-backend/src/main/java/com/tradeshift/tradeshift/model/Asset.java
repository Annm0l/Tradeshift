package com.tradeshift.tradeshift.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "assets")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // existing fields
    private String name;
    private String type;
    private double value;
    private String currency;

    //  NEW: owner mapping
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore                  // avoid recursion/PII in API responses
    private User user;

    public Asset() {}

    public Asset(String name, String type, double value, String currency, User user) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.currency = currency;
        this.user = user;
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
