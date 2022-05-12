import React, { ReactNode, useLayoutEffect } from "react";
import { IPayload } from "../interfaces/common/jwt-payload.interface";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/user/userSlice";
import { UserApi } from "../services";

interface IAppContentProps {
    children?: ReactNode;
}

const AppContent: React.FC<IAppContentProps> = ({ children }) => {
    const dispatch = useAppDispatch();

    const userApi = new UserApi();

    useLayoutEffect(() => {
        const getUserJwt = async () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                const result = await userApi.getUser();
                if (result) {
                    dispatch(login(result));
                }
            }
        };
        getUserJwt();
    }, [dispatch]);

    return <>{children}</>;
};

export default AppContent;
