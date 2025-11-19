//package com.medilytics.service;
//
//import net.sourceforge.tess4j.ITesseract;
//import net.sourceforge.tess4j.Tesseract;
//import net.sourceforge.tess4j.TesseractException;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.imageio.ImageIO;
//import java.awt.*;
//import java.awt.image.BufferedImage;
//import java.io.File;
//import java.io.IOException;
//
//@Service
//public class OCRService {
//
//
//    public String extractTextFromMultipart(MultipartFile file) {
//        try {
//            File tempFile = File.createTempFile("prescription-", ".tmp");
//            file.transferTo(tempFile);
//            String text = extractTextFromImage(tempFile);
//            tempFile.delete();
//            return text;
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to process file: " + e.getMessage(), e);
//        }
//    }
//
//    public String extractTextFromImage(File imageFile) {
//
//       // System.out.println("Running OCR on image: " + imageFile.getName());
//
//        ITesseract tesseract = new Tesseract();
//       // tesseract.setDatapath("C:/Program Files/Tesseract-OCR");
//        tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR");
//        tesseract.setLanguage("eng");
//
//        try {
//            BufferedImage original = ImageIO.read(imageFile);
//            if (original == null) {
//                throw new RuntimeException("Unsupported or corrupted image format.");
//            }
//
//            BufferedImage preprocessed = preprocessImage(original);
//
//            return tesseract.doOCR(preprocessed);
//
//        } catch (TesseractException | IOException e) {
//            e.printStackTrace();
//            return "OCR failed: " + e.getMessage();
//        }
//    }
//
//
//    private BufferedImage preprocessImage(BufferedImage original) {
//        // Resize: scale up to 300 DPI equivalent
//        int newWidth = original.getWidth() * 2;
//        int newHeight = original.getHeight() * 2;
//        Image tmp = original.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH);
//        BufferedImage resized = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_ARGB);
//        Graphics2D g2d = resized.createGraphics();
//        g2d.drawImage(tmp, 0, 0, null);
//        g2d.dispose();
//
//        // Convert to grayscale
//        BufferedImage gray = new BufferedImage(resized.getWidth(), resized.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
//        g2d = gray.createGraphics();
//        g2d.drawImage(resized, 0, 0, null);
//        g2d.dispose();
//
//        // Binarize: simple threshold
//        BufferedImage binarized = new BufferedImage(gray.getWidth(), gray.getHeight(), BufferedImage.TYPE_BYTE_BINARY);
//        g2d = binarized.createGraphics();
//        g2d.drawImage(gray, 0, 0, null);
//        g2d.dispose();
//
//        return binarized;
//    }
//
//    public String extractMedicineName(MultipartFile image) {
//
//        ITesseract tesseract = new Tesseract();
//       // tesseract.setDatapath("C:/Program Files/Tesseract-OCR");
//        tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR");
//        try {
//            String text = tesseract.doOCR(ImageIO.read(image.getInputStream()));
//            // Simple cleanup
//            return text.replaceAll("[^a-zA-Z0-9 \\n]", "").trim();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//}

// package com.medilytics.service;

// import net.sourceforge.tess4j.ITesseract;
// import net.sourceforge.tess4j.Tesseract;
// import net.sourceforge.tess4j.TesseractException;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import javax.imageio.ImageIO;
// import java.awt.*;
// import java.awt.image.BufferedImage;
// import java.io.File;
// import java.io.IOException;

// @Service
// public class OCRService {

//     public String extractTextFromMultipart(MultipartFile file) {
//         try {
//             File tempFile = File.createTempFile("prescription-", ".tmp");
//             file.transferTo(tempFile);
//             String text = extractTextFromImage(tempFile);
//             tempFile.delete();
//             return text;
//         } catch (IOException e) {
//             throw new RuntimeException("Failed to process file: " + e.getMessage(), e);
//         }
//     }

//     public String extractTextFromImage(File imageFile) {
//         ITesseract tesseract = new Tesseract();
//         // ✅ Correct data path (point to the folder containing 'eng.traineddata')
//        // tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata");
//         // tesseract.setDatapath("/usr/share/tesseract-ocr/");
//        // tesseract.setLanguage("eng");
//         tesseract.setDatapath("/usr/share/tesseract-ocr/4.00/tessdata/");
//         tesseract.setLanguage("eng");

