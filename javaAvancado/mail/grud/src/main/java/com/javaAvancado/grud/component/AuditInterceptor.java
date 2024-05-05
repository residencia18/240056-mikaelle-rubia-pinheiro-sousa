package com.javaAvancado.grud.component;

import java.util.concurrent.atomic.AtomicInteger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.javaAvancado.grud.entities.User;

import com.javaAvancado.grud.services.AuditService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuditInterceptor implements HandlerInterceptor {
	private static final Logger LOGGER = LoggerFactory.getLogger(AuditInterceptor.class);
	
    @Autowired
    private AuditService auditService;

    private AtomicInteger count = new AtomicInteger(0);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Captura o endereço IP de origem
        String origin = request.getHeader("X-FORWARDED-FOR");
        if (origin == null) {
            origin = request.getRemoteAddr();
        }

        // Recupera informações do usuário autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = "unauthenticated user";
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User user = (User) authentication.getPrincipal();
            userId = user.getUsername();
        
        }
        

        int currentCount = count.incrementAndGet();
        
        String eventName = "Request " + currentCount + " to " + request.getRequestURI();
        String description = "Method: " + request.getMethod();

        // Loga o evento
        auditService.logEvent(eventName, description, userId, request.getRequestURI(), origin);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {}

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {}
}