package com.tradeshift.tradeshift.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/secure")
public class SecureController {

    @GetMapping("/hello")
    public String securedHello(Authentication auth) {
        return "Hello, " + auth.getName() + "! You have accessed a secured endpoint.";
    }
}
