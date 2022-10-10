import { Mechanic, TripCoordinator, Driver, Trip } from './ch9';

describe('Prepare Trip Test', () => {
  test.each([
    new Mechanic,
    new TripCoordinator,
    new Driver,
  ])('%o implements prepareTrip', (classType) => {
    expect(classType).toHaveProperty('prepareTrip')
  })

  class Preparer {
    prepareTrip(obj: any): void {}
  }

  test('Requests Trip Preparation', () => {
    const preparer = jest.spyOn(Preparer.prototype, 'prepareTrip');
    const trip = new Trip();

    trip.prepare([new Preparer]);
    expect(preparer).toHaveBeenCalled();
  });
});
