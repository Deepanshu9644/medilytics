//package com.medilytics.service;
//
//import com.medilytics.model.DocumentEntity;
//import com.medilytics.repository.DocumentRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class DocumentService {
//
//    private final DocumentRepository repo;
//
//    private final String UPLOAD_DIR = "uploaded-documents";
//
//    public DocumentEntity upload(MultipartFile file) throws Exception {
//
//        File folder = new File(UPLOAD_DIR);
//        if (!folder.exists()) folder.mkdirs();
//
//        Path filePath = Path.of(UPLOAD_DIR, file.getOriginalFilename());
//        Files.write(filePath, file.getBytes());
//
//        DocumentEntity doc = DocumentEntity.builder()
//                .name(file.getOriginalFilename())
//                .type(getFileType(file.getOriginalFilename()))
//                .size(((double) file.getSize()) / (1024 * 1024))
//                .uploadDate(LocalDate.now().toString())
//                .category(detectCategory(file.getOriginalFilename()))
//                .filePath(filePath.toString())
//                .build();
//
//        return repo.save(doc);
//    }
//
//    public List<DocumentEntity> getAll() {
//        return repo.findAll();
//    }
//
//    public byte[] view(String id) throws Exception {
//        DocumentEntity doc = repo.findById(id).orElseThrow();
//        return Files.readAllBytes(Path.of(doc.getFilePath()));
//    }
//
//    public byte[] download(String id) throws Exception {
//        DocumentEntity doc = repo.findById(id).orElseThrow();
//        return Files.readAllBytes(Path.of(doc.getFilePath()));
//    }
//
//    public void delete(String id) throws Exception {
//        DocumentEntity doc = repo.findById(id).orElseThrow();
//        Files.deleteIfExists(Path.of(doc.getFilePath()));
//        repo.deleteById(id);
//    }
//
//    // Helpers
//    private String getFileType(String fileName) {
//        return fileName.substring(fileName.lastIndexOf(".") + 1).toUpperCase();
//    }
//
//    private String detectCategory(String name) {
//        if (name.toLowerCase().contains("report")) return "report";
//        if (name.toLowerCase().contains("prescription")) return "prescription";
//        if (name.toLowerCase().contains("medicine")) return "medicine";
//        return "other";
//    }
//}
//

//package com.medilytics.service;
//
//import com.medilytics.model.DocumentEntity;
//import com.medilytics.repository.DocumentRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class DocumentService {
//
//    private final DocumentRepository repo;
//
//    private final String UPLOAD_DIR = "uploaded-documents";
//
//    // Upload document for a specific user
//    public DocumentEntity upload(MultipartFile file, String userId) throws Exception {
//        File folder = new File(UPLOAD_DIR);
//        if (!folder.exists()) folder.mkdirs();
//
//        Path filePath = Path.of(UPLOAD_DIR, file.getOriginalFilename());
//        Files.write(filePath, file.getBytes());
//
//        DocumentEntity doc = DocumentEntity.builder()
//                .name(file.getOriginalFilename())
//                .type(getFileType(file.getOriginalFilename()))
//                .size(((double) file.getSize()) / (1024 * 1024))
//                .uploadDate(LocalDate.now().toString())
//                .category(detectCategory(file.getOriginalFilename()))
//                .filePath(filePath.toString())
//                .userId(userId) // assign owner
//                .build();
//
//        return repo.save(doc);
//    }
//
//    // Get documents for a specific user
//    public List<DocumentEntity> getAllByUser(String userId) {
//        return repo.findByUserId(userId);
//    }
//
//    public byte[] view(String id) throws Exception {
//        DocumentEntity doc = repo.findById(id).orElseThrow();
//        return Files.readAllBytes(Path.of(doc.getFilePath()));
//    }
//
//    public byte[] download(String id) throws Exception {
//        DocumentEntity doc = repo.findById(id).orElseThrow();
//        return Files.readAllBytes(Path.of(doc.getFilePath()));
//    }
//
//    public void delete(String id) throws Exception {
//        DocumentEntity doc = repo.findById(id).orElseThrow();
//        Files.deleteIfExists(Path.of(doc.getFilePath()));
//        repo.deleteById(id);
//    }
//
//    // Helpers
//    private String getFileType(String fileName) {
//        return fileName.substring(fileName.lastIndexOf(".") + 1).toUpperCase();
//    }
//
//    private String detectCategory(String name) {
//        if (name.toLowerCase().contains("report")) return "report";
//        if (name.toLowerCase().contains("prescription")) return "prescription";
//        if (name.toLowerCase().contains("medicine")) return "medicine";
//        return "other";
//    }
//}

package com.medilytics.service;

import com.medilytics.model.DocumentEntity;
import com.medilytics.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository repo;
    private final String UPLOAD_DIR = "/upload";

    // Upload file for a specific user
    public DocumentEntity upload(MultipartFile file, String userId) throws Exception {
        File folder = new File(UPLOAD_DIR);
        if (!folder.exists()) folder.mkdirs();

        Path filePath = Path.of(UPLOAD_DIR, userId + "_" + file.getOriginalFilename());
        Files.write(filePath, file.getBytes());

        DocumentEntity doc = DocumentEntity.builder()
                .name(file.getOriginalFilename())
                .type(getFileType(file.getOriginalFilename()))
                .size(((double) file.getSize()) / (1024 * 1024))
                .uploadDate(LocalDate.now().toString())
                .category(detectCategory(file.getOriginalFilename()))
                .filePath(filePath.toString())
                .userId(userId)
                .build();

        return repo.save(doc);
    }

    // Get documents for a specific user
    public List<DocumentEntity> getAllByUser(String userId) {
        return repo.findByUserId(userId);
    }

    public byte[] view(String id) throws Exception {
        DocumentEntity doc = repo.findById(id).orElseThrow();
        return Files.readAllBytes(Path.of(doc.getFilePath()));
    }

    public byte[] download(String id) throws Exception {
        DocumentEntity doc = repo.findById(id).orElseThrow();
        return Files.readAllBytes(Path.of(doc.getFilePath()));
    }

    public void delete(String id) throws Exception {
        DocumentEntity doc = repo.findById(id).orElseThrow();
        Files.deleteIfExists(Path.of(doc.getFilePath()));
        repo.deleteById(id);
    }

    // Helpers
    private String getFileType(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1).toUpperCase();
    }

    private String detectCategory(String name) {
        if (name.toLowerCase().contains("report")) return "report";
        if (name.toLowerCase().contains("prescription")) return "prescription";
        if (name.toLowerCase().contains("medicine")) return "medicine";
        return "other";
    }
}