//         try {
//             BufferedImage original = ImageIO.read(imageFile);
//             if (original == null) {
//                 throw new RuntimeException("Unsupported or corrupted image format.");
//             }

//             BufferedImage preprocessed = preprocessImage(original);
//             return tesseract.doOCR(preprocessed);

//         } catch (TesseractException | IOException e) {
//             e.printStackTrace();
//             return "OCR failed: " + e.getMessage();
//         }
//     }

//     private BufferedImage preprocessImage(BufferedImage original) {
//         int newWidth = original.getWidth() * 2;
//         int newHeight = original.getHeight() * 2;
//         Image tmp = original.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH);
//         BufferedImage resized = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_ARGB);
//         Graphics2D g2d = resized.createGraphics();
//         g2d.drawImage(tmp, 0, 0, null);
//         g2d.dispose();

//         BufferedImage gray = new BufferedImage(resized.getWidth(), resized.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
//         g2d = gray.createGraphics();
//         g2d.drawImage(resized, 0, 0, null);
//         g2d.dispose();

//         BufferedImage binarized = new BufferedImage(gray.getWidth(), gray.getHeight(), BufferedImage.TYPE_BYTE_BINARY);
//         g2d = binarized.createGraphics();
//         g2d.drawImage(gray, 0, 0, null);
//         g2d.dispose();

//         return binarized;
//     }

//     public String extractMedicineName(MultipartFile image) {
//         ITesseract tesseract = new Tesseract();
//         // ✅ Correct data path here too
//        // tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata");
//        // tesseract.setLanguage("eng");
//         // tesseract.setDatapath("/usr/share/tesseract-ocr/");
//         tesseract.setDatapath("/usr/share/tesseract-ocr/4.00/tessdata/");
//         tesseract.setLanguage("eng");
//         try {
//             String text = tesseract.doOCR(ImageIO.read(image.getInputStream()));
//             return text.replaceAll("[^a-zA-Z0-9 \\n]", "").trim();
//         } catch (Exception e) {
//             e.printStackTrace();
//             return null;
//         }
//     }
// }

