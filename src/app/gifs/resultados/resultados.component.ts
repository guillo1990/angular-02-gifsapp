import { Component, OnInit } from '@angular/core';
import { GifsService } from '../serrvices/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  constructor(private GifsService: GifsService) { }

  get results() {
    return this.GifsService.result;
  }

}
