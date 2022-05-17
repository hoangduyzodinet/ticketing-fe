import React from "react";
import CreateBankModal from "../../components/modules/create-bank-modal/create-bank-modal";
import EventDetail from "../../components/modules/event-detail/event-detail";
import { useAppSelector } from "../../redux/hooks";
import { selectorUser } from "../../redux/user/userSlice";

export const CreateEventTemplate: React.FC = () => {
    const user = useAppSelector(selectorUser);

    return <>{user.isBankAccount ? <EventDetail /> : <CreateBankModal />}</>;
};
