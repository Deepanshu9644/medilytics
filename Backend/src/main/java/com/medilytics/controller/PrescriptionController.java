
package com.medilytics.controller;

import com.medilytics.model.AnalysisRecord;
import com.medilytics.repository.AnalysisRecordRepository;
import com.medilytics.service.GeminiService;
import com.medilytics.service.OCRService;
import com.medilytics.service.PostProcessorService;
import com.medilytics.utils.PdfTextExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {

   // private static final String UPLOAD_DIR = "C:/uploads/prescriptions/";
      private static final String UPLOAD_DIR = "/uploads/";

    @Autowired
    private OCRService ocrService;

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private PostProcessorService postProcessorService;

    @Autowired
    private AnalysisRecordRepository recordRepository;

    // ✅ Save dashboard activity
    private void saveActivity(String username, String summary) {
        AnalysisRecord record = new AnalysisRecord();
        record.setUsername(username);
        record.setAnalysisType("prescription");
        record.setSummary(summary);
        record.setStatus("Completed");
        record.setTimestamp(LocalDateTime.now());
        recordRepository.save(record);
    }

    // ✅ Upload PDF Prescription
    @PostMapping("/analyze")
    public ResponseEntity<String> uploadPrescription(
            @RequestParam("file") MultipartFile file,
            @RequestParam("username") String username,
            @RequestParam("language") String language
    ) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            String extractedText = PdfTextExtractor.extractText(file);
            //String filePath = UPLOAD_DIR + file.getOriginalFilename();
           // file.transferTo(new File(filePath));

            String aiResponse = geminiService.analyzePrescription(extractedText, language);
            String summary = postProcessorService.cleanSummary(aiResponse);

            // ✅ Save Activity
            saveActivity(username, "PDF Prescription analyzed");

            return ResponseEntity.ok(summary);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }

    // ✅ Upload Image Prescription
    @PostMapping("/image-analyze")
    public ResponseEntity<String> uploadPrescriptionImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("username") String username,
            @RequestParam("language") String language
    ) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            // String filePath = UPLOAD_DIR + file.getOriginalFilename();
            // File savedFile = new File(filePath);
            // file.transferTo(savedFile);
            File savedFile = new File(UPLOAD_DIR + System.currentTimeMillis() + "_" + file.getOriginalFilename());
file.transferTo(savedFile);
String filePath = savedFile.getAbsolutePath();

             String extractedText = ocrService.extractTextFromImage(savedFile);
            //String extractedText = ocrService.extractTextFromImage(file);
            String aiResponse = geminiService.analyzePrescription(extractedText, language);
            String summary = postProcessorService.cleanSummary(aiResponse);

            // ✅ Save Activity
            saveActivity(username, "Image Prescription analyzed");

            return ResponseEntity.ok(summary);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }
}
