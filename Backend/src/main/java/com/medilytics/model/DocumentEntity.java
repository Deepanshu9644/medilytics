
package com.medilytics.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String type;
    private double size;
    private String uploadDate;
    private String category;
    private String filePath; // stored on disk

    private String userId; // NEW: to store the owner
}
