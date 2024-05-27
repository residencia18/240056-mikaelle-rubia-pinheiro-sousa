import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../types/location.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CreateUnitsService } from '../../services/create-units.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() card!:Location;
  public deleted: boolean = false;

  constructor(private createUnitsService: CreateUnitsService, private router: Router){}
  ngOnInit(): void {

  }

  onSubmitDelete() {
    const id_delete = this.card.id;
    this.deleteSessao(id_delete);
  }

  deleteSessao(id: string) {
    this.deleted = true;
    if(id){
      this.createUnitsService.deleteUnit(id)
      .pipe()
      .subscribe({
        next:(response)=>{
          this.router.navigate(['/getUnits',this.deleted]);
          this.createUnitsService.getAllUnits();
        }, error:(err)=>{
          console.log(err);
        }
      })
    }
  }

}