package com.medilytics.service;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class OCRService {

    private static final int MAX_SIZE = 1200; // Safe for Render

    public String extractTextFromMultipart(MultipartFile file) {
        try {
            File temp = File.createTempFile("img-", ".tmp");
            file.transferTo(temp);
            String text = extractTextFromImage(temp);
            temp.delete();
            return text;
        } catch (Exception e) {
            return "OCR failed: " + e.getMessage();
        }
    }

    public String extractTextFromImage(File imageFile) {
        try {
            BufferedImage img = ImageIO.read(imageFile);
            if (img == null) {
                throw new RuntimeException("Unsupported image format");
            }

            // Limit size for Render memory
            img = limitImageSize(img);

            // Convert to grayscale (lightweight)
            img = toGray(img);

            ITesseract tesseract = new Tesseract();
            tesseract.setDatapath("/usr/share/tesseract-ocr/4.00/tessdata/");
            tesseract.setLanguage("eng");

            return tesseract.doOCR(img);

        } catch (Exception e) {
            e.printStackTrace();
            return "OCR failed: " + e.getMessage();
        }
    }

    // ------------ UTIL METHODS -------------

    private BufferedImage limitImageSize(BufferedImage img) {
        int width = img.getWidth();
        int height = img.getHeight();

        if (width <= MAX_SIZE && height <= MAX_SIZE) return img;

        double scale = Math.min((double) MAX_SIZE / width, (double) MAX_SIZE / height);
        int newW = (int) (width * scale);
        int newH = (int) (height * scale);

        Image resized = img.getScaledInstance(newW, newH, Image.SCALE_SMOOTH);

        BufferedImage output = new BufferedImage(newW, newH, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = output.createGraphics();
        g2d.drawImage(resized, 0, 0, null);
        g2d.dispose();

        return output;
    }

    private BufferedImage toGray(BufferedImage img) {
        BufferedImage gray = new BufferedImage(img.getWidth(), img.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D g = gray.createGraphics();
        g.drawImage(img, 0, 0, null);
        g.dispose();
        return gray;
    }

    public String extractMedicineName(MultipartFile file) {
        try {
            BufferedImage img = ImageIO.read(file.getInputStream());
            img = limitImageSize(img);
            img = toGray(img);

            ITesseract tesseract = new Tesseract();
            tesseract.setDatapath("/usr/share/tesseract-ocr/4.00/tessdata/");
            tesseract.setLanguage("eng");

            String text = tesseract.doOCR(img);
            return text.replaceAll("[^a-zA-Z0-9 \\n]", "").trim();

        } catch (Exception e) {
            e.printStackTrace();
            return "OCR failed: " + e.getMessage();
        }
    }
}


// @Service
// public class OCRService {

//     private final String tessDataPath;

//     public OCRService() {
//         // This will work on both localhost and Render
//         this.tessDataPath = new File("src/main/resources/tessdata").getAbsolutePath();
//         System.out.println("TESSDATA PATH: " + tessDataPath);  // debug
//     }

//     public String extractTextFromMultipart(MultipartFile file) {
//         try {
//             File tempFile = File.createTempFile("prescription-", ".tmp");
//             file.transferTo(tempFile);
//             String text = extractTextFromImage(tempFile);
//             tempFile.delete();
//             return text;
//         } catch (IOException e) {
//             throw new RuntimeException("Failed to process file: " + e.getMessage(), e);
//         }
//     }

//     public String extractTextFromImage(File imageFile) {
//         ITesseract tesseract = new Tesseract();

//         tesseract.setDatapath(tessDataPath);
//         tesseract.setLanguage("eng");

//         try {
//             BufferedImage original = ImageIO.read(imageFile);
//             if (original == null) {
//                 throw new RuntimeException("Unsupported or corrupted image format.");
//             }

//             BufferedImage preprocessed = preprocessImage(original);
//             return tesseract.doOCR(preprocessed);

//         } catch (TesseractException | IOException e) {
//             e.printStackTrace();
//             return "OCR failed: " + e.getMessage();
//         }
//     }

//     private BufferedImage preprocessImage(BufferedImage original) {
//         int newWidth = original.getWidth() * 2;
//         int newHeight = original.getHeight() * 2;
//         Image tmp = original.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH);
//         BufferedImage resized = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_ARGB);
//         Graphics2D g2d = resized.createGraphics();
//         g2d.drawImage(tmp, 0, 0, null);
//         g2d.dispose();

//         BufferedImage gray = new BufferedImage(resized.getWidth(), resized.getHeight(), BufferedImage.TYPE_BYTE_GRAY);
//         g2d = gray.createGraphics();
//         g2d.drawImage(resized, 0, 0, null);
//         g2d.dispose();

//         BufferedImage binarized = new BufferedImage(gray.getWidth(), gray.getHeight(), BufferedImage.TYPE_BYTE_BINARY);
//         g2d = binarized.createGraphics();
//         g2d.drawImage(gray, 0, 0, null);
//         g2d.dispose();

//         return binarized;
//     }

//     public String extractMedicineName(MultipartFile image) {
//         try {
//             ITesseract tesseract = new Tesseract();

//             tesseract.setDatapath(tessDataPath);
//             tesseract.setLanguage("eng");

//             String text = tesseract.doOCR(ImageIO.read(image.getInputStream()));
//             return text.replaceAll("[^a-zA-Z0-9 \\n]", "").trim();

//         } catch (Exception e) {
//             e.printStackTrace();
//             return null;
//         }
//     }
// }


// @Service
// public class OCRService {

//     private final String tessDataPath = "/usr/share/tesseract-ocr/4.00/tessdata";

//     public String extractTextFromMultipart(MultipartFile file) {
//         try {
//             File tempFile = File.createTempFile("prescription-", ".tmp");
//             file.transferTo(tempFile);
//             String text = extractTextFromImage(tempFile);
//             tempFile.delete();
//             return text;
//         } catch (IOException e) {
//             throw new RuntimeException("Failed to process file: " + e.getMessage(), e);
//         }
//     }

//     public String extractTextFromImage(File imageFile) {
//         ITesseract tesseract = new Tesseract();

//         tesseract.setDatapath(tessDataPath);
//         tesseract.setLanguage("eng"); // Important

//         try {
//             BufferedImage original = ImageIO.read(imageFile);
//             return tesseract.doOCR(original);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return "OCR failed: " + e.getMessage();
//         }
//     }
// }





