import { Action } from "@ngrx/store";

export const MENU_EXPAND = 'admin menu expand';
export const MENU_COLLAPSE = 'admin menu collapse';

export class MenuExpand implements Action {
    readonly type = MENU_EXPAND;
}

export class MenuCollapse implements Action {
    readonly type = MENU_COLLAPSE;
}

export type MenuActions = MenuExpand | MenuCollapse;