/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
class Trip {
  bicycles: any[];
  customers: any[];
  vehicle: any;

  constructor() {
    this.bicycles = [];
    this.customers = [];
    this.vehicle = '';
  }

  prepare(preparers: any[]) {
    preparers.forEach((preparer) => {
      preparer.prepare_trip(this);
    });
  }
}

class Mechanic {
  name: string;

  constructor() {
    this.name = 'Sammy';
  }

  prepareTrip(trip: Trip): void {
    trip.bicycles.forEach((bicycle) => {
      this.prepareBicycle(bicycle);
    });
  }

  prepareBicycle(_bicycle: string): void {
    _bicycle = 'fixed up';
  }
}

class TripCoordinator {
  name: string;

  constructor() {
    this.name = 'Saoirse';
  }

  prepareTrip(trip: Trip) {
    this.buyFood(trip.customers);
  }

  buyFood(customers: any) {
    customers.forEach((_customer: any) => {
      _customer = 'has food';
    });
  }
}

class Driver {
  name: string;

  constructor() {
    this.name = 'Claire';
  }

  prepare_trip(trip: Trip) {
    // eslint-disable-next-line prefer-destructuring
    const vehicle = trip.vehicle;
    this.gasUp(vehicle);
    this.fillWaterTank(vehicle);
  }

  gasUp(vehicle: any) {
    vehicle += 'Has gas. ';
  }

  fillWaterTank(vehicle: any) {
    vehicle += 'Has water. ';
  }
}

export default function ch5(): void {
  const trip = new Trip();
  trip.bicycles.forEach((b) => {
    console.log(b);
  });
}
