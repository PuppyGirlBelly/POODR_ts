/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */

interface Part {
  name: string;
  description: string;
  needsSpare?: boolean;
}

class Parts extends Array<Part> {
  spares() {
    return this.filter((part) => part.needsSpare);
  }
}

class PartsFactory {
  static build(config: Array<Array<string | boolean>>): Parts {
    const partArray = config.map((p) => this.createPart(p));
    const parts = new Parts();

    partArray.forEach((part) => parts.push(part));

    return parts;
  }

  static createPart(partConfig: Array<string | boolean>): Part {
    return {
      name: partConfig[0] as string,
      description: partConfig[1] as string,
      needsSpare: (partConfig[2] as boolean) ?? true,
    };
  }
}

interface BikeArgs {
  size?: string;
  parts?: Parts;
}

class Bicycle {
  size: string;
  parts: Parts;

  public constructor(args: BikeArgs) {
    this.size = args.size;
    this.parts = args.parts;
  }

  public spares() {
    return this.parts.spares();
  }
}

export default function ch8(): void {
  const roadConfig = [
    ['chain', '10-speed'],
    ['tire_size', '23'],
    ['tape_color', 'red'],
  ];
  const mountainConfig = [
    ['chain', '10-speed'],
    ['tire_size', '2.1'],
    ['front_shock', 'Manitou', false],
    ['rear_shock', 'Fox'],
  ];
  const recumbentConfig = [
    ['chain', '9-speed'],
    ['tire_size', '28'],
    ['flag', 'tall and orange']
  ];

  const roadBike = new Bicycle({
    size: 'L',
    parts: PartsFactory.build(roadConfig),
  });
  const mountainBike = new Bicycle({
    size: 'L',
    parts: PartsFactory.build(mountainConfig),
  });
  const recumbentBike = new Bicycle({
    size: 'L',
    parts: PartsFactory.build(recumbentConfig),
  });

  console.log(roadBike.spares());
  console.log(mountainBike.spares());
  console.log(recumbentBike.spares());
}
