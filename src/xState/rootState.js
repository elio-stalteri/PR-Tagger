import { createMachine, interpret, assign, send } from "xstate";
import { readable } from "svelte/store";
import router from "page";

const checkTockenInLocalStorage = () =>
  !!localStorage.getItem("GithubLogInTocken");

const rootMachine = createMachine(
  {
    id: "PR-Tagger",
    initial: "home",
    context: {
      tocken: null,
      organization: "facebook",
      repo: "pyre2",
      menu: [
        { name: "comments", action: "GO_COMMENTS" },
        { name: "saved", action: "GO_SAVED" },
      ],
    },
    states: {
      home: {
        initial: "comments",
        states: {
          comments: {},
          saved: {},
        },
        entry: ["setRoute", "setTocken"],
        on: {
          "": { target: "login", cond: () => !checkTockenInLocalStorage() },
          GO_SAVED: { target: ".saved" },
          GO_COMMENTS: { target: ".comments" },
          UPDATE_SELECTED_ORG: { actions: ["updateSelectedOrgNAme"] },
          UPDATE_SELECTED_REPO: { actions: ["updateSelectedRepoNAme"] },
        },
      },
      login: {
        entry: ["setRoute"],
        on: { "": { target: "home", cond: checkTockenInLocalStorage } },
      },
    },
    on: {
      HOME: { target: "home" },
      LOGOUT: { target: "login" },
    },
  },
  {
    actions: {
      setRoute: (context, event) => {
        //router(event)
      },
      setTocken: assign((context) => {
        const tocken = localStorage.getItem("GithubLogInTocken");
        return { ...context, tocken };
      }),
      updateSelectedOrgNAme: assign((context, event) => {
        return { ...context, organization: event.orgName, repo: "" };
      }),
      updateSelectedRepoNAme: assign((context, event) => {
        return { ...context, repo: event.repoName };
      }),
    },
  }
);

//export default rootMachine;

//import rootMachine from "./xState/rootState.js";
const PRTaggerService = interpret(rootMachine);

export const state = readable({}, (set) => {
  PRTaggerService.onTransition((state) => {
    set(state);
  });
  return () => {};
});
export const sendEvent = PRTaggerService.send;

PRTaggerService.start();
