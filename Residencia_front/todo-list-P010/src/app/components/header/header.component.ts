import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import {  MatDividerModule } from '@angular/material/divider';
import {  MatIconModule } from '@angular/material/icon';
import {  MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatDialogModule],
  templateUrl: './header.component.html',

})
export class HeaderComponent {
  handleOpenModal() {
    alert("nova tarefa")
  }

}
