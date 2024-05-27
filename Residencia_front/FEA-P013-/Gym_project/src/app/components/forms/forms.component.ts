import { Location } from './../../types/location.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterUnitsService } from '../../services/filter-units.service';
import { CreateUnitsService } from '../../services/create-units.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit{
  @Output() submitEvent = new EventEmitter();

  results: Location[] = [];
  results_get: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private filterUnitsService: FilterUnitsService
    ,private createUnitsService: CreateUnitsService) {}


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    });
    this.getAPIUnitsDtas();
    }
    getAPIUnitsDtas() {
      this.createUnitsService.fetchAllUnits()
      .pipe()
        .subscribe({
          next: (response) => {
            this.results = response;
            this.filteredResults = response;
            console.log("agora", response);
          },
          error: (err) => {
            console.error('Error fetching filtered units:', err);
          }
        });
    }

  onClean() {
    this.formGroup.reset();
    console.log("clear");
  }

  onSubmit() {
    let { showClosed, hour } = this.formGroup.value
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.createUnitsService.setFilterUnits(this.filteredResults);
    this.submitEvent.emit();
  }
}
