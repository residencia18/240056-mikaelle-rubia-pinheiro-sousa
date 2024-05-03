package com.javaAvancado.grud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaAvancado.grud.entities.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
