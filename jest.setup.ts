import "@testing-library/jest-dom";

let uuidCounter = 0;

Object.defineProperty(
  globalThis,
  "crypto",
  {
    value: {
      randomUUID: jest.fn(() => {
        uuidCounter += 1;

        return `test-uuid-${uuidCounter}`;
      }),
    },
    configurable: true,
  }
);