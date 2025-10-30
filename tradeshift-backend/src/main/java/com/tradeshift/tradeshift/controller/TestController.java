package com.tradeshift.tradeshift.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    // Public endpoint
    @GetMapping("/api/public")
    public String publicEndpoint() {
        return "This is a public endpoint. No authentication needed.";
    }

    // Secured endpoint
    @GetMapping("/api/secure")
    public String secureEndpoint() {
        return "This is a secured endpoint. You are authenticated!";
    }
}
