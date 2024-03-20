import { CarData, EngineData } from '../../../../../utils/types/types';

export default class CarLogic {
  name: string;

  color: string;

  id: number;

  constructor({ name, color, id }: CarData) {
    this.name = name;
    this.color = color;
    this.id = id;
  }

  async getCar(id: number): Promise<CarData | null> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage?id=${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      return null;
    }
  }

  async createCar(name: string, color: string) {
    await fetch(`http://127.0.0.1:3000/garage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
  }

  async deleteCar(id: number) {
    await fetch(`http://127.0.0.1:3000/garage?id=${id}`, { method: 'DELETE' });
  }

  async updateCar(id: number, name: string, color: string) {
    await fetch(`http://127.0.0.1:3000/garage?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        color,
      }),
    });
  }

  async startEngine(id: number): Promise<number | null> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=started`,
        { method: 'PATCH' }
      );
      const data: EngineData = await response.json();
      return data.velocity;
    } catch (err) {
      return null;
    }
  }

  async stopEngine(id: number) {
    await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
  }

  async drive(id: number): Promise<boolean | null> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=drive`,
        { method: 'PATCH' }
      );
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return null;
    }
  }
}
