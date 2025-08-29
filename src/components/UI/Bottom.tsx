import type { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children : string;
    className? : string
    width? : "w-full" | "w-fit"

}
const Bottom = ({className, children, width = "w-full", ...rest} : IProps) => {
    return <button className={`${className} ${width}
    rounded-md text-white`} {...rest}>{children}</button>;
};

export default Bottom;