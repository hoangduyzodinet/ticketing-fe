import React from "react";
import CreateBankModal from "../../components/modules/create-bank-modal/create-bank-modal";
import CreateEvent from "../../components/modules/create-event/create-event";
import { useAppSelector } from "../../redux/hooks";
import { selectorUser } from "../../redux/user/userSlice";

export const CreateEventTemplate: React.FC = () => {
    const user = useAppSelector(selectorUser);

    return <>{user.isBankAccount ? <CreateEvent /> : <CreateBankModal />}</>;
};
