import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';  // Importar NgClass
import { RickService } from '../services/rick.service';
import { Ricks } from '../interfaces/ricks';

@Component({
  selector: 'rick-paginacion',
  standalone: true,
  imports: [NgClass],  // Agregar NgClass aquí
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent {
  @Output() public eventNewRicks = new EventEmitter<Ricks>();

  constructor(
    private _srvRick: RickService
  ) {}

  get nextURL(): string | null {
    return this._srvRick.nextURL;
  }

  get previousURL(): string | null {
    return this._srvRick.previousURL;
  }

  loadRicks(url: string | null): void {
    if (url) {
      this._srvRick.getRicks(url).subscribe((ricksAll) => {
        ricksAll.results.forEach((rick) => {
          this._srvRick.getRick(rick.name).subscribe((rickData) => {
            rick.data = rickData;
            this._srvRick.nextURL = ricksAll.info.next;
            this._srvRick.previousURL = ricksAll.info.prev;
            this.eventNewRicks.emit(ricksAll);
          });
        });
      });
    }
  }
}
