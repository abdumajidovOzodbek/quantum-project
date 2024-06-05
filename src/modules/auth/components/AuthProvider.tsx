import { useEffect } from 'react';
import { useState } from 'react';

const AuthProvider = ({ children }: any) => {
    const [token] = useState(localStorage.getItem('token'))

    useEffect(() => {
        if (!token || token === null) {
            location.href = '/login'
        }
    }, [token])

    return (
        <>
            {
                children
            }
        </>
    );
}

export default AuthProvider;

