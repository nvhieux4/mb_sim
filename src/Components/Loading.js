import { Spin } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

function Loading(props, ref) {
    const [openLoading, setOpenLoading] = useState(false);
    // const handleClose = () => {
    //     setOpenLoading(false);
    // };

    useImperativeHandle(ref, () => ({
        showLoading: () => {
            setOpenLoading(true);
        },
        hideLoading: () => {
            setOpenLoading(false);
        },
    }));
    return (
        <>
            {openLoading && (
                <div className="custom-modal">
                    <Spin size="large" />
                </div>
            )}
        </>
    );
}

export default forwardRef(Loading);
