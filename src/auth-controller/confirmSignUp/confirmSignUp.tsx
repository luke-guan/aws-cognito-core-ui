import React from 'react';
import { Auth } from 'aws-amplify';
import { useAuthDispatch, useAuthState } from '../../AuthContext';
import { Estatus } from '../../AuthTypes';

interface IuseConfirmSignUp {
    CconfirmSignUp: React.ElementType;
}

function useConfirmSignUp({ CconfirmSignUp, ...rest }: IuseConfirmSignUp) {
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useAuthDispatch();

    const { AUTH_DATA } = useAuthState();
    if (!AUTH_DATA || !AUTH_DATA.username) {
        throw new Error('confirmSignUp username does not exist');
    }
    const { username } = AUTH_DATA;

    async function resendSignUp() {
        try {
            await Auth.resendSignUp(username);
        } catch (err) {
            setError(JSON.stringify(err));
        }
    }

    const onSubmit = async ({ code }: { code: string }) => {
        if (code.length === 0) return;

        try {
            await Auth.confirmSignUp(username, code);
            dispatch({ type: Estatus.SIGNIN });
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    return (
        <CconfirmSignUp
            USER={username}
            onSubmit={onSubmit}
            resendSignUp={resendSignUp}
            error={error}
            {...rest}
        />
    );
}

export default useConfirmSignUp;
