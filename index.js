import AsyncIterable from "asynciterable";

/**
 * Create an async iterable from a stream
 * @param  {EventEmitter} emitter the emitter to listen for events
 * @param  {String | Object} event   the name of event to bind to write
 * @return {[type]}         converted iterator
 */
export default function aiFromEvent(emitter, opts) {
  if (
    typeof emitter !== "object" ||
    emitter === null ||
    (typeof emitter.on !== "function" &&
      typeof emitter.addEventListener !== "function")
  ) {
    throw new TypeError(`Expected an event emitter argument, got ${emitter}`);
  }
  const {
    end = "end",
    error = "error",
    event = typeof opts === "string" ? opts : ""
  } = opts;

  let on;
  if (typeof emitter.on === "function") {
    on = emitter.on;
  } else {
    on = emitter.addEventListener;
  }

  return new AsyncIterable((writeFn, endFn, errorFn) => {
    on.call(emitter, event, writeFn);
    on.call(emitter, end, endFn);
    on.call(emitter, error, errorFn);
  });
}
