package com.javaAvancado.grud.resources.DTO;

import com.javaAvancado.grud.entities.UserRole;

public record RegisterDTO(String login, String password, UserRole role) {
}
