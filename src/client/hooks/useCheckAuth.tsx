import { useState, useEffect } from "react";
import { GET } from "../services/api";

const useCheckAuth = () => {
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        const check = async () => {
            const res = await GET("/api/token_check");
            setIsValid(res.ok);
        };
        check();
    }, []);

    return [isValid, setIsValid];
};

export default useCheckAuth;
