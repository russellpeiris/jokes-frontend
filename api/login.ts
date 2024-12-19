import axios from "axios";
import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const loginResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_URL}/moderator/auth/login`,
                {
                    email,
                    password,
                }
            );
            setData(loginResponse.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error, data };
};
