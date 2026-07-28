import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Order } from '../../shared/models/cartItem';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Orders {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public readonly pastOrdersResource = rxResource({
    stream: () => this.http.get<Order[]>(this.apiUrl + 'Orders/' + 'my-orders')
  });
}
