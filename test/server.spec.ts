import { expect } from "chai";
import { hello } from "../src/server";

test("it should hello", () => {
    expect(hello()).to.equal(5);
});