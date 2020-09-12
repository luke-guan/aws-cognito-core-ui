import React from 'react';
import { Auth } from 'aws-amplify';
import { useAuthDispatch } from '../../AuthContext';
import { Estatus } from '../../AuthTypes';

interface IuseSignOut {
    CsignOut: React.ElementType;
}

function useSignOut({ CsignOut, ...rest }: IuseSignOut) {
    const [error, setError] = React.useState<string | null>(null);

    const dispatch = useAuthDispatch();

    const onSubmit = async ({ global = false }: { global?: boolean }) => {
        try {
            await Auth.signOut({ global });
            dispatch({ type: Estatus.ClearUser });
            dispatch({ type: Estatus.SIGNIN });
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    return <CsignOut onSubmit={onSubmit} error={error} {...rest} />;
}

export default useSignOut;
