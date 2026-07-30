import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card-component',
  imports: [NgClass],
  templateUrl: './stat-card-component.html',
})
export class StatCardComponent {
  title = input.required<string>();
  value = input.required<string>();
  trendLabel = input.required<string>();
  
  // Styling inputs
  iconBgClass = input<string>('bg-gray-100');
  trendBgClass = input<string>('bg-green-50');
  trendTextClass = input<string>('text-green-600');
  trendIcon = input<'up' | 'down' | 'check' | 'none'>('none');
}
