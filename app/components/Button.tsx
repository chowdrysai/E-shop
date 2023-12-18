"use client"

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    custom?: boolean;
    icon?:IconType
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void; 
}
const Button: React.FC<ButtonProps> = ({
    label,disabled,outline,custom,icon:Icon,small,onClick
}) => {
    return ( 
        <button
        onClick={onClick}
        disabled={disabled}
        className={`disabled :opacity-70
        disabled :cursor-not-allowed
        rounded-md hover:opacity-80
        justify-center
        transition
        w-full
        border-slate-700
        flex items-center gap-2
        ${outline ? "bg-white": "bg-slate-700"}
        ${outline ? "text-slate-700": "text-white"}
        ${small? "py-1 px-2 border-[1px]": "py-3 px-4 border-2"}
        ${small? "text-sm font-light": "text-md font-bold"}
        ${custom ?  custom : " "}`
        }>
            {Icon && <Icon size={24}/> }
            {label}
        </button>
     );
}
 
export default Button;