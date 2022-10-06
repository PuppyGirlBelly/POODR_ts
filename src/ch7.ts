/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */

/* This code is partially taken/inspired by the code in the following
 * repository: https://github.com/GeekChao/ppod/blob/master/src/6_27.ts
 */

interface BikeArgs {
  size: string;
  chain?: string;
  tireSize?: string;
}

interface RoadBikeArgs extends BikeArgs {
  tapeColor: string;
}

type Bike = RoadBikeArgs;

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
  protected abstract postIntialization(args: Bike): void;

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

  protected postIntialization(args: RoadBikeArgs) {
    this.tapeColor = args.tapeColor;
  }

  protected get localSpares() {
    return { tapeColor: this.tapeColor };
  }

  protected get defaultTireSize() {
    return '23';
  }
}

export default function ch7(): void {
  const roadBikeOpts: RoadBikeArgs = {
    size: 'M',
    tapeColor: 'red',
  };
  const roadBike = new RoadBike(roadBikeOpts);

  console.log(roadBike.spares);
}
