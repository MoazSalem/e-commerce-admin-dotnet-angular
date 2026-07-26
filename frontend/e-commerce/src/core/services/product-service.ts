import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/models/product';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public readonly productsResource = rxResource({
    stream: () => this.http.get<Product[]>(this.apiUrl + 'Products')
  });

public reloadProducts(): void {
    this.productsResource.reload();
  }
  
}
