export interface Car {
  id: number;
  name: string;
  color: string;
}

export type CarData = Omit<Car, 'id'>;

export interface CarsResponse {
  cars: Car[];
  totalCount: number;
}