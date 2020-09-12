import React from 'react';

interface IuseLoading {
    Cloading: React.ElementType;
}

function useLoading({ Cloading, ...rest }: IuseLoading) {
    return <Cloading {...rest} />;
}

export default useLoading;
