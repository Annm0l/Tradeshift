package com.tradeshift.tradeshift.controller;

import com.tradeshift.tradeshift.model.User;
import com.tradeshift.tradeshift.repository.UserRepository;
import com.tradeshift.tradeshift.security.JwtUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/mobile")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class OtpLoginController {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final Map<String, String> otpMap = new HashMap<>();


    private static final String API_KEY = "yy8zpE0sXOD5s8zJQxhnrJ4tlpZYgglu4Uh7ydhfIqWdb6tIhJFlFfvslavl";

    public OtpLoginController(UserRepository userRepository, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    //
    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> req) {
        String phone = req.get("phone");
        if (phone == null || phone.isEmpty()) {
            throw new RuntimeException("Phone number is required");
        }

        // Check if user exists
        User user = userRepository.findByMobile(phone)
                .orElseThrow(() -> new RuntimeException("Mobile number not registered"));

        // Generate OTP (6 digits)
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpMap.put(phone, otp);

        // Send OTP via 2Factor API
        sendOtpToPhone(phone, otp);

        return "OTP sent successfully to " + phone;
    }

    //
    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> req) {
        String phone = req.get("phone");
        String otp = req.get("otp");

        if (otp == null || otp.isEmpty()) {
            throw new RuntimeException("OTP is required");
        }

        if (otpMap.containsKey(phone) && otpMap.get(phone).equals(otp)) {
            otpMap.remove(phone);

            User user = userRepository.findByMobile(phone)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtUtils.generateToken(user.getEmail());
            return Map.of("token", token);
        } else {
            throw new RuntimeException("Invalid or expired OTP");
        }
    }

    //
    private void sendOtpToPhone(String phone, String otp) {
        try {

            String url = "https://2factor.in/API/V1/" + API_KEY + "/SMS/" + phone + "/" + otp + "/TradeShiftOTP";

            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            System.out.println("✅ OTP sent via 2Factor → " + response);
        } catch (Exception e) {
            System.out.println("❌ OTP send failed: " + e.getMessage());
        }
    }
}
