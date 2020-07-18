import { createMachine, interpret, assign } from "xstate";

const rootMachine = createMachine({
  id: "PR-Tagger",
  initial: "idle",
  context: {
    user: null,
  },
  states: {
    home: {
      on: {},
    },
    login: {
      on: {},
    },
    saved: {},
  },
  on: {},
});

const PRTaggerService = interpret(rootMachine);

import { readable } from "svelte/store";

export const state = readable(null, (set) => {
  PRTaggerService.onTransition((state) => set(state));
  return () => {};
});
export const send = PRTaggerService.send;

PRTaggerService.start();
