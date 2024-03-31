const brands: string[] = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Volkswagen',
  'Nissan',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Hyundai',
  'Kia',
  'Lexus',
  'Subaru',
  'Mazda',
  'Jeep',
  'Volvo',
  'Tesla',
  'Ferrari',
  'Porsche',
  'Land Rover',
];

const models: string[] = [
  'Camry',
  'Accord',
  'F-150',
  'Silverado',
  'Golf',
  'Altima',
  '3 Series',
  'E-Class',
  'A4',
  'Elantra',
  'Optima',
  'IS',
  'Outback',
  'CX-5',
  'Wrangler',
  'XC90',
  'Model S',
  '488 GTB',
  '911',
  'Range Rover',
];

function getRandomColor(): string {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const normalize = (val: number) =>
    val.toString(16).length === 1 ? `0${val.toString(16)}` : val.toString(16);

  return `#${normalize(red)}${normalize(green)}${normalize(blue)}`;
}

export function getColorArray(): string[] {
  const colors = [];
  for (let i = 0; i < 100; i += 1) {
    const color = getRandomColor();
    colors.push(color);
  }
  return colors;
}

export function getNamesArray(): string[] {
  const names = [];
  for (let i = 0; i < 100; i += 1) {
    const randomBrandIndex = Math.floor(brands.length * Math.random());
    const randomModelIndex = Math.floor(models.length * Math.random());
    const name = `${brands[randomBrandIndex]} ${models[randomModelIndex]}`;
    names.push(name);
  }
  return names;
}
