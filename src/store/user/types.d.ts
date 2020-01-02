import { StateType, ActionType } from 'typesafe-actions';


declare module 'typesafe-actions' {
export type UserAction = ActionType<typeof import('./actions').default>;

  interface Types {
    UserAction: UserAction;
  }
}