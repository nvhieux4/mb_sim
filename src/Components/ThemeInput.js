import { Form, Input } from "antd";

const ThemeInput = (props) => {
    const {
        value,
        name,
        type = "text",
        label,
        rules,
        styleInput,
        disabled,
        size,
        allowClear,
        bordered,
        status,
        onPressEnter,
        placeholder,
        onChange,
        onFocus,
        defaultValue,
        icon,
        initialValue,
        isPassword = false,
    } = props;

    return (
        <div style={{ textAlign: "initial" }}>
            {label && <span>{label}</span>}
            <Form.Item name={name} rules={rules} initialValue={initialValue}>
                {isPassword ? (
                    <Input.Password
                        style={{ ...styleInput, padding: "8px 14px" }}
                        type={type}
                        disabled={disabled}
                        size={size}
                        allowClear={allowClear}
                        status={status}
                        bordered={bordered}
                        onPressEnter={onPressEnter}
                        placeholder={placeholder}
                        onChange={onChange}
                        onFocus={onFocus}
                        value={value}
                        prefix={icon}
                        defaultValue={defaultValue}
                    />
                ) : (
                    <Input
                        style={{ ...styleInput, padding: "8px 14px" }}
                        type={type}
                        disabled={disabled}
                        size={size}
                        allowClear={allowClear}
                        status={status}
                        bordered={bordered}
                        onPressEnter={onPressEnter}
                        placeholder={placeholder}
                        onChange={onChange}
                        onFocus={onFocus}
                        value={value}
                        prefix={icon}
                        defaultValue={defaultValue}
                    />
                )}
            </Form.Item>
        </div>
    );
};

export default ThemeInput;
