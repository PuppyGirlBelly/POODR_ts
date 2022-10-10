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

type Bike = BikeArgs | RoadBikeArgs | MountainBikeArgs;

export abstract class Bicycle {
  size: string;
  chain: string;
  tireSize: string;

  public constructor(args: Bike) {
    this.size = args.size;
    this.chain = args.chain || this.defaultChain;
    this.tireSize = args.tireSize || this.defaultTireSize();

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

  public abstract get localSpares(): any;

  protected get defaultChain(): string {
    return '10-speed';
  }

  public defaultTireSize(): string {
    throw new Error(
      `This ${this.constructor.name} does not implement the getter 'defaultTireSize()'`
    );
  }
}

export class RoadBike extends Bicycle {
  tapeColor: string;

  public postIntialization(args: RoadBikeArgs) {
    this.tapeColor = args.tapeColor;
  }

  public get localSpares() {
    return { tapeColor: this.tapeColor };
  }

  public defaultTireSize() {
    return '23';
  }
}

export class MountainBike extends Bicycle {
  frontShock: string;
  rearShock: string;

  public postIntialization(args: MountainBikeArgs) {
    this.frontShock = args.frontShock;
    this.rearShock = args.rearShock;
  }

  public get localSpares() {
    return {
      fronShock: this.frontShock,
      rearShock: this.rearShock,
    };
  }

  defaultTireSize() {
    return '2.1';
  }
}

export function ch9(): void {

}
