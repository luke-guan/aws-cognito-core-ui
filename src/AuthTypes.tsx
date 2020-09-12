/** STATUS **/
export enum Estatus {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    COMPLETED = 'COMPLETED',
    SIGNIN = 'SIGNIN',
    CONFIRM_SIGNIN = 'CONFIRM_SIGNIN',
    FORGOTPASSWORD = 'FORGOTPASSWORD',
    SIGNOUT = 'SIGNOUT',
    SIGNUP = 'SIGNUP',
    CONFIRM_SIGN_UP = 'CONFIRM_SIGN_UP',
    NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
    MFA_SETUP = 'MFA_SETUP',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    SetUser = 'SetUser',
    ClearUser = 'ClearUser',
}

/** ACTION TYPES **/
type TLoading = {
    type: Estatus.LOADING;
};

type TSetError = {
    type: Estatus.ERROR;
    MESSAGE: string;
};

type TCompleted = {
    type: Estatus.COMPLETED;
};

type TSignIn = {
    type: Estatus.SIGNIN;
};

type TConfirmSignIn = {
    type: Estatus.CONFIRM_SIGNIN;
    AUTH_DATA: {
        COGNITOUSER: any; // TODO any? idea?
    };
};

type TSetUser = {
    type: Estatus.SetUser;
    USER: string;
};

type TClearUser = {
    type: Estatus.ClearUser;
};
type TForgetPassword = {
    type: Estatus.FORGOTPASSWORD;
};

type TSignOut = {
    type: Estatus.SIGNOUT;
};

type TSignUp = {
    type: Estatus.SIGNUP;
};

type TConfirmSignUp = {
    type: Estatus.CONFIRM_SIGN_UP;
    AUTH_DATA: {
        username: string;
    };
};

type TNewPasswordRequired = {
    type: Estatus.NEW_PASSWORD_REQUIRED;
    AUTH_DATA: {
        COGNITOUSER: any;
    };
};

type TMFA_SETUP = {
    type: Estatus.MFA_SETUP;
    AUTH_DATA: {
        COGNITOUSER: any;
    };
};

type TChange_Password = {
    type: Estatus.CHANGE_PASSWORD;
};

export type TAction =
    | TLoading
    | TSetError
    | TCompleted
    | TSignIn
    | TConfirmSignIn
    | TForgetPassword
    | TSetUser
    | TClearUser
    | TSignOut
    | TSignUp
    | TConfirmSignUp
    | TNewPasswordRequired
    | TMFA_SETUP
    | TChange_Password;

/** AUTH STATE **/
export interface IAuthData {
    COGNITOUSER?: any; // TODO
    username?: string | null;
}
export interface IstateObj {
    STATUS: Estatus;
    USER: string | null;
    MESSAGE: string | null;
    AUTH_DATA: IAuthData | null;
}

/** DISPATCH **/
export type TDispatch = (action: TAction) => void;
export type TcheckUser = () => void;

export interface IComponentObject {
    signInC: React.ElementType;
    errorMsgC: React.ElementType;
    forgotPasswordC: React.ElementType;
    forgotPasswordSubmitC: React.ElementType;
    signOutC: React.ElementType;
    signUpC: React.ElementType;
    confirmSignUpC: React.ElementType;
    confirmSignInC: React.ElementType;
    newPasswordRequiredC: React.ElementType;
    mfaSetupC: React.ElementType;
    changePasswordC: React.ElementType;
    changePasswordSuccessC: React.ElementType;
    loadingC: React.ElementType;
}

export interface IAuthContextProviderProps {
    awsconfig: any;
    children: React.ReactNode;
    ComponentObject: IComponentObject;
    protectedC?: boolean;
}
