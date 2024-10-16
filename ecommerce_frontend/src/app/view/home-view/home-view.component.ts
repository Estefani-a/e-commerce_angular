import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent {
  constructor(public router: Router) {}
}
