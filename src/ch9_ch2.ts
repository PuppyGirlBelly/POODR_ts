export class Wheel {
  rim: number;
  tire: number;

  public constructor(rim: number, tire: number) {
    this.rim = rim;
    this.tire = tire;
  }

  public width() {
    return this.rim + (this.tire * 2);
  }
}

interface Diameterizable {
  width(): number;
}

export interface GearArgs {
  chainRing: number,
  cog: number,
  wheel: Diameterizable,
  observer: any;
}

export class Gear {
  chainRing: number;
  cog: number;
  wheel: Diameterizable;
  observer: any;

  public constructor(args: GearArgs) {
    this.chainRing = args.chainRing;
    this.cog = args.cog;
    this.wheel = args.wheel;
    this.observer = args.observer;
  }

  public gearInches() {
    return this.ratio() * this.wheel.width();
  }

  private ratio() {
    return this.chainRing / this.cog;
  }

  public setCog(newCog: number) {
    this.cog = newCog;
    this.changed();
  }

  public setChainRing(newChainRing: number) {
    this.chainRing = newChainRing;
    this.changed();
  }

  private changed() {
    this.observer.changed(this.chainRing, this.cog);
  }
}

export function ch9(): void {

}
