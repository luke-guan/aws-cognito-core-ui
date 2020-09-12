import React from 'react';
import { Estatus, IstateObj, IComponentObject } from './AuthTypes';

import Loading from './auth-controller/loading/loading';
import ErrorMsg from './auth-controller/errorMsg/errorMsg';
import SignUp from './auth-controller/signUp/signUp';
import ConfirmSignUp from './auth-controller/confirmSignUp/confirmSignUp';
import SignIn from './auth-controller/signIn/signIn';
import ConfirmSignIn from './auth-controller/confirmSignIn/confirmSignIn';
import SignOut from './auth-controller/signOut/signOut';
import ForgotPassword from './auth-controller/forgotPassword/forgotPassword';
import NewPasswordRequired from './auth-controller/newPasswordRequired/newPasswordRequired';
import MfaSetup from './auth-controller/mfaSetup/mfaSetup';
import ChangePassword from './auth-controller/changePassword/changePassword';

interface IAuthContextReturn {
    state: IstateObj;
    protectedC: boolean;
    ComponentObject: IComponentObject;
    children?: React.ReactNode;
}

function AuthContextReturn({
    state,
    protectedC,
    ComponentObject,
    children,
}: IAuthContextReturn) {
    const { STATUS } = state;
    const {
        signInC,
        errorMsgC,
        forgotPasswordC,
        forgotPasswordSubmitC,
        signOutC,
        signUpC,
        confirmSignUpC,
        confirmSignInC,
        newPasswordRequiredC,
        mfaSetupC,
        changePasswordC,
        changePasswordSuccessC,
        loadingC,
    } = ComponentObject;

    if (STATUS === Estatus.SIGNIN) {
        return <SignIn CsignIn={signInC} />;
    } else if (STATUS === Estatus.ERROR) {
        return <ErrorMsg CerrorMsg={errorMsgC} Cloading={loadingC} />;
    } else if (STATUS === Estatus.FORGOTPASSWORD) {
        return (
            <ForgotPassword
                CforgotPassword={forgotPasswordC}
                CforgotPasswordSubmit={forgotPasswordSubmitC}
            />
        );
    } else if (STATUS === Estatus.SIGNOUT) {
        return <SignOut CsignOut={signOutC} />;
    } else if (STATUS === Estatus.SIGNUP) {
        return <SignUp CsignUp={signUpC} />;
    } else if (STATUS === Estatus.CONFIRM_SIGN_UP) {
        return <ConfirmSignUp CconfirmSignUp={confirmSignUpC} />;
    } else if (STATUS === Estatus.CONFIRM_SIGNIN) {
        return <ConfirmSignIn CconfirmSignIn={confirmSignInC} />;
    } else if (STATUS === Estatus.NEW_PASSWORD_REQUIRED) {
        return (
            <NewPasswordRequired CnewPasswordRequired={newPasswordRequiredC} />
        );
    } else if (STATUS === Estatus.MFA_SETUP) {
        return <MfaSetup CmfaSetup={mfaSetupC} />;
    } else if (STATUS === Estatus.CHANGE_PASSWORD && Boolean(state.USER)) {
        return (
            <ChangePassword
                CchangePassword={changePasswordC}
                CchangePasswordSuccess={changePasswordSuccessC}
            />
        );
    } else if (STATUS === Estatus.CHANGE_PASSWORD) {
        return <SignIn CsignIn={signInC} />;
    } else if (STATUS === Estatus.COMPLETED) {
        if (state.USER === null && protectedC === true) {
            /* default */
            return <SignIn CsignIn={signInC} />;
        }
        /* protectedC === false */
        return <>{children}</>;
    } else if (STATUS === Estatus.LOADING) {
        return <Loading Cloading={loadingC} />;
    } else {
        return <Loading Cloading={loadingC} />;
    }
}

export default AuthContextReturn;
