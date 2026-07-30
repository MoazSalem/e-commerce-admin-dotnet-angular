import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidebar-component',
  imports: [NgClass],
  templateUrl: './sidebar-component.html',
})
export class SidebarComponent {
  activeView = input<'dashboard' | 'addProduct'>('dashboard');
  viewChange = output<'dashboard' | 'addProduct'>();

  navigateTo(view: 'dashboard' | 'addProduct') {
    this.viewChange.emit(view);
  }
}
