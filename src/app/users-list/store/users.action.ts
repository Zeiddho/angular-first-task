import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../../interfaces/user.interface";

export const userActions = createActionGroup({
  source: 'Users',
  events: {
    'set': props<{ users: User[] }>(),
    'edit': props<{ user: User }>(),
    'create': props<{ user: User }>(),
    'delete': props<{ id: number }>(),
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: any }>(),
    'Update Local Storage': props<{ users: User[] }>()
  },
});

