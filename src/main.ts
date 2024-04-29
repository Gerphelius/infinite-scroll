import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { InfiniteScrollListComponent } from './infinite-scroll-list/infinite-scroll-list.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, InfiniteScrollListComponent],
  template: `
    <app-infinite-scroll-list></app-infinite-scroll-list>
  `,
})
export class App {}

bootstrapApplication(App);
