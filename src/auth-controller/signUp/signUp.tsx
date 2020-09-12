import React from 'react';
import { Auth } from 'aws-amplify';
import { useAuthDispatch } from '../../AuthContext';
import { Estatus } from '../../AuthTypes';

interface IuseSignUp {
    CsignUp: React.ElementType;
}

function useSignUp({ CsignUp, ...rest }: IuseSignUp) {
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useAuthDispatch();

    const onSubmit = async ({
        username,
        password,
        email,
        phoneNumber,
    }: {
        username: string;
        password: string;
        email?: string;
        phoneNumber?: string;
    }) => {
        if (username.length === 0 || password.length === 0) return;

        try {
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    phone_number: phoneNumber,
                },
            });
            dispatch({
                type: Estatus.CONFIRM_SIGN_UP,
                AUTH_DATA: { username },
            });
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    return <CsignUp onSubmit={onSubmit} error={error} {...rest} />;
}

export default useSignUp;
