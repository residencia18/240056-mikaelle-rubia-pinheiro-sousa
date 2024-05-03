package com.javaAvancado.grud.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @NotNull(message = "EventName must not be null") 
    @Size(min = 5, max = 50, message = "EventName must be between 5 and 50 characters long")
    @Column(unique = true, nullable = false)
    private String eventName;
    private String eventDescription;
    private Date timestamp;
    private String userId;
    private String affectedResource;
    private String origin;
}
