'use strict';

export default class Order {
  id: number;
  name: string;
  // createdAt: Date;
  // updatedAt: Date;

  constructor(data: any) {
    if (data) {
      this.id = data.id || undefined;
      this.name = data.name || '';
      // this.createdAt = data.createdAt || new Date();
      // this.updatedAt = data.updatedAt || new Date();
    }
  }
}