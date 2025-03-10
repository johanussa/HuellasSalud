import styles from "./Button.module.css";

interface PropsButton {
    loading?: boolean;
    contain: string;
    type?: "submit" | "button" | "reset" | undefined;
}

const ButtonComponent = (props: PropsButton) => {
    const { loading, contain, type = "button" } = props;
    return (
        <button className={styles.button} type={type} disabled={loading} >
            {contain}
        </button>
    )
}

export default ButtonComponent;