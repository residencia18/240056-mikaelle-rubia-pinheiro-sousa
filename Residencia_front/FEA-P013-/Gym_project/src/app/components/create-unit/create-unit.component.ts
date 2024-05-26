import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateUnitsService } from '../../services/create-units.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-create-unit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-unit.component.html',
  styleUrl: './create-unit.component.css'
})
export class CreateUnitComponent {
  newUnitForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private createUnitsService: CreateUnitsService) {}

  ngOnInit(): void {
    this.newUnitForm = this.formBuilder.group({
      title: [''],
      content: [''],
      mask: ['not required'],
      towel: ['not required'],
      fountain: ['not required'],
      lockerRoom: ['open']
    });
  }

  onSubmit(): void {
    if (this.newUnitForm.valid) {
      const UnitData = {
        title: this.newUnitForm.value?.title,
        content: this.newUnitForm.value?.content,
        opened: true,
        mask: this.newUnitForm.value?.mask,
        towel: this.newUnitForm.value?.towel,
        fountain: this.newUnitForm.value?.fountain,
        locker_room: this.newUnitForm.value?.lockerRoom
      };
      console.log('UnitData:', UnitData);
      this.createUnitsService.addUnit(UnitData)
        .pipe()
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('Adicionado com sucesso:', response);
            }
          },
          error: (err) => {
            console.error('Error ao adicionar unidade:', err);
          }
        });
    } else {
      console.error('Formulário inválido');
    }
  }

  onClear() {
    this.newUnitForm.reset({
      mask: 'not required',
      towel: 'not required',
      fountain: 'not required',
      lockerRoom: 'open'
    });
  }
}
