import * as menuState from './shared/menu.reducer'; 
import * as authState from './shared/auth.reducer'; 

import { ActionReducerMap } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';

export interface State {
    menu: menuState.State,
    auth: authState.State
}

export const hybseReducers: ActionReducerMap<State> = {
    menu: menuState.HybseMenuReducer,
    auth: authState.HybseAuthenticateReducer
};


export const getMenuState = createFeatureSelector<menuState.State>('menu');
export const getisMenuOpen = createSelector(getMenuState,menuState.getMenuStatus);

export const getAuthState = createFeatureSelector<authState.State>('auth');
export const getisAuthenticated = createSelector(getAuthState,authState.getAuthStatus);