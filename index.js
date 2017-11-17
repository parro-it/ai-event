import AsyncIterable from "asynciterable";

/**
 * Create an async iterable from a stream
 * @param  {EventEmitter} emitter the emitter to listen for events
 * @param  {String | Object} event   the name of event to bind to write
 * @return {[type]}         converted iterator
 */
export default function aiFromEvent(emitter, opts) {
  const {
    end = "end",
    error = "error",
    event = typeof opts === "string" ? opts : ""
  } = opts;

  return new AsyncIterable((writeFn, endFn, errorFn) => {
    emitter.on(event, writeFn);
    emitter.on(end, endFn);
    emitter.on(error, errorFn);
  });
}
