import React, { useLayoutEffect, useState } from "react";
import CreateEvent from "../../components/modules/create-event/create-event";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectorUser, updateIsBank } from "../../redux/user/userSlice";
import { UserApi } from "../../services";

const userApi = new UserApi();

export const CreateEventTemplate: React.FC = () => {
    const user = useAppSelector(selectorUser);
    const dispatch = useAppDispatch();

    const [isBankAccount, setIsBankAccount] = useState(false);

    useLayoutEffect(() => {
        const getBank = async (id: string) => {
            try {
                const result = await userApi.findBankByUserId(id);
                setIsBankAccount(!!result);
                dispatch(updateIsBank({ isBankAccount: !!result }));
            } catch (error) {
                dispatch(updateIsBank({ isBankAccount: false }));
            }
        };

        getBank(user.id);
    }, [user.id]);

    return (
        <>
            {/* {!isBankAccount && <ModalCreateBank />} */}
            {/* {isBankAccount && <EventDetail />} */}
            <CreateEvent />
        </>
    );
};
