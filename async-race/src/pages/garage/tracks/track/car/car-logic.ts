import {
  CarData,
  CarsData,
  EngineData,
  WinnerData,
} from '../../../../../utils/types/types';

let controller = new AbortController();

export default class CarLogic {
  static async getAllCars(): Promise<CarsData> {
    const response = await fetch(`http://127.0.0.1:3000/garage`);
    const data = await response.json();
    return data;
  }

  static async getCar(id: number): Promise<CarData | null> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
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
    await fetch(`http://127.0.0.1:3000/garage/${id}`, { method: 'DELETE' });
  }

  static async updateCar(id: number, name: string, color: string) {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
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
    controller.abort();
    await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
  }

  static async drive(id: number): Promise<boolean | null> {
    controller = new AbortController();
    const { signal } = controller;
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=drive`,
        { method: 'PATCH', signal }
      );
      if (response.ok) {
        return true;
      }
      return false;
    } catch (err) {
      return null;
    }
  }

  static async getWinner(id: number): Promise<WinnerData | null> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`);
      if (response.status === 404) return null;
      const data = await response.json();
      return data;
    } catch (err) {
      return null;
    }
  }

  static async createWinner(id: number, wins: number, time: number) {
    await fetch(`http://127.0.0.1:3000/winners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, wins, time }),
    });
  }

  static async updateWinner(id: number, wins: number, time: number) {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wins,
        time,
      }),
    });
  }

  static async deleteWinner(id: number) {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, { method: 'DELETE' });
  }
}
