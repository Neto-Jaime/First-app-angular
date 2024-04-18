import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form (submit.prevent)="filterResults(filtro.value, $event)">
        <input
          type="text"
          placeholder="Filtro por cidade"
          #filtro
          (keydown.enter)="filterResults(filtro.value, $event)"
        />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filtro.value, $event)"
        >
          Pesquisar
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      >
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  filteredLocationList: HousingLocation[] = [];

  filterResults(text: string, event: any) {
    event.preventDefault(); // Evita a submissão do formulário
    console.log('Valor do filtro:', text);
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocationList) =>
        housingLocationList?.city
          .toLocaleLowerCase()
          .includes(text.toLowerCase())
    );
  }

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;

        this.filteredLocationList = housingLocationList;
      });
  }
}
