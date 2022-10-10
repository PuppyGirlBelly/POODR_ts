export class Mechanic {
  prepareBicycle(bicycle: any): void {}

  prepareTrip(trip: Trip): void {
    trip.bicycles.forEach( (bicycle: any) => {
      this.prepareBicycle(bicycle);
    });
  }
}

export class TripCoordinator {
  buyFood(customers: any): void {}

  prepareTrip(trip: Trip): void {
    this.buyFood(trip.customers);
  }
}

export class Driver {
  gasUp(vehicle: any): void {}
  fillWaterTank(vehicle: any): void {}

  prepareTrip(trip: Trip): void {
    const vehicle = trip.vehicle;
    this.gasUp(vehicle);
    this.fillWaterTank(vehicle);
  }
}

export class Trip {
  bicycles: any[];
  customers: any[];
  vehicle: any[];

  prepare(preparers: any[]) {
    preparers.forEach( (preparer) => {
      preparer.prepareTrip(this)
    })
  }
}

export function ch9(): void {

}
