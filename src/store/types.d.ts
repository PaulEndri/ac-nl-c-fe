import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootState = StateType<typeof import('./index').default>;
}