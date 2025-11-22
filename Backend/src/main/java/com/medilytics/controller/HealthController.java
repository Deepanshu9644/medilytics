package com.medilytics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @RequestMapping(value = "/health", method = {RequestMethod.GET, RequestMethod.HEAD})
    public String health() {
        return "OK";
    }
}

