export class Product {
  constructor(data = {}) {
    this.nombre = data.nombre || '';
    this.precio = data.precio || 0;
    this.categoria = data.categoria || 'general';
    this.stock = data.stock || 0;
  }
}