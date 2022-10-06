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

  leadTime() {
    return 1;
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

class Vehicle {
  leadTime() {
    return 3;
  }
}

class Mechanic {
  leadTime() {
    return 4;
  }
}

/* ***MIXIN CODE*** */
// eslint-disable-next-line no-unused-vars
type GConstructor<T = {}> = new (...args: any[]) => T;
type Scheduable = GConstructor<{ leadTime(): number }>;

function Schedule<TBase extends Scheduable>(Base: TBase) {
  return class Scheduler extends Base {
    private isScheduled(
      scheduable: typeof Base,
      startDate: string,
      endDate: string
    ) {
      console.log(
        `This ${scheduable.name} is not scheduled\n\tbetween ${startDate} and ${endDate}`
      );
    }

    public isSchedulable(startDate: Date, endDate: Date) {
      // Clone startDate, to avoid subtracting from reference
      const d = new Date(startDate.getTime());
      d.setDate(startDate.getDate() - this.leadDays());

      const start = d.toLocaleDateString();
      const end = endDate.toLocaleDateString();
      this.isScheduled(Base, start, end);
    }

    private leadDays(): number {
      return this.leadTime() || 0;
    }
  };
}

const ScheduableRoadBike = Schedule(RoadBike);
const ScheduableVehicle = Schedule(Vehicle);
const ScheduableMechanic = Schedule(Mechanic);

/* ***END MIXIN*** */

export default function ch7(): void {
  const roadBikeOpts: RoadBikeArgs = {
    size: 'M',
    tapeColor: 'red',
  };
  const b = new ScheduableRoadBike(roadBikeOpts);
  const v = new ScheduableVehicle();
  const m = new ScheduableMechanic();

  const start = new Date('2015/09/04');
  const end = new Date('2015/09/10');

  b.isSchedulable(start, end);
  v.isSchedulable(start, end);
  m.isSchedulable(start, end);
}
