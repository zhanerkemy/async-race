import type { Car } from '../../../types/car';
import { CarCard } from './CarCard';

interface CarListProps {
  cars: Car[];
}

export function CarList({ cars }: CarListProps) {
  return (
    <section aria-label="Garage cars">
      {cars.map((car) => (
        <CarCard car={car} key={car.id} />
      ))}
    </section>
  );
}