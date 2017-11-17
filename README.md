# ai-event

[![Travis Build Status](https://img.shields.io/travis/parro-it/ai-event/master.svg)](http://travis-ci.org/parro-it/ai-event)
[![NPM downloads](https://img.shields.io/npm/dt/ai-event.svg)](https://npmjs.org/package/ai-event)

> Create an async iterable from an event emitter.

This module transform an event emitter into an async iterable.

## Async iterable fun

**This module is part of
[Async iterable fun](https://github.com/parro-it/ai-fun), a complete toolset of
modules to work with async iterables.**

## Usage

Transform a node stream into an aync iterable:

```js
const fromEvent = require("ai-event");
import { createReadStream } from "fs";

const stream = createReadStream("aFile", "utf8");
const iterable = fromEvent(stream, "data");
for await (const chunk of iterable) {
  console.log(chunk);
}
```

This will output aFile content

## API

## Install

With [npm](https://npmjs.org/) installed, run

```bash
npm install --save ai-event
```

## See Also

* [`noffle/common-readme`](https://github.com/noffle/common-readme)
* [`parro-it/ai-fun`](https://github.com/parro-it/ai-fun)

## License

MIT
