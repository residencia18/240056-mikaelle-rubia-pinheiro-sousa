package com.provaJava.ProvaJava.resources.form;

import java.util.List;

import com.provaJava.ProvaJava.domain.Schedule;

public record GymForm(String title, String content, boolean opened , String mask, String towel,
		String fountain, String lockerRoom) {

}
