import "@testing-library/jest-dom";

let uuidCounter = 0;

Object.defineProperty(
  globalThis,
  "crypto",
  {
    configurable: true,

    value: {
      randomUUID: () => {
        uuidCounter += 1;

        return `00000000-0000-4000-8000-${String(
          uuidCounter
        ).padStart(
          12,
          "0"
        )}`;
      },
    },
  }
);