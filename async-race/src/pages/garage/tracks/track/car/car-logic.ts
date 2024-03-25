import { CarData, CarsData, EngineData } from '../../../../../utils/types/types';

export default class CarLogic {
  static async getAllCars(): Promise<CarsData | null> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage`);
      const data = await response.json();
      return data;
    } catch (err) {
      return null;
    }
  }

  static async getCar(id: number): Promise<CarData | null> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage?id=${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      return null;
    }
  }

  static async createCar(name: string, color: string) {
    await fetch(`http://127.0.0.1:3000/garage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
  }

  static async deleteCar(id: number) {
    await fetch(`http://127.0.0.1:3000/garage?id=${id}`, { method: 'DELETE' });
  }

  static async updateCar(id: number, name: string, color: string) {
    await fetch(`http://127.0.0.1:3000/garage?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        color,
      }),
    });
  }

  static async startEngine(id: number): Promise<EngineData | null> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=started`,
        { method: 'PATCH' }
      );
      const data: EngineData = await response.json();
      return data;
    } catch (err) {
      return null;
    }
  }

  static async stopEngine(id: number) {
    await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
  }

  static async drive(id: number): Promise<boolean | null> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=drive`,
        { method: 'PATCH' }
      );
      if (response.ok) {
        return true;
      }
      return false;
    } catch (err) {
      return null;
    }
  }
}
