package com.javaAvancado.grud.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.javaAvancado.grud.entities.User;

@Service
public class TokenServices {
	
	@Value("${api.security.token.secret}")
	private String secret;
	
	private final Map<String, String> tokenEmailMap = new ConcurrentHashMap<>();
	 
	public String generateToken(User user) {
		try {
			Algorithm  algorothm = Algorithm.HMAC256(secret);
			String token = JWT.create()
					.withIssuer("javaAvancado-api")
					.withSubject(user.getLogin())
					.withExpiresAt(genExpirationDate())
					.sign(algorothm);
			
//			tokenEmailMap.put(token, user.getLogin());
			
			return token;
	    } catch (JWTCreationException exception) {
	        throw new RuntimeException("Error while generating token", exception);
	        }
		}
	
//    public String getEmailFromToken(String token) {
//    	
//        return tokenEmailMap.getOrDefault(token, "");
//    }
//
//    public void invalidateToken(String token) {
//     
//        tokenEmailMap.remove(token);
//    }
		
	public String ValidateToken(String token) {
		try {
			Algorithm  algorothm = Algorithm.HMAC256(secret);
			return JWT.require(algorothm)
					.withIssuer("javaAvancado-api")
					.build()
					.verify(token)
					.getSubject();	
			
			
        } catch (JWTVerificationException exception){
            return "";
        }
	}
	 private Instant genExpirationDate(){
	        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
	  }

}
