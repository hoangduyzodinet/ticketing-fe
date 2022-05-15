import NotFound from "../../components/basics/not-found/not-found";
import ManageUser from "../../components/modules/manage-user/manage-user";
import { useAppSelector } from "../../redux/hooks";
import { selectorUser } from "../../redux/user/userSlice";
import s from "./manage-user.module.scss";

const ManageUserTemplate: React.FC = () => {
    const user = useAppSelector(selectorUser);

    return user.role !== "admin" ? (
        <NotFound />
    ) : (
        <article className={s.manageUser}>
            <ManageUser />
        </article>
    );
};

export default ManageUserTemplate;
