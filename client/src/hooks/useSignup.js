import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => { 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (formData) => { 
        setIsLoading(true); 
        setError(null); 
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)  
        });

        const json = await response.json();

        if (!response.ok) { 
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) { 
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error }; 
};
