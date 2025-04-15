import styles from "./Button.module.css";

interface PropsButton {
    loading?: boolean;
    contain: string;
    type?: "submit" | "button" | "reset" | undefined;
}

const ButtonComponent = ({ loading, contain, type = "button" }: PropsButton) => {
    return (
        <button className={styles.button} type={type} disabled={loading} >
            {contain}
        </button>
    )
}

export default ButtonComponent;