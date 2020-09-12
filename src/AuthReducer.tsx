import { Estatus, IstateObj, TAction } from './AuthTypes';

function AuthReducer(state: IstateObj, action: TAction) {
    switch (action.type) {
        case Estatus.ERROR:
            return { ...state, STATUS: Estatus.ERROR, MESSAGE: action.MESSAGE };
        case Estatus.COMPLETED:
            return { ...state, STATUS: Estatus.COMPLETED };
        case Estatus.SIGNIN:
            return { ...state, STATUS: Estatus.SIGNIN };
        case Estatus.CONFIRM_SIGNIN:
            return {
                ...state,
                STATUS: Estatus.CONFIRM_SIGNIN,
                AUTH_DATA: action.AUTH_DATA,
            };
        case Estatus.FORGOTPASSWORD:
            return { ...state, STATUS: Estatus.FORGOTPASSWORD };
        case 'SetUser':
            return { ...state, STATUS: Estatus.COMPLETED, USER: action.USER };
        case 'ClearUser':
            return { ...state, USER: null, AUTH_DATA: null, MESSAGE: null };
        case Estatus.SIGNOUT:
            return { ...state, STATUS: Estatus.SIGNOUT };
        case Estatus.SIGNUP:
            return { ...state, STATUS: Estatus.SIGNUP };
        case Estatus.CONFIRM_SIGN_UP:
            return {
                ...state,
                STATUS: Estatus.CONFIRM_SIGN_UP,
                AUTH_DATA: action.AUTH_DATA,
            };
        case Estatus.NEW_PASSWORD_REQUIRED:
            return {
                ...state,
                STATUS: Estatus.NEW_PASSWORD_REQUIRED,
                AUTH_DATA: action.AUTH_DATA,
            };
        case Estatus.MFA_SETUP:
            return {
                ...state,
                STATUS: Estatus.MFA_SETUP,
                AUTH_DATA: action.AUTH_DATA,
            };
        case Estatus.CHANGE_PASSWORD:
            return {
                ...state,
                STATUS: Estatus.CHANGE_PASSWORD,
            };
        case Estatus.LOADING:
        default:
            return { ...state, STATUS: Estatus.LOADING };
    }
}

export default AuthReducer;
