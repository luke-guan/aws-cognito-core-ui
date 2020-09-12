import React from 'react';
import { Auth } from 'aws-amplify';

interface IuseChangePassword {
    CchangePassword: React.ElementType;
    CchangePasswordSuccess: React.ElementType;
}

function useChangePassword({
    CchangePassword,
    CchangePasswordSuccess,
    ...rest
}: IuseChangePassword) {
    const [formStateSuccess, setFormStateSuccess] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const onSubmit = async ({
        oldPassword,
        newPassword,
    }: {
        oldPassword: string;
        newPassword: string;
    }) => {
        if (oldPassword.length === 0 || newPassword.length === 0) return;

        try {
            const cognitoUser = await Auth.currentAuthenticatedUser();
            await Auth.changePassword(cognitoUser, oldPassword, newPassword);
            setFormStateSuccess(true);
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    if (formStateSuccess) {
        return <CchangePasswordSuccess {...rest} />;
    }

    return <CchangePassword onSubmit={onSubmit} error={error} {...rest} />;
}

export default useChangePassword;
