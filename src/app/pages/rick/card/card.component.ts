import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Ricks, Rick } from '../interfaces/ricks';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'rick-card',
  standalone: true,
  imports: [NgIf, NgFor, ModalComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnChanges {
  @Input() public ricksAll: Ricks | undefined;
  @ViewChild(ModalComponent) public modal!: ModalComponent;

  CargaImagen: boolean = false;
  selectedRick!: Rick;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ricksAll']) {
      this.CargaImagen = false;
    }
  }

  openModal(rick: Rick): void {
    if (this.modal) {
      this.modal.open(rick);
    }
  }
}
