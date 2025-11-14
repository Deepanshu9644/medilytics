package com.medilytics.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "analysis_records")
public class AnalysisRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;
    private String analysisType; // medicine, report, prescription
    private String summary;      // e.g. “Extracted 3 medicines”
    private String status;       // Completed, Failed
    private LocalDateTime timestamp;

    public void setUsername(String username) {
    }

    public void setAnalysisType(String prescription) {
    }

    public void setSummary(String summary) {
    }

    public void setStatus(String completed) {
    }

    public void setTimestamp(LocalDateTime now) {
    }
}

