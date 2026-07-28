import { Component, input } from '@angular/core';
import { HeaderComponent } from "../../layout/header-component/header-component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  templateUrl: './order-success.html',
  imports: [HeaderComponent, RouterLink]
})
export class OrderSuccessComponent {
  // Using Angular 21 Signal Inputs with default fallback values
  orderNumber = input<string>('#ORD-7715');
  estimatedDelivery = input<string>(new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
}).format((Date.now() + 2 * (24 * 60 * 60 * 1000))));
}