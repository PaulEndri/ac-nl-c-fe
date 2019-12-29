import { StateType, ActionType } from 'typesafe-actions';


declare module 'typesafe-actions' {
export type GlobalAction = ActionType<typeof import('./actions').default>;

  interface Types {
    GlobalAction: GlobalAction;
  }
}