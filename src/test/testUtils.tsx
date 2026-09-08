import type {
  PropsWithChildren,
  ReactElement,
} from "react";

import {
  configureStore,
} from "@reduxjs/toolkit";

import {
  render,
} from "@testing-library/react";

import {
  Provider,
} from "react-redux";

import guidesReducer from "../store/guideSlice";

export const createTestStore =
  () => {
    return configureStore({
      reducer: {
        guides:
          guidesReducer,
      },
    });
  };

export type TestStore =
  ReturnType<
    typeof createTestStore
  >;

export const renderWithStore = (
  component: ReactElement,
  store: TestStore =
    createTestStore()
) => {
  function Wrapper({
    children,
  }: PropsWithChildren) {
    return (
      <Provider
        store={store}
      >
        {children}
      </Provider>
    );
  }

  return {
    store,

    ...render(
      component,
      {
        wrapper:
          Wrapper,
      }
    ),
  };
};