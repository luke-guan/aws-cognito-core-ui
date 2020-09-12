import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import AuthReducer from './AuthReducer';
import AuthContextReturn from './AuthContextReturn';

import {
    IstateObj,
    Estatus,
    TDispatch,
    TcheckUser,
    IAuthContextProviderProps,
} from './AuthTypes';

const contextObj: IstateObj = {
    STATUS: Estatus.LOADING,
    USER: null,
    MESSAGE: null,
    AUTH_DATA: null,
};

const AuthContextState = React.createContext(contextObj);

const AuthContextDispatch = React.createContext<TDispatch | undefined>(
    undefined
);

const AuthContextCheckUser = React.createContext<TcheckUser | undefined>(
    undefined
);

function PlaceholderC() {
    return <></>;
}

const placeholderComponentObject = {
    signInC: PlaceholderC,
    errorMsgC: PlaceholderC,
    forgotPasswordC: PlaceholderC,
    forgotPasswordSubmitC: PlaceholderC,
    signOutC: PlaceholderC,
    signUpC: PlaceholderC,
    confirmSignUpC: PlaceholderC,
    confirmSignInC: PlaceholderC,
    newPasswordRequiredC: PlaceholderC,
    mfaSetupC: PlaceholderC,
    changePasswordC: PlaceholderC,
    changePasswordSuccessC: PlaceholderC,
    loadingC: PlaceholderC,
};

export function AuthProvider({
    awsconfig,
    protectedC = true,
    ComponentObject = placeholderComponentObject,
    children,
}: IAuthContextProviderProps) {
    const [state, dispatch] = React.useReducer(AuthReducer, contextObj);
    Amplify.configure(awsconfig);

    async function checkUser() {
        try {
            if (!Auth || typeof Auth.currentAuthenticatedUser !== 'function') {
                const errorMsg = 'Auth is missing: npm install aws-amplify';
                throw new Error(errorMsg);
            }
            const cognitoUser = await Auth.currentAuthenticatedUser();
            dispatch({ type: Estatus.SetUser, USER: cognitoUser.username });
        } catch (err) {
            dispatch({ type: Estatus.ClearUser });
        } finally {
            dispatch({ type: Estatus.COMPLETED });
        }
    }

    React.useEffect(() => {
        function RunOnce() {
            checkUser();
        }
        RunOnce();
    }, []);

    return (
        <AuthContextState.Provider value={state}>
            <AuthContextDispatch.Provider value={dispatch}>
                <AuthContextCheckUser.Provider value={checkUser}>
                    <AuthContextReturn
                        ComponentObject={ComponentObject}
                        state={state}
                        protectedC={protectedC}
                    >
                        {children}
                    </AuthContextReturn>
                </AuthContextCheckUser.Provider>
            </AuthContextDispatch.Provider>
        </AuthContextState.Provider>
    );
}

export function useAuthState() {
    const context = React.useContext(AuthContextState);
    if (context === undefined) {
        throw new Error('useAuthState is undefined');
    }
    return context;
}

export function useAuthDispatch() {
    const context = React.useContext(AuthContextDispatch);
    if (context === undefined) {
        throw new Error('useAuthDispatch is undefined');
    }
    return context;
}

export function useAuthCheckUser() {
    const context = React.useContext(AuthContextCheckUser);
    if (context === undefined) {
        throw new Error('useAuthCheckUser is undefined');
    }
    return context;
}
