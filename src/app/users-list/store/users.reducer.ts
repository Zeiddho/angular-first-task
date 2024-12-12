import {createReducer, on} from "@ngrx/store";
import {userActions} from './users.action'
import {User} from "../../interfaces/user.interface";

export const initialState: { users: User[]} = {
  users: []
}

export const usersReducer = createReducer(
  initialState,
  on(userActions.loadUsersSuccess, (state, {users}) => {
    return { ...state, users };
  }),
  on(userActions.edit, (state, { user }) => {
    const updatedUsers = state.users.map((u) => (u.id === user.id ? user : u));
    return { ...state, users: updatedUsers };
  }),
  on(userActions.create, (state, {user}: {user: User}): { users: User[] } => {
    const updatedUsers = [...state.users, user];
    return {...state, users: updatedUsers};
  }),
  on(userActions.delete, (state, {id}) => {
    const updatedUsers = state.users.filter(user => user.id !== id);
    return {...state, users: updatedUsers}
  }),
  on(userActions.loadUsersFailure, (state, {error}) => {
  console.error('Ошибка загрузки данных:', error);
    return state;
  }),
)
