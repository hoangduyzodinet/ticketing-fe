import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import s from "./create-bank-modal.module.scss";

const CreateBankModal: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const router = useRouter();

    const handleOk = () => {
        setIsModalVisible(false);
        router.push("/user/create-bank");
    };

    const handleCancel = () => {
        router.back();
        setIsModalVisible(false);
    };

    return (
        <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            className={s.createBankModal}
            footer={[
                <Button
                    key="back"
                    size="large"
                    className={s.btnPrimaryCancel}
                    onClick={handleCancel}
                >
                    <ArrowLeftOutlined /> Return
                </Button>,
                <Button
                    key="submit"
                    size="large"
                    className={s.btnPrimary}
                    onClick={handleOk}
                >
                    Create Bank Account <ArrowRightOutlined />
                </Button>,
            ]}
        >
            <p className={s.content}>
                Please provide bank account information before creating an
                event.
            </p>
        </Modal>
    );
};

export default CreateBankModal;
