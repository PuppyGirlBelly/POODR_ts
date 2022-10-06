/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */

/* This code is partially taken/inspired by the code in the following
 * repository: https://github.com/GeekChao/ppod/blob/master/src/6_27.ts
 */

interface BikeArgs {
  size?: string;
  chain?: string;
  tireSize?: string;
}

interface RoadBikeArgs extends BikeArgs {
  tapeColor: string;
}

interface MountainBikeArgs extends BikeArgs {
  frontShock: string;
  rearShock: string;
}

interface RecumbentBikeArgs extends BikeArgs {
  flag: string;
}

type Bike = RoadBikeArgs | MountainBikeArgs | RecumbentBikeArgs;

abstract class Bicycle {
  size: string;
  chain: string;
  tireSize: string;

  public constructor(args: Bike) {
    this.size = args.size;
    this.chain = args.chain || this.defaultChain;
    this.tireSize = args.tireSize || this.defaultTireSize;

    this.postIntialization(args);
  }

  // eslint-disable-next-line no-unused-vars
  abstract postIntialization(args: Bike): void;

  public spares() {
    return {
      tireSize: this.tireSize,
      chain: this.chain,
      ...this.localSpares,
    };
  }

  protected abstract get localSpares(): any;

  protected get defaultChain(): string {
    return '10-speed';
  }

  protected get defaultTireSize(): string {
    throw new Error(
      `This ${this.constructor.name} does not implement the getter 'defaultTireSize()'`
    );
  }
}

class RoadBike extends Bicycle {
  tapeColor: string;

  public postIntialization(args: RoadBikeArgs) {
    this.tapeColor = args.tapeColor;
  }

  protected get localSpares() {
    return { tapeColor: this.tapeColor };
  }

  protected get defaultTireSize() {
    return '23';
  }
}

class MountainBike extends Bicycle {
  frontShock: string;
  rearShock: string;

  public postIntialization(args: MountainBikeArgs) {
    this.frontShock = args.frontShock;
    this.rearShock = args.rearShock;
  }

  protected get localSpares() {
    return {
      fronShock: this.frontShock,
      rearShock: this.rearShock,
    };
  }

  protected get defaultTireSize() {
    return '2.1';
  }
}

class RecumbentBike extends Bicycle {
  flag: string;

  public postIntialization(args: RecumbentBikeArgs) {
    this.flag = args.flag;
  }

  protected get localSpares() {
    return { flag: this.flag };
  }

  protected get defaultChain() {
    return '9-speed';
  }

  protected get defaultTireSize() {
    return '28';
  }
}

export default function ch8(): void {}
