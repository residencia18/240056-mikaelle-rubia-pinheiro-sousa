package com.provaJava.ProvaJava.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Gym {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotBlank(message = "Content is mandatory")
    private String content;

    @NotNull(message = "Opened status is mandatory")
    private boolean opened;

    @NotBlank(message = "Mask is mandatory")
    private String mask;

    @NotBlank(message = "Towel is mandatory")
    private String towel;

    @NotBlank(message = "Fountain is mandatory")
    private String fountain;

    @NotBlank(message = "Locker room is mandatory")
    private String lockerRoom;

    
    @JsonIgnore
    @OneToMany(mappedBy = "gym", cascade = CascadeType.ALL) 
    private List<Schedule> schedules;

}
