import React from 'react';
import { Auth } from 'aws-amplify';
import {
    useAuthDispatch,
    useAuthCheckUser,
} from '../../AuthContext';
import { Estatus } from '../../AuthTypes';

interface IuseSignIn {
    CsignIn: React.ElementType;
}

function useSignIn({ CsignIn, ...rest }: IuseSignIn) {
    const [error, setError] = React.useState<string | null>(null);

    const checkUser = useAuthCheckUser();
    const dispatch = useAuthDispatch();

    const onSubmit = async ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        if (username.length === 0 || password.length === 0) return;

        try {
            const cognitoUser = await Auth.signIn(username, password);

            if (
                cognitoUser.challengeName === 'SMS_MFA' ||
                cognitoUser.challengeName === 'SOFTWARE_TOKEN_MFA'
            ) {
                dispatch({
                    type: Estatus.CONFIRM_SIGNIN,
                    AUTH_DATA: {
                        COGNITOUSER: cognitoUser,
                    },
                });
            } else if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
                dispatch({
                    type: Estatus.NEW_PASSWORD_REQUIRED,
                    AUTH_DATA: {
                        COGNITOUSER: cognitoUser,
                    },
                });
            } else if (cognitoUser.challengeName === 'MFA_SETUP') {
                dispatch({
                    type: Estatus.MFA_SETUP,
                    AUTH_DATA: {
                        COGNITOUSER: cognitoUser,
                    },
                });
            } else {
                checkUser();
            }
        } catch (err) {
            if (err.code === 'UserNotConfirmedException') {
                dispatch({
                    type: Estatus.CONFIRM_SIGN_UP,
                    AUTH_DATA: { username },
                });
            } else if (err.code === 'PasswordResetRequiredException') {
                dispatch({ type: Estatus.FORGOTPASSWORD });
            } else {
                setError(JSON.stringify(err));
            }
        }
    };

    return <CsignIn onSubmit={onSubmit} error={error} {...rest} />;
}

export default useSignIn;
