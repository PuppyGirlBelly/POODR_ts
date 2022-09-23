/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
class Wheel {
  rim: number;
  tire: number;

  constructor(rim: number, tire: number) {
    this.rim = rim;
    this.tire = tire;
  }

  diameter() {
    return this.rim + this.tire * 2;
  }

  circumference() {
    return this.diameter() * Math.PI;
  }
}

class Gear {
  chainring: number;
  cog: number;
  wheel: Wheel | null;

  constructor(chainring: number, cog: number, wheel: Wheel | null = null) {
    this.chainring = chainring;
    this.cog = cog;
    this.wheel = wheel;
  }

  ratio(): number {
    return this.chainring / this.cog;
  }

  gearInches(): number {
    return this.ratio() * this.wheel.diameter();
  }
}

export default function ch2(): void {
  const wheel = new Wheel(26, 1.5);
  console.log(new Gear(52, 11, wheel).gearInches());
  console.log(new Gear(52, 11).ratio());
}
