import { RoadBike, MountainBike, Bicycle } from './ch9';

function bikeInterfaceTest(bike: any) {
  describe('Bicycle Interface Test', () => {
    test('Responds to defaultTireSize', () => {
      expect(bike).toHaveProperty('defaultTireSize');
    });

    test('Responds to defaultChainSize', () => {
      expect(bike).toHaveProperty('defaultChain');
    });

    test('Responds to chain', () => {
      expect(bike).toHaveProperty('chain');
    });

    test('Responds to size', () => {
      expect(bike).toHaveProperty('size');
    });

    test('Responds to tireSize', () => {
      expect(bike).toHaveProperty('tireSize');
    });

    test('Responds to spares', () => {
      expect(bike).toHaveProperty('spares');
    });
  });
}

function bikeSubclassTest(bike: any) {
  describe('Bicycle Subclass Test', () => {
    test('Responds to postInitialization', () => {
      expect(bike).toHaveProperty('postIntialization');
    })

    test('Responds to localSpares', () => {
      expect(bike).toHaveProperty('localSpares');
    })

    test('Responds to defaultTireSize', () => {
      expect(bike).toHaveProperty('defaultTireSize');
    })
  });
}

describe('Bicycle Class Tests', () => {
  class StubBike extends Bicycle {
    get localSpares(): void { return null }
    postIntialization(): void {}
  };

  test('Forces subclasses to implement defaultTireSize', () => {
    expect(() => {
      const bike = new StubBike({size: ''});
      bike.defaultTireSize()
    }).toThrow(Error);
  });

  class StubBike2 extends StubBike {
    defaultTireSize(): string { return '' }

    get localSpares(): any {
      return { saddle: 'painful' };
    }
  }

  const stubbedBike = new StubBike2({size: ''});

  test('Local Spares in Spares', () => {
    expect(stubbedBike.spares()).toEqual({
      tireSize: '',
      chain: '10-speed',
      saddle: 'painful'
    })
  });

  bikeInterfaceTest(stubbedBike);
});

describe('Road Bike Tests', () => {
  let bike = new RoadBike({
    size: 'L',
    tapeColor: 'yellow',
  });

  test('Puts Tape Color in local spares', () => {
    expect(bike.localSpares).toMatchObject({
      tapeColor: expect.any(String),
    })
  })

  bikeInterfaceTest(bike);
  bikeSubclassTest(bike);
})

describe('Mountain Bike Tests', () => {
  let bike = new MountainBike({
    size: 'L',
    frontShock: '',
    rearShock: '',
  });

  bikeInterfaceTest(bike);
  bikeSubclassTest(bike);
})
