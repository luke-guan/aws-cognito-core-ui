import React from 'react';
import { Auth } from 'aws-amplify';
import { useAuthState, useAuthDispatch } from '../../AuthContext';
import { Estatus } from '../../AuthTypes';

interface IuseNewPasswordRequired {
    CnewPasswordRequired: React.ElementType;
}

function useNewPasswordRequired({
    CnewPasswordRequired,
    ...rest
}: IuseNewPasswordRequired) {
    const [error, setError] = React.useState<string | null>(null);

    const dispatch = useAuthDispatch();

    const { AUTH_DATA } = useAuthState();
    if (AUTH_DATA === null || !AUTH_DATA.COGNITOUSER) {
        throw new Error('newPasswordRequired missing AUTH_DATA');
    }

    const onSubmit = async ({
        newPassword,
        ...rest
    }: {
        newPassword: string;
    }) => {
        if (newPassword.length === 0) return;

        try {
            await Auth.completeNewPassword(
                AUTH_DATA?.COGNITOUSER,
                newPassword,
                { ...rest }
            );
            dispatch({ type: Estatus.SIGNIN });
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    return <CnewPasswordRequired onSubmit={onSubmit} error={error} {...rest} />;
}

export default useNewPasswordRequired;
