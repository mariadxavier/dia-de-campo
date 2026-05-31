import { ReactNode } from "react"

type ActionButtonProps = {
    children: ReactNode;
    action: () => void;
}
export default function ActionButton({children, action}: ActionButtonProps) {
    return (
        <button onClick={action}>
            {children}
        </button>
    )
}