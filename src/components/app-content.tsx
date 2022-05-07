import React, { ReactNode, useLayoutEffect } from "react";
import { IPayload } from "../interfaces/common/jwt-payload.interface";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/user/userSlice";
import * as api from "./../services";

interface IAppContentProps {
    children?: ReactNode;
}

const AppContent: React.FC<IAppContentProps> = ({ children }) => {
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        const getUserJwt = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const result: IPayload = await api.userApi.getUser(token);
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
