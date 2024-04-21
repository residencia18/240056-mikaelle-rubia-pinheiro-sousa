import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { SessaoDataTransferService } from '../../../../shared/service/sessao/sessao-data-transfer.service';
import { Sessao } from '../../../../models/interfaces/Sessao/sessao';

@Component({
  selector: 'app-detalhes-sessao-home',
  templateUrl: './detalhes-sessao-home.component.html',
  styleUrl: './detalhes-sessao-home.component.css'
})
export class DetalhesSessaoHomeComponent implements OnInit, OnDestroy{
  private readonly destroy$:Subject<void> = new Subject();

  DetalheSessao:Sessao[] =[] ;
  DetalheSessao_: number[] = [];

  constructor(private messageService: MessageService,
    private sessaoService: SessaoService,
    private sessaoDataTransferService: SessaoDataTransferService,
    private router: Router){}

  ngOnInit(): void {
    this.getServiceDetalhesData(this.sessaoDataTransferService.id_sessao)

  }

  getServiceDetalhesData(id_sessao: string) {
    const sessaoLoaded  = this.sessaoDataTransferService.getSessaoDatas()

    if (sessaoLoaded.length > 0) {
      for (const sessao of sessaoLoaded) {
        if (sessao.id === id_sessao) {
          this.DetalheSessao.push(sessao)
          for (const animal of sessao.animais) {
            this.DetalheSessao_.push(Number(animal))

          }
        }
      }
    }else{
      this.getAPISessao()

    }
  }
  getAPISessao() {
    this.sessaoService.getAllSessao()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            for (const sessao of response) {
              if (sessao.id === this.sessaoDataTransferService.id_sessao) {
                this.DetalheSessao.push(sessao)
                for (const animal of sessao.animais) {
                  this.DetalheSessao_.push(Number(animal))

                }
                return;
              }
            }
            console.log("Sessão não encontrada.");
          }
        }, error: (err) => {
          console.log(err);
          this.router.navigate(['/dashboard']);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar as sessões',
            life: 2500
          });
        }
      });
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
