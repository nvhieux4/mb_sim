import { Button, Image, Modal, Table, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import operatorAPI from "../../services/operatorAPI";
import Loading from "../../Components/Loading";
import FormOperator from "./FormOperator";

export default function Operator() {
    const [contents, setContents] = useState([]);
    const [open, setOpen] = useState(null);
    const [dataItem, setDataItem] = useState(null);
    const COLUMNS = [
        {
            title: "Name",
            dataIndex: "name",
            width: "150px",
            filters: [
                ...new Set(contents?.Items?.map((item) => item.name)),
            ]?.map((item) => ({ text: item, value: item })),
            onFilter: (value, record) => record.name.indexOf(value) === 0,
        },
        {
            title: "Image",
            dataIndex: "image",
            // width: "150px",

            render: (_, data) => {
                return (
                    <Image
                        // width={200}
                        src={data.image}
                    />
                );
            },
        },
        {
            title: "Actions",
            dataIndex: "operation",
            width: 150,
            key: "operation",
            render: (_, record) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                maxHeight: 40,
                            }}
                        >
                            <div
                                style={{
                                    margin: "0 5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => onClickActionEdit(record)}
                            >
                                Sửa
                            </div>
                            <div
                                style={{
                                    margin: "0 5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => onClickActionDelete(record)}
                            >
                                Xóa
                            </div>
                        </div>
                    </div>
                );
            },
        },
    ];
    const ref = useRef();
    const onClickActionEdit = (record) => {
        setOpen(true);
        setDataItem(record);
    };

    const onClickActionDelete = async (record) => {
        try {
            ref.current.showLoading();
            await operatorAPI.deleteOperatorAPI(record.id);
            notification.success({
                message: "Xóa thành công!",
            });
            ref.current.hideLoading();
            callApi();
        } catch (error) {
            ref.current.hideLoading();
            notification.error({
                message: error.message || "Looix",
            });
        }
    };

    const callApi = async (changePage = "") => {
        try {
            const res = await operatorAPI.operatorsAPI(4, changePage);
            setContents(res);
        } catch (error) {
            console.log("êrer", error);
            notification.error({
                message: error.message || "Looix",
            });
        }
    };

    const handleAdd = () => {
        setOpen(true);
        setDataItem(null);
    };

    useEffect(() => {
        callApi();
    }, []);

    const handleChangePage = (nextPage) => {
        callApi({
            next: nextPage,
            key: contents.LastEvaluatedKey,
        });
    };

    return (
        <>
            <Loading ref={ref} />
            <h2>Operator</h2>
            <Button onClick={handleAdd}>Thêm</Button>
            <Modal
                title="Modal"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <FormOperator
                    dataItem={dataItem}
                    onCandleForm={() => setOpen(false)}
                    onReLoad={callApi}
                />
            </Modal>
            <div style={{ width: "1000px", margin: "0 auto" }}>
                <Table
                    size={"small"}
                    tableLayout="fixed"
                    dataSource={contents?.Items}
                    columns={COLUMNS}
                    rowClassName="editable-row"
                    pagination={false}
                    rowKey={(item) => item.id}
                    sortDirections={["DESC", "ASC"]}
                    // onChange={handleChangePaginationFilterSorter}
                    showSorterTooltip={false}
                />
                <Button onClick={() => handleChangePage(false)}>Pev</Button>
                <Button onClick={() => handleChangePage(true)}>Next</Button>
            </div>
        </>
    );
}
