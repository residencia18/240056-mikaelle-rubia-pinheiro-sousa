package com.provaJava.ProvaJava.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.provaJava.ProvaJava.domain.User;


@Component
public class TokenService {
	
	@Value("${api.security.token.secret}")
	private String secret;
	
	
	public String generateToken(User user) {
		try {
			Algorithm  algorothm = Algorithm.HMAC256(secret);
			String token = JWT.create()
					.withIssuer("ProvaJava-api")
					.withSubject(user.getEmail())
					.withExpiresAt(this.genExpirationDate())
					.sign(algorothm);
			

			
			return token;
	    } catch (JWTCreationException exception) {
	        throw new RuntimeException("Error while generating token", exception);
	        }
		}
	
	public String generateTokenReset(String Password) {
		try {
			Algorithm  algorothm = Algorithm.HMAC256(secret);
			String token = JWT.create()
					.withIssuer("ProvaJava-api")
					.withSubject(Password)
					.withExpiresAt(this.genExpirationDate())
					.sign(algorothm);
			

			
			return token;
	    } catch (JWTCreationException exception) {
	        throw new RuntimeException("Error while generating token", exception);
	        }
		}
	
	public String ValidateToken(String token) {
		try {
			Algorithm  algorothm = Algorithm.HMAC256(secret);
			return JWT.require(algorothm)
					.withIssuer("ProvaJava-api")
					.build()
					.verify(token)
					.getSubject();	
			
			
        } catch (JWTVerificationException exception){
            return null;
        }
	}
	
	 private Instant genExpirationDate(){
	        return LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-03:00"));
	  }

}
