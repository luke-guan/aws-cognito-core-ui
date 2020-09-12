import React from 'react';
import { Auth } from 'aws-amplify';
import { useAuthCheckUser, useAuthState } from '../../AuthContext';

interface IuseConfirmSignIn {
    CconfirmSignIn: React.ElementType;
}

function useConfirmSignIn({ CconfirmSignIn, ...rest }: IuseConfirmSignIn) {
    const [error, setError] = React.useState<string | null>(null);
    const checkUser = useAuthCheckUser();

    const { AUTH_DATA } = useAuthState();
    if (AUTH_DATA === null || !AUTH_DATA.COGNITOUSER) {
        throw new Error('confirmSignIn missing cognitoUser');
    }

    const onSubmit = async ({ code }: { code: string }) => {
        if (code.length === 0) return;

        try {
            await Auth.confirmSignIn(
                AUTH_DATA.COGNITOUSER,
                code,
                AUTH_DATA.COGNITOUSER.challengeName
            );
            checkUser();
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    return <CconfirmSignIn onSubmit={onSubmit} error={error} {...rest} />;
}

export default useConfirmSignIn;
