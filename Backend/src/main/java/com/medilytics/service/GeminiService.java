package com.medilytics.service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

import java.time.LocalDate;
import java.util.*;


@Service
public class GeminiService {


    private String API_KEY;
    private String API_URL;

    public GeminiService() {
        this.API_KEY = System.getenv("GEMINI_API_KEY");
        this.API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;
    }



public static String buildPrescriptionPrompt(String extractedText, String language) {
    // Clean the extracted text for better model understanding
    extractedText = extractedText.replaceAll("\\s+", " ").trim();

    String prompt = """
You are a highly accurate medical assistant AI. Analyze the prescription text below and extract all structured details.

Return a **valid JSON only** that exactly matches this format:

{
  "doctorname": "string",
  "specialization": "string",
  "registration": "string",
  "date": "string",
  "patientname": "string",
  "age": "number",
  "diagnosis": "string",
  "medicines": [
    {
      "medicinename": "string",
      "dosage": "string",
      "frequency": "string",
      "duration": "string",
      "timings": "string",
      "instructions": "string",
      "medicinetype": "string"
    }
  ],
  "generalInstructions": ["string"],
  "warnings": ["string"]
}

Guidelines:
1. Extract all details from the text carefully.
2. If any field is missing, fill it with "Not Available".
3. Use your medical reasoning to infer:
   - Probable diagnosis from prescribed medicines.
   - Medicine type (Antibiotic, Antimalarial, Painkiller, etc.)
4. Return only the JSON (no explanations or extra text).
5. Keep all keys in lowercase.
6. The extracted prescription text is between triple backticks.

Extracted Prescription Text:
```""" + extractedText + "```"
            + "\nRespond in " + language + " with JSON only.";

    return prompt;
}

    // ✅ Main method to call Gemini API
    public String analyzePrescription(String extractedText, String language) throws IOException {
        String prompt = buildPrescriptionPrompt(extractedText, language);

        // Build the request body for Gemini
        Map<String, Object> part = Map.of("text", prompt);
        Map<String, Object> content = Map.of("parts", List.of(part));
        Map<String, Object> requestBody = Map.of("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, request, Map.class);

        try {
            // ✅ Extract and clean response
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> contentMap = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) contentMap.get("parts");

            String textResponse = (String) parts.get(0).get("text");

            // ✅ Clean extra markdown or junk Gemini might add
            textResponse = textResponse.replaceAll("(?s)```json|```", "").trim();
            int startIndex = textResponse.indexOf("{");
            int endIndex = textResponse.lastIndexOf("}");
            if (startIndex != -1 && endIndex != -1) {
                textResponse = textResponse.substring(startIndex, endIndex + 1);
            }

            // ✅ Validate JSON structure
            ObjectMapper mapper = new ObjectMapper();
            mapper.readTree(textResponse); // ensures valid JSON

            return textResponse;

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Error parsing Gemini response: " + e.getMessage() + "\"}";
        }
    }

    public Map<String, String> getMedicineDetails(String medicineName, String language) {
        RestTemplate restTemplate = new RestTemplate();

        String prompt = "I want detailed information about the medicine. \"" + medicineName + "\" in the following structured format. Respond strictly using these headings:\n\n" +
                "**medicineName:**\n" +
                "**genericName:**\n" +
                "**category:**\n" +
                "**manufacturer:**\n" +
                "**uses:**\n" +
                "**dosage:**\n" +
                "**sideEffects:**\n" +
                "**precautions:**\n" +
                "**interactions:**\n" +
                "**storage:**\n" +
                "**confidenceScore:**\n\n" +
                "Keep explanations concise and in bullet points where applicable. Respond in " + language + ". " +
                "Do not add extra text or headings."+"Respond in " + language + ". " +
        "Do not add extra text or headings.";




        Map<String, Object> requestBody = new HashMap<>();
        List<Map<String, Object>> contents = new ArrayList<>();
        Map<String, Object> contentEntry = new HashMap<>();
        List<Map<String, String>> parts = new ArrayList<>();

        parts.add(Map.of("text", prompt));
        contentEntry.put("parts", parts);
        contents.add(contentEntry);
        requestBody.put("contents", contents);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, request, Map.class);

            //System.out.println("✅ Full API Raw Response: " + response.getBody());

            // Step 1: Check if 'candidates' exists
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                return Map.of("error", "No candidates in Gemini API response.");
            }

            // Step 2: Get 'content' from the first candidate
            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            if (content == null) {
                return Map.of("error", "Content missing in Gemini API response.");
            }

            // Step 3: Get 'parts' list
            List<Map<String, Object>> partsList = (List<Map<String, Object>>) content.get("parts");
            if (partsList == null || partsList.isEmpty()) {
                return Map.of("error", "Parts list is missing in Gemini API response.");
            }

            // Step 4: Get 'text'
            String aiReply = (String) partsList.get(0).get("text");
            if (aiReply == null || aiReply.isEmpty()) {
                return Map.of("error", "AI response text is empty.");
            }


            Map<String, String> parsedSections = parseSections(aiReply);

            if (parsedSections.isEmpty()) {
                return Map.of("error", "Failed to parse AI response.");
            }

            return parsedSections;

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("error", "Exception occurred: " + e.getMessage());
        }
    }

    private Map<String, String> parseSections(String aiResponse) {


        Map<String, String> sections = new LinkedHashMap<>();

        // Clean response
        aiResponse = aiResponse.trim();

        // Split based on the section headers
        String[] parts = aiResponse.split("\\*\\*");

        for (int i = 1; i < parts.length; i += 2) {  // Start from index 1 because split will lead to empty string at index 0
            String title = parts[i].replace(":", "").trim();
            String content = parts[i + 1].trim();

            content = content.replaceAll("\\s*\\*\\s*", "\n* ");

            sections.put(title, content);
        }

        return sections;
    }

    public String analyzeReport(String extractedText, String language) throws IOException {



        String prompt = """
You are a medical report analysis AI.

Analyze the following extracted medical report text and return only valid JSON (no markdown, no explanation).

Your JSON must match this exact structure and field names:

{
  "name": "string",
  "age": "string",
  "gender": "string",
  "summaryText": "string",
  "testparameters": [
    {
      "name": "string",
      "value": "string",
      "unit": "string",
      "normalRange": "string",
      "status": "string",
      "trend": "string"
    }
  ],
  "recommendations": [
    "string"
  ],
  "alerts": [
    "string"
  ]
}

Guidelines:
- summaryText: string (layman-friendly summary of key results in detailing sothat understand the patient.
- Always include all keys, even if data is not available (use empty arrays where needed).
- Recommendations should provide **practical advice** for the patient based on the findings.
- Alerts should highlight **abnormal or risky values**.
- Return strictly JSON — do not include markdown, extra notes, or explanations.

"""+"Respond in " + language + ". "+"Report text: "+ extractedText;

        System.out.println(language);
        // --- Gemini API Request ---
        Map<String, Object> part = Map.of("text", prompt);
        Map<String, Object> content = Map.of("parts", List.of(part));
        Map<String, Object> requestBody = Map.of("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, request, Map.class);

        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> contentMap = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) contentMap.get("parts");
            String textResponse = (String) parts.get(0).get("text");

            // Clean extra text if Gemini adds markdown or notes
            int startIndex = textResponse.indexOf("{");
            int endIndex = textResponse.lastIndexOf("}");
            if (startIndex != -1 && endIndex != -1) {
                textResponse = textResponse.substring(startIndex, endIndex + 1);
            }

            return textResponse;
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Error parsing Gemini response: " + e.getMessage() + "\"}";
        }
    }
}