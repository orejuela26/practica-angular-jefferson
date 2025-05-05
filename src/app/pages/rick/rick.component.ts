import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { RickService } from './services/rick.service';
import { Ricks } from './interfaces/ricks';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-rick',
  standalone: true,
  imports: [CardComponent, PaginacionComponent, SearchComponent],
  templateUrl: './rick.component.html',
  styleUrls: ['./rick.component.css']
})
export class RickComponent implements OnInit {
  ricks: Ricks | undefined;

  constructor(
    private _srvRick: RickService
  ) {}

  ngOnInit(): void {
    this._srvRick.getRicks().subscribe((ricksAll) => {
      ricksAll.results.forEach((rick) => {
        this._srvRick.getRick(rick.name).subscribe((rickData) => {
          rick.data = rickData;
          this._srvRick.nextURL = ricksAll.info.next;
          this._srvRick.previousURL = ricksAll.info.prev;
        });
      });
      this.ricks = ricksAll;
    });
  }

  setNewRicks(ricksNews: Ricks): void {
    this.ricks = ricksNews;
  }

  searchRick(termino: string): void {
    if (termino.trim()) {
      this._srvRick.getRicks(`https://rickandmortyapi.com/api/character/?name=${termino}`).subscribe((ricksAll) => {
        // Aquí recibes un objeto con info y results
        ricksAll.results.forEach((rick) => {
          this._srvRick.getRick(rick.name).subscribe((rickData) => {
            rick.data = rickData;
          });
        });
  
        this.ricks = ricksAll;
        this._srvRick.nextURL = ricksAll.info.next;
        this._srvRick.previousURL = ricksAll.info.prev;
      }, (error) => {
        console.log('No se encontraron personajes con ese nombre');
        this.ricks = {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null
          },
          results: []
        };
      });
    } else {
      this.ngOnInit();
    }
  }
} 
