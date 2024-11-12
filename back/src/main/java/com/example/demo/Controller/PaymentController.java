package com.example.demo.Controller;

import com.example.demo.Dto.PaymentDTO;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.math.BigInteger;
//import java.security.MessageDigest;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.util.Map;

@RestController
@CrossOrigin(value = "http://127.0.0.1:5173/")
public class PaymentController {

//    @Autowired
//    private PaymentServices paymentServices;
//
//    @Autowired
//    private UserService userService;


    private String merchantSecret = "Mzk1MjE3MDk5NjM0NDAxMDcyNjgxNzY4OTM4NDU5NDAxMDAwMjc5NA==";

    @PutMapping("auth/calculateHash")
    public PaymentDTO calculateHash(@RequestParam("amount") double amount) {
        System.out.println("----------start cal hash ---------------");
        System.out.println("Current Time: " + java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        String merahantID     = "1228616";
        String orderID = Long.toString(System.currentTimeMillis()) + "-" + Math.random();
        double amounts         = amount;
        String currency       = "LKR";
        DecimalFormat df       = new DecimalFormat("0.00");
        String amountFormatted = df.format(amounts);
        System.out.println(merahantID);
        System.out.println(orderID);
        System.out.println(amountFormatted);
        System.out.println(currency);

        String hash    = getMd5(merahantID + orderID + amountFormatted + currency + getMd5(merchantSecret).toUpperCase());

        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setOrderId(orderID);
        paymentDTO.setHash(hash);
        paymentDTO.setAmount(String.format("%.2f", amounts));
        System.out.println("-----------------");
        System.out.println(hash);


        return paymentDTO;

    }
    @PostMapping("auth/notify")
    public ResponseEntity<String> handlePaymentNotification(@RequestBody Map<String, String> payload) {
        System.out.println("----called---------");
        String receivedMerchantId = payload.get("merchant_id");
        String orderId = payload.get("order_id");
        String payhereAmount = payload.get("payhere_amount");
        String payhereCurrency = payload.get("payhere_currency");
        String statusCode = payload.get("status_code");
        String md5sig = payload.get("md5sig");

        // Generate local md5 signature for verification
        String localMd5sig = getMd5(receivedMerchantId + orderId + payhereAmount + payhereCurrency + statusCode + getMd5(merchantSecret));

        // Verify the payment notification by comparing the received md5sig with the generated one
        if (localMd5sig.equalsIgnoreCase(md5sig) && "2".equals(statusCode)) {
            // Payment is successful; you can add code here to update the database or perform other actions
            return new ResponseEntity<>("payment sucess", HttpStatus.OK);
        } else {
            // Payment verification failed
            return new ResponseEntity<>("Payment verification failed for order:",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // important part
    public static String getMd5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            BigInteger no = new BigInteger(1, messageDigest);
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext.toUpperCase();
        }
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/test")
    public  String test(){
        return "hello";
    }


}

