import React from 'react';
import { Auth } from 'aws-amplify';
import { useAuthDispatch, useAuthState } from '../../AuthContext';
import { Estatus } from '../../AuthTypes';

interface IuseMfaSetup {
    CmfaSetup: React.ElementType;
}

function useMfaSetup({ CmfaSetup }: IuseMfaSetup) {
    const [code, setCode] = React.useState('');
    const [rawCode, setRawCode] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useAuthDispatch();

    const { AUTH_DATA } = useAuthState();
    if (AUTH_DATA === null || !AUTH_DATA.COGNITOUSER) {
        throw new Error('mfaSetup missing AUTH_DATA');
    }

    React.useEffect(() => {
        async function setupTOTP() {
            try {
                const rawcode = await Auth.setupTOTP(AUTH_DATA?.COGNITOUSER);
                setRawCode(rawcode);
                const preCode = `otpauth://totp/AWSCognito:${AUTH_DATA?.COGNITOUSER.username}?secret=${rawcode}&issuer=AWSCognito`;
                setCode(preCode);
            } catch (err) {
                setError(JSON.stringify(err));
            }
        }
        setupTOTP();
        // eslint-disable-next-line
    }, []);

    const onSubmit = async ({
        challengeAnswer,
    }: {
        challengeAnswer: string;
    }) => {
        if (challengeAnswer.length === 0) return;

        try {
            await Auth.verifyTotpToken(
                AUTH_DATA?.COGNITOUSER,
                challengeAnswer
            ).then(() => {
                Auth.setPreferredMFA(AUTH_DATA?.COGNITOUSER, 'TOTP');
            });
            dispatch({ type: Estatus.SIGNIN });
        } catch (err) {
            setError(JSON.stringify(err));
        }
    };

    if (!code) return null;
    return (
        <CmfaSetup
            onSubmit={onSubmit}
            rawCode={rawCode}
            code={code}
            error={error}
        />
    );
}

export default useMfaSetup;
