import type { CarData } from '../types/car';

const CAR_BRANDS = [
  'Audi',
  'BMW',
  'Ford',
  'Honda',
  'Hyundai',
  'Kia',
  'Lexus',
  'Mercedes',
  'Nissan',
  'Porsche',
  'Tesla',
  'Toyota',
] as const;

const CAR_MODELS = [
  'Camry',
  'Civic',
  'Corolla',
  'Mustang',
  'Model S',
  'Model X',
  'Panamera',
  'Rio',
  'Sportage',
  'Supra',
  'Tucson',
  'X5',
] as const;

function getRandomItem<T>(items: readonly T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);
  const item = items[randomIndex];

  if (item === undefined) {
    throw new Error('Cannot select an item from an empty array');
  }

  return item;
}

function generateRandomColor(): string {
  const maximumColorValue = 0xffffff;
  const color = Math.floor(Math.random() * (maximumColorValue + 1));

  return `#${color.toString(16).padStart(6, '0')}`;
}

export function generateRandomCar(): CarData {
  const brand = getRandomItem(CAR_BRANDS);
  const model = getRandomItem(CAR_MODELS);

  return {
    name: `${brand} ${model}`,
    color: generateRandomColor(),
  };
}