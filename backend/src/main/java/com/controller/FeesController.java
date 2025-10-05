package com.controller;

import org.springframework.web.bind.annotation.RestController;

import com.service.FeesService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "*") // Add this line
@RestController
@RequestMapping("api/fees")
public class FeesController {
    private final FeesService feesService;
    public FeesController(FeesService feesService) {
        this.feesService = feesService;
    }

    @GetMapping("/collection-percent")
    public Double getCollectionPercent() {
        return feesService.getCollectionPercent();    
    }
}
