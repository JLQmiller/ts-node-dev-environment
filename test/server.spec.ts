import { expect } from "chai";
import {
  hello,
  Producer,
  Province,
  sampleProvinceData,
} from "../src/server";

describe("Province", () => {
  let asia: Province;
  beforeEach(function() {
    asia = new Province(sampleProvinceData());
  });

  test("it should hello", () => {
    expect(hello()).to.equal(5);
  });
  
  test("it should province profit", () => {
    expect(asia.profit).to.equal(158);
  });
  
  test("it should province shortfall", () => {
    expect(asia.shortfall).to.equal(14);
  });
  
  test("it should province name", () => {
    expect(asia.name).to.equal("Asia");
  });

  test("it should province set totalProduction", () => {
    asia.totalProduction = 3;
    expect(asia.totalProduction).to.equal(3);
  });

  test("it should province set demand", () => {
    asia.demand = 2;
    expect(asia.demand).to.equal(2);
  });
});

// describe("Producer", () => {
//   let producer: Producer;
//   beforeEach(function() {
//     producer = new Producer(new Province(sampleProvinceData()), );
//   })
// })