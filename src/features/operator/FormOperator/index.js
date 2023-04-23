import { Button, Form, Modal, Upload, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ThemeInput from "../../../Components/ThemeInput";
import { PlusOutlined } from "@ant-design/icons";
import imageAPI from "../../../services/imageAPI";
import operatorAPI from "../../../services/operatorAPI";
import Loading from "../../../Components/Loading";

export default function FormOperator({ dataItem, onCandleForm, onReLoad }) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [URLImage, setURLImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const ref = useRef();
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataItem) {
            form.setFieldsValue({
                name: dataItem.name,
            });
            setFileList([
                {
                    uid: "-1",
                    status: "done",
                    url: dataItem.image,
                },
            ]);
            setURLImage(dataItem.image);
        } else {
            form.setFieldsValue({
                name: "",
            });
            setURLImage("");
            setFileList([]);
        }
    }, [form, dataItem]);

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url?.substring(file.url?.lastIndexOf("/") + 1)
        );
    };

    const handleChange = async ({ file, fileList }) => {
        setFileList(fileList);
    };
    const handleCancel = () => setPreviewOpen(false);

    const uploadImage = async (options) => {
        const { onSuccess, onError, file /* onProgress */ } = options;

        try {
            const base64 = await getBase64(file);
            const res = await imageAPI.uploadImageAPI({
                name: file.name,
                image: base64,
            });
            onSuccess("Ok");
            setURLImage(res.url);
        } catch (err) {
            const error = new Error("Some error");
            onError({ error });
        }
    };

    const handleSubmit = async (value) => {
        if (URLImage) {
            try {
                ref.current.showLoading();
                if (dataItem) {
                    await operatorAPI.putOperatorAPI(dataItem.id, {
                        ...value,
                        image: URLImage,
                    });
                } else {
                    await operatorAPI.createOperatorAPI({
                        ...value,
                        image: URLImage,
                    });
                }
                onCandleForm();
                onReLoad();
                ref.current.hideLoading();
                notification.success({
                    message: "Them thanh cong!!",
                });
                form.setFieldsValue({
                    name: "",
                });
                setURLImage("");
                setFileList([]);
            } catch (error) {
                ref.current.hideLoading();
                notification.error({
                    message: error.message || "Lỗi",
                });
            }
        } else {
            notification.error({
                message: "Chưa có ảnh",
            });
        }
    };

    return (
        <div>
            <Loading ref={ref} />
            <Form form={form} onFinish={handleSubmit}>
                <ThemeInput name={"name"} label={"Tên"} />
                <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    customRequest={uploadImage}
                >
                    {fileList.length === 0 && (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    )}
                </Upload>
                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                    />
                </Modal>

                <Button onClick={() => onCandleForm()}>Đóng</Button>
                <Button type="primary" htmlType="submit">
                    {dataItem ? "Cập nhật" : "Thêm"}
                </Button>
            </Form>
        </div>
    );
}
