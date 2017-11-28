import test from "tape-async";
import aiEvent from ".";
import concat from "ai-concat";
import { createReadStream } from "fs";
const fromStream = stream => aiEvent(stream, "data");

test("transform a stream into an async iterable", async t => {
  const stream = createReadStream(`${__dirname}/fixtures/test`, "utf8");
  t.is(await concat(fromStream(stream)), "test line 1\nline 2\n");
});

test("throw if arg is not a readable stream", async t => {
  t.throws(
    () => fromStream(),
    TypeError,
    `Expected a readable stream argument, got ${undefined}`
  );
});
