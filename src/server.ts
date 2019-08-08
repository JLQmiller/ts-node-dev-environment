export function hello(): number {
  console.log("fuck");
  return 5;
}

hello();

export function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "By", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 1 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20
  };
}

export class Province {
  private _name: string;
  private _producers: any[];
  private _totalProduction: number;
  private _demand: number;
  private _price: number;
  constructor(doc: any) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d: any) => this.addProducer(new Producer(this, d)));
  }
  public get name() {
    return this._name;
  }
  public get producers() {
    return this._producers.slice();
  }
  public get totalProduction() {
    return this._totalProduction;
  }
  public set totalProduction(arg) {
    this._totalProduction = arg;
  }
  public get demand() {
    return this._demand;
  }
  public set demand(arg) {
    this._demand = arg;
  }
  public get price() {
    return this._price;
  }
  public set price(arg) {
    this._price = arg;
  }
  public get shortfall(): number {
    return this._demand - this.totalProduction;
  }
  public get profit() {
    return (this.demandValue - this.demandCost) as number;
  }
  public get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach(p => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
  private get demandValue() {
    return this.satisfiedDemand * this.price;
  }
  private get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }
  private addProducer(arg: any) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
}

export class Producer {
  private _province: Province;
  private _cost: number;
  private _name: string;
  private _production: any;
  constructor(aProvince: Province, data: any) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }
  public get name() {
    return this._name;
  }
  public get cost() {
    return this._cost;
  }
  public set cost(arg) {
    this._cost = parseInt(arg.toString());
  }
  public get production() {
    return this._production;
  }
  public set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._production.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}

const newInstance = new Province(sampleProvinceData());
console.log(`console.log:  ${newInstance.name}`);
newInstance.totalProduction = 3;
console.log(`console.log:  ${newInstance.totalProduction}`);