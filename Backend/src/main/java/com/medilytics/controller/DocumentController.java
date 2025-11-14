

package com.medilytics.controller;

import com.medilytics.model.DocumentEntity;
import com.medilytics.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService service;

    @PostMapping("/upload")
    public ResponseEntity<DocumentEntity> uploadDocument(@RequestParam("file") MultipartFile file) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName(); // UID or unique JWT ID
        DocumentEntity doc = service.upload(file, userId);
        return ResponseEntity.ok(doc);
    }

    @GetMapping
    public ResponseEntity<List<DocumentEntity>> getDocuments() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName(); // UID or unique JWT ID
        List<DocumentEntity> userDocs = service.getAllByUser(userId);
        return ResponseEntity.ok(userDocs);
    }

    @GetMapping("/{id}/view")
    public ResponseEntity<byte[]> view(@PathVariable String id) throws Exception {
        System.out.println("Hello");
        byte[] data = service.view(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline;")
                .contentType(MediaType.APPLICATION_PDF)
                .body(data);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> download(@PathVariable String id) throws Exception {
        byte[] data = service.download(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) throws Exception {
        service.delete(id);
        return ResponseEntity.ok("Document deleted");
    }
}
