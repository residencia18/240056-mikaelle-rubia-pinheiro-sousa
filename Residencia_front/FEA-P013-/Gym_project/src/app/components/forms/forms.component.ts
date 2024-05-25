import { Location } from './../../types/location.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';


@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private getUnitsService: GetUnitsService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    });
    this.getUnitsService.getAllUnits().subscribe(data =>{
      this.results = data.locations;
      this.filteredResults = data.locations;
    });
  }

  onClean() {
    this.formGroup.reset();
    console.log("clear");
  }

  onSubmit() {
    console.log("clear", this.filteredResults);
    if(!this.formGroup.value.showClosed){
      this.filteredResults = this.results.filter(location=> location.opened === true)
    }else{
      this.filteredResults = this.results;
    }
  }
}
