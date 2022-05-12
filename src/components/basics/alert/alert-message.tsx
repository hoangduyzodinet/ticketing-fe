import React from "react";
import { Alert } from "antd";

interface AlertProps {
    title: TypeAlertEnum;
    message: string;
}

export enum TypeAlertEnum {
    Success = "success",
    Warning = "warning",
    Info = "info",
    Error = "error",
}

const AlertMessage: React.FC<AlertProps> = (props) => {
    return (
        <Alert message={props.message} type={props.title} showIcon closable />
    );
};
export default AlertMessage;
