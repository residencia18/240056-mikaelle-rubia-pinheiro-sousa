import { Location } from './../../types/location.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { FilterUnitsService } from '../../services/filter-units.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter();

  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private getUnitsService: GetUnitsService, private filterUnitsService: FilterUnitsService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    });
    this.getUnitsService.getAllUnits().subscribe(data =>{
      this.results = data;
      this.filteredResults = data;
    });
  }

  onClean() {
    this.formGroup.reset();
    console.log("clear");
  }

  onSubmit() {
    let { showClosed, hour } = this.formGroup.value
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.getUnitsService.setFilterUnits(this.filteredResults);
    this.submitEvent.emit();
  }
}
