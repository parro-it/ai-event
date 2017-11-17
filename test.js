import test from "tape-async";
import aiEvent from ".";

test("exports a function", t => {
  t.is(typeof aiEvent, "function");
});
