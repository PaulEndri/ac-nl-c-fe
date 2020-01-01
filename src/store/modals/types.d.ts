import { StateType, ActionType } from 'typesafe-actions';


declare module 'typesafe-actions' {
export type ModalAction = ActionType<typeof import('./actions').default>;

  interface Types {
    ModalAction: ModalAction;
  }
}