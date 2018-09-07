import { Action } from "@ngrx/store";
import { MenuActions,MENU_EXPAND,MENU_COLLAPSE } from "./menu.action";

export interface State {
    isMenuOpen:boolean
}

const initialState:State = {
    isMenuOpen: false
}


export function HybseMenuReducer(state = initialState ,action:MenuActions) {
    switch (action.type) {
        case MENU_EXPAND:
            return { isMenuOpen:true };
        case MENU_EXPAND:
            return { isMenuOpen:false };
        default: {
            return state;
        }

    }
}


export const getMenuStatus = (state:State) => { state.isMenuOpen };