class Wheel {
  rim: number;
  tire: number;

  constructor(rim: number, tire: number) {
    this.rim = rim;
    this.tire = tire;
  }

  diameter() {
    return this.rim + (this.tire * 2);
  }
}

interface GearArgs {
  chainRing: number;
  cog: number;
  rim: number;
  tire: number;
}

class Gear {
  chainRing: number;
  cog: number;
  rim: number;
  tire: number;

  constructor(args: GearArgs) {
    this.chainRing = args.chainRing;
    this.cog = args.cog;
    this.rim = args.rim;
    this.tire = args.tire;
  }

  gearInches() {
    return this.ratio() * new Wheel(this.rim, this.tire).diameter();
  }

  ratio() {
    return this.chainRing / this.cog;
  }
}

export default function ch9(): void {

}
