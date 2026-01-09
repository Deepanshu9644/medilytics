package com.medilytics.controller;

import com.medilytics.service.GeminiService;
import com.medilytics.service.OCRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/medicine")
public class MedicineDecoderController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private OCRService ocrService;

    


    @PostMapping(value = "/decode", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<?> decode(
        @RequestParam(required = false) String medicineName,
        @RequestParam(required = false) String language,
        @RequestParam(required = false) MultipartFile image) {

    System.out.println("Image received: " + (image != null ? image.getOriginalFilename() : "NULL"));

    if ((medicineName == null || medicineName.isEmpty()) &&
        (image == null || image.isEmpty())) {
        return ResponseEntity.badRequest().body(Map.of("error", "Provide medicineName OR image"));
    }

    if (medicineName == null || medicineName.isEmpty()) {
        medicineName = ocrService.extractMedicineName(image);
        System.out.println("Extracted Medicine Name: " + medicineName);
        if (medicineName == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "OCR failed"));
        }
    }

    Map<String, String> details = geminiService.getMedicineDetails(medicineName, language);

    if (details.isEmpty()) {
        return ResponseEntity.status(500).body(Map.of("error", "Gemini parsing failed"));
    }

    return ResponseEntity.ok(details);
}
}
