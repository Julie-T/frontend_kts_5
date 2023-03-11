import * as React from "react";


type Props = {
    children: React.ReactNode;
    object: { a: string} | null;
}
const Button: React.FC<Props> = ({children, object}: Props) =>{
    return <div onClick={async () => {}}>{object?.a}</div>
}
export default Button;