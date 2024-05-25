package com.provaJava.ProvaJava.resources.dto;

import com.provaJava.ProvaJava.domain.Schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ScheduleDto {
    private long id;
    private String weekdays;
    private String hour;
    
    
	public ScheduleDto(Schedule entity) {
		super();
		this.id = entity.getId();
		this.weekdays = entity.getWeekdays();
		this.hour = entity.getHour();
	}
    
    
}
