import React from 'react';
import { Auth } from 'aws-amplify';
import { useAuthDispatch } from '../../AuthContext';
import { Estatus } from '../../AuthTypes';

interface IuseForgotPassword {
    CforgotPassword: React.ElementType;
    CforgotPasswordSubmit: React.ElementType;
}

function useForgotPassword({
    CforgotPassword,
    CforgotPasswordSubmit,
    ...rest
}: IuseForgotPassword) {
    const [error, setError] = React.useState<string | null>(null);
    const [username, setUsername] = React.useState('');
    const dispatch = useAuthDispatch();

    const onSubmitCforgotPassword = async ({ user }: { user: string }) => {
        if (user.length === 0) return;

        setUsername(user);
        try {
            await Auth.forgotPassword(user);
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    const onSubmitCforgotPasswordSubmit = async ({
        code,
        newPassword,
    }: {
        code: string;
        newPassword: string;
    }) => {
        if (code.length === 0 || newPassword.length === 0) return;

        try {
            await Auth.forgotPasswordSubmit(username, code, newPassword);
            dispatch({ type: Estatus.SIGNIN });
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    if (username) {
        return (
            <CforgotPasswordSubmit
                onSubmit={onSubmitCforgotPasswordSubmit}
                username={username}
                error={error}
                {...rest}
            />
        );
    }

    return (
        <CforgotPassword
            onSubmit={onSubmitCforgotPassword}
            error={error}
            {...rest}
        />
    );
}

export default useForgotPassword;
