package com.provaJava.ProvaJava.resources.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.provaJava.ProvaJava.domain.Gym;
import com.provaJava.ProvaJava.domain.Schedule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GymDto {
	
    private long id;
    private String title;
    private String content;
    private boolean opened = true;
    private String mask;
    private String towel;
    private String fountain;
    private String lockerRoom;
    private List<ScheduleDto> schedules = new ArrayList<>();
    
    public GymDto(Gym entity) {
		super();
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.content = entity.getContent();
		this.mask = entity.getMask();
		this.towel = entity.getTowel();
		this.fountain = entity.getFountain();
		this.lockerRoom = entity.getLockerRoom();
    }
    
    public GymDto(Gym entity, Set<Schedule> scheduleList) {
        this(entity);
        scheduleList.forEach(schedule -> this.schedules.add(new ScheduleDto(schedule)));
    }
    
    
    
}
