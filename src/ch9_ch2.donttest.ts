import { Wheel, Gear, GearArgs } from './ch9';

describe('Wheel Test', () => {

  test('Calculates Diameter', () => {
    const wheel = new Wheel(26, 1.5);

    expect(wheel.width()).toBeCloseTo(29, 0.1);
  });
});

describe('Diameterizable Interface Test', () => {
  class DiameterDouble { width() { return 10; } }

  test.each([
    new Wheel(0, 0),
    new DiameterDouble,
  ])('%o implements Diameterizable Interface', (classType) => {
    expect(classType).toHaveProperty('width')
  })
});

describe('Gear Test', () => {
  class Observer { changed(chainRing: number, cog: number): void {}; }
  class DiameterDouble { width() { return 10; } }

  const mockObserver = jest.spyOn(Observer.prototype, 'changed').mockImplementation(() => {return null});
  const gearOps: GearArgs = {
    chainRing: 52,
    cog: 11,
    wheel: new DiameterDouble(),
    observer: new Observer,
  };

  beforeEach(() => {
    mockObserver.mockClear();
  })

  test('Calculates Gear Inches', () => {
    const gear = new Gear(gearOps);

    expect(gear.gearInches()).toBeCloseTo(47.27, 0.1);
  });

  test('Notifies Observers when Cogs Change', () => {
    const gear = new Gear(gearOps);
    gear.setCog(27);

    expect(mockObserver).toHaveBeenCalledWith(52, 27);
  });

  test('Notifies Observers when chainRing Change', () => {
    const gear = new Gear(gearOps);
    gear.setChainRing(42);

    expect(mockObserver).toHaveBeenCalledWith(42, 11);
  });
})
