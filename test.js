import test from "tape-async";
import aiEvent from ".";
import { createReadStream } from "fs";
const fromStream = stream => aiEvent(stream, "data");

async function concat(iterable) {
  let result = "";

  for await (const chunk of iterable) {
    result += chunk;
  }

  return result;
}

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
