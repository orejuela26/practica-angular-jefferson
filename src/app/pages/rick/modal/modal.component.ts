import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild, AfterViewInit } from "@angular/core";
import { Rick } from "../interfaces/ricks"; // Asegúrate de que esta interfaz se llame así

@Component({
  selector: 'rick-modal',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe],
  templateUrl: './modal.component.html',
  styles: ''
})
export class ModalComponent implements AfterViewInit {
    @Input() public rick: Rick = {
        id: 0,
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
        origin: { name: '', url: '' },
        location: { name: '', url: '' },
        episode: [],
        image: '',
        url: '',
        created: ''
      };
      

  private bootstrapModal: any;

  @ViewChild('modalElement') public modalElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeModal();
    }
  }

  initializeModal(): void {
    import('bootstrap').then(bootstrap => {
      this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
    });
  }

  open(rick: Rick): void {
    this.rick = rick;
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.initializeModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  close(): void {
    if (this.bootstrapModal) {
      this.bootstrapModal.hide();
    }
  }
}
