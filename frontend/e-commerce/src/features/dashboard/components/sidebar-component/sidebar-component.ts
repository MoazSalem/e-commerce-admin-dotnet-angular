import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidebar-component',
  imports: [NgClass],
  templateUrl: './sidebar-component.html',
})
export class SidebarComponent {
  activeView = input<'dashboard' | 'addProduct' | 'inventory' | 'orders'>('dashboard');
  viewChange = output<'dashboard' | 'addProduct' | 'inventory' | 'orders'>();

  navigateTo(view: 'dashboard' | 'addProduct' | 'inventory' | 'orders') {
    this.viewChange.emit(view);
  }
}
