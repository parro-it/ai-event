import AsyncIterable from "asynciterable";

/**
 * Create from an event emitter an async iterable that emits
 * each event received.
 * @param  {EventEmitter} emitter the emitter to listen for events
 * @param  {String} event   the name of event to bind to write
 * @return {AsyncIterable}         converted iterator
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
