import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUnitsService } from '../../services/create-units.service';
import { schedule } from '../../../environments/environments';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {Location, Schedule} from '../../../app/types/location.interface';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-unit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, FooterComponent],
  providers: [MessageService],
  templateUrl: './create-unit.component.html',
  styleUrl: './create-unit.component.css'
})
export class CreateUnitComponent {
public scheduleList:Schedule [] =[]
public updateType = false;
public unitUpadate: Location | null = null;
public id: string = '';

  newUnitForm!: FormGroup;
  public hours: string[] = schedule.hour;
  public weekdays: string[] =schedule.weekdays;
  constructor(private formBuilder: FormBuilder,
     private createUnitsService: CreateUnitsService, private route: ActivatedRoute, private router: Router,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = id !== null ? id : '';
    });

    this.newUnitForm = this.formBuilder.group({
      title: ['', { validators: [Validators.required], updateOn: 'blur' }],
      content: ['', { validators: [Validators.required], updateOn: 'blur' }],
      mask: ['recommended', { validators: [Validators.required], updateOn: 'blur' }],
      towel: ['recommended', { validators: [Validators.required], updateOn: 'blur' }],
      fountain: ['partial', { validators: [Validators.required], updateOn: 'blur' }],
      lockerRoom: ['partial', { validators: [Validators.required], updateOn: 'blur' }],
      opened: ['Fechado', { validators: [Validators.required], updateOn: 'blur' }],
      hour:['06h às 12h', { validators: [Validators.required], updateOn: 'blur' }],
      weekdaysSelect:['Seg. à Sex.', { validators: [Validators.required], updateOn: 'blur' }]
    });


    this.updateType = this.id != '' ? true: false;

    if (this.updateType){

      this.filterId(this.id)

      this.newUnitForm = this.formBuilder.group({
        title: [this.unitUpadate?.title, { validators: [Validators.required], updateOn: 'blur' }],
        content: [this.unitUpadate?.content, { validators: [Validators.required], updateOn: 'blur' }],
        mask: [this.unitUpadate?.mask, { validators: [Validators.required], updateOn: 'blur' }],
        towel: [this.unitUpadate?.towel, { validators: [Validators.required], updateOn: 'blur' }],
        fountain: [this.unitUpadate?.fountain, { validators: [Validators.required], updateOn: 'blur' }],
        lockerRoom: [this.unitUpadate?.locker_room, { validators: [Validators.required], updateOn: 'blur' }],
        opened: [this.unitUpadate?.opened, { validators: [Validators.required], updateOn: 'blur' }],
        hour:['06h às 12h', { validators: [Validators.required], updateOn: 'blur' }],
        weekdaysSelect:['Seg. à Sex.', { validators: [Validators.required], updateOn: 'blur' }]
      });
    }

  }

  filterId(id: string): void {
    this.createUnitsService.getFilteredUnitById(id)
      .subscribe({
        next: (response) => {
          if (response) {
            this.unitUpadate = response;
            console.log("this.unitUpadate:", this.unitUpadate);
          } else {
            console.error('Unit not found for ID:', id);
          }
        },
        error: (err) => {
          console.error('Error fetching filtered units:', err);
        }
      });
  }

  onSubmit(): void {
    if (this.newUnitForm.valid) {
      const UnitData = {
        title: this.newUnitForm.value?.title,
        content: this.newUnitForm.value?.content,
        opened: this.newUnitForm.value?.opened == "true" ? true : false,
        mask: this.newUnitForm.value?.mask,
        towel: this.newUnitForm.value?.towel,
        fountain: this.newUnitForm.value?.fountain,
        locker_room: this.newUnitForm.value?.lockerRoom,
        schedules:this.scheduleList
      };
      console.log('UnitData:', UnitData);
      this.addUnits(UnitData);
      this.updateType = false;
    } else {
      console.error('Formulário inválido');
      alert('everything is broken!');
    }
}
  onSubmitUpadate(): void {
    if (this.newUnitForm.valid) {
      const UnitData = {
        title: this.newUnitForm.value?.title,
        content: this.newUnitForm.value?.content,
        opened:this.newUnitForm.value?.opened == "true" || this.newUnitForm.value?.opened == true ? true : false,
        mask: this.newUnitForm.value?.mask,
        towel: this.newUnitForm.value?.towel,
        fountain: this.newUnitForm.value?.fountain,
        locker_room: this.newUnitForm.value?.lockerRoom,
        schedules:this.scheduleList
      };
      console.log('UnitData:', UnitData);
      this.updateUnits(UnitData, this.id);
    } else {
      console.error('Formulário inválido');
      alert('everything is broken!');
    }
  }

  addUnits(data: any){
    this.createUnitsService.addUnit(data)
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
          console.log('Adicionado com sucesso:', response);
          alert('Added successfully!');

        }
      },
      error: (err) => {
        console.error('Error ao adicionar unidade:', err);
      }
    });
    this.onClear();
  }

  updateUnits(data: any, id: string){
    this.createUnitsService.UpdateUnit(data, id)
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
          console.log('Atualizado com sucesso:', response);
          alert('Update successfully!');
          this.router.navigate(['/getUnits']);
        }
      },
      error: (err) => {
        console.error('Error ao adicionar unidade:', err);
      }
    });
    this.onClear();
  }

  addSchedules() {
    const selectedWeekday = this.newUnitForm.get('weekdaysSelect')?.value;
    const selectedHour = this.newUnitForm.get('hour')?.value;
    const exists = this.scheduleList.some(schedule => schedule.weekdays === selectedWeekday);

    if (!exists) {
      const newSchedule: Schedule = { weekdays: selectedWeekday, hour: selectedHour };
      this.scheduleList.push(newSchedule);
      console.log('Schedule added:', this.scheduleList);
    }
  }

  onClear() {
    this.newUnitForm.reset({
      title:'',
      content: '',
      mask: 'recommended',
      towel: 'recommended',
      fountain: 'partial',
      lockerRoom: 'partial',
      opened:'Fechado',
      hour:'06h às 12h',
      weekdaysSelect:'Seg. à Sex.'
    });
  }
}

