
// package com.medilytics.security;

// import com.google.auth.oauth2.GoogleCredentials;
// import com.google.firebase.FirebaseApp;
// import com.google.firebase.FirebaseOptions;
// import org.springframework.stereotype.Component;

// import javax.annotation.PostConstruct;
// import java.io.FileInputStream;
// import java.io.IOException;

// @Component
// public class FirebaseInitializer {

//     @PostConstruct
//     public void init() {
//         try {
//             if (FirebaseApp.getApps().isEmpty()) {
//                 FileInputStream serviceAccount =
//                         new FileInputStream("src/main/resources/firebase-service-account.json");

//                 FirebaseOptions options = new FirebaseOptions.Builder()
//                         .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                         .build();

//                 FirebaseApp.initializeApp(options);
//                 System.out.println("✅ Firebase initialized successfully");
//             }
//         } catch (IOException e) {
//             System.out.println("❌ Error initializing Firebase: " + e.getMessage());
//         }
//     }
// }

// package com.medilytics.security;

// import com.google.auth.oauth2.GoogleCredentials;
// import com.google.firebase.FirebaseApp;
// import com.google.firebase.FirebaseOptions;
// import org.springframework.stereotype.Component;

// import javax.annotation.PostConstruct;
// import java.io.ByteArrayInputStream;
// import java.nio.charset.StandardCharsets;

// @Component
// public class FirebaseInitializer {

//     @PostConstruct
//     public void init() {
//         try {
//             if (FirebaseApp.getApps().isEmpty()) {

//                 // Read Firebase JSON from environment variable
//                 String firebaseJson = System.getenv("FIREBASE_CONFIG");

//                 if (firebaseJson == null || firebaseJson.isEmpty()) {
//                     System.out.println("❌ FIREBASE_CONFIG environment variable is missing!");
//                     return;
//                 }

//                 GoogleCredentials credentials = GoogleCredentials
//                         .fromStream(new ByteArrayInputStream(firebaseJson.getBytes(StandardCharsets.UTF_8)));

//                 FirebaseOptions options = FirebaseOptions.builder()
//                         .setCredentials(credentials)
//                         .build();

//                 FirebaseApp.initializeApp(options);

//                 System.out.println("✅ Firebase initialized successfully using ENV variable");
//             }
//         } catch (Exception e) {
//             System.out.println("❌ Error initializing Firebase: " + e.getMessage());
//         }
//     }
// }


package com.medilytics.security;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

@Component
public class FirebaseInitializer {

    @PostConstruct
    public void init() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {

                // Expect Render to provide path: /etc/secrets/firebase-service-account.json
                String path = System.getenv("FIREBASE_CONFIG"); // should be /etc/secrets/firebase-service-account.json

                if (path == null || path.isBlank()) {
                    System.out.println("❌ FIREBASE_CONFIG env var missing or empty - cannot init Firebase");
                    return;
                }

                File f = new File(path);
                if (!f.exists()) {
                    System.out.println("❌ Firebase service file not found at: " + path);
                    return;
                }

                try (InputStream serviceAccount = new FileInputStream(f)) {
                    FirebaseOptions options = FirebaseOptions.builder()
                            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                            .build();

                    FirebaseApp.initializeApp(options);
                    System.out.println("✅ Firebase initialized successfully (from file " + path + ")");
                }
            }
        } catch (Exception e) {
            System.out.println("❌ Error initializing Firebase: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

