import React from 'react';
import { useAuthState } from '../../AuthContext';

interface IuseErrorMsg {
    CerrorMsg: React.ElementType;
    Cloading: React.ElementType;
}

function useErrorMsg({ CerrorMsg, Cloading, ...rest }: IuseErrorMsg) {
    const { MESSAGE } = useAuthState();

    if (MESSAGE === null) {
        return <Cloading />;
    }
    return <CerrorMsg error={MESSAGE} {...rest} />;
}

export default useErrorMsg;
