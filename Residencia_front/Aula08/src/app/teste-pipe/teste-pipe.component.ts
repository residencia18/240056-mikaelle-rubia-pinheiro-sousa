import { Component } from '@angular/core';

@Component({
  selector: 'app-teste-pipe',
  templateUrl: './teste-pipe.component.html',
  styleUrl: './teste-pipe.component.css'
})
export class TestePipeComponent {
  teste = new Promise((resolve, reject) =>{
    setTimeout(()=>{
      resolve("Promise resolvida2");
    }, 3000)
  });
}
