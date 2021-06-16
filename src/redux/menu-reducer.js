const OPEN_MENU = 'scandinavia/menu/OPEN_MENU';
const CLOSE_MENU = 'scandinavia/menu/CLOSE_MENU';

let initialState = {
    isOpened: false
};

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MENU: {
            return {
                ...state,
                isOpened: true
            }
        }
        case CLOSE_MENU: {
            return {
                ...state,
                isOpened: false
            }
        }
        default:
            return state;
    }
}

export const setMenuOpened = () => ({type: OPEN_MENU});
export const setMenuClosed = () => ({type: CLOSE_MENU});

export default menuReducer;