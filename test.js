const test = require("tape-async");
const { createReadStream } = require("fs");
const { app, BrowserWindow } = require("electron");
const _require = require("@std/esm")(module, {
  esm: "js",
  cjs: true
});
const concat = _require("ai-concat").default;
const aiEvent = _require(".").default;

const fromStream = stream => aiEvent(stream, "data");

test("transform a stream into an async iterable", async t => {
  const stream = createReadStream(`${__dirname}/fixtures/test`, "utf8");
  t.is(await concat(fromStream(stream)), "test line 1\nline 2\n");
});

test("throw if arg is not a readable stream", async t => {
  t.throws(
    () => aiEvent(),
    TypeError,
    `Expected an event emitter argument, got ${undefined}`
  );
});

test("it work in browsers", async t => {
  const win = new BrowserWindow();
  win.loadURL(`file://${__dirname}/fixtures/index.html`);

  const result = await new Promise(resolve =>
    win.webContents.on("dom-ready", () =>
      setTimeout(async () => {
        resolve(win.webContents.executeJavaScript("window.results"));
      }, 100)
    )
  );

  t.deepEqual(result, [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);
});

test("quit tests", async () => {
  setTimeout(() => app.quit(), 200);
});
