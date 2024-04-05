import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
    <form>
      <input type="text" placeholder="Filtro por cidade">
      <button class="primary" type="button">Pesquisar</button>
    </form>
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
