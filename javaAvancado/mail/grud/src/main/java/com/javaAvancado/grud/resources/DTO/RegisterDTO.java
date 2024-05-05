package com.javaAvancado.grud.resources.DTO;

import com.javaAvancado.grud.enums.UserRole;

public record RegisterDTO(String login, String password, UserRole role) {
}
