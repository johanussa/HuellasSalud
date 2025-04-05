import styles from '../../pages/LoginPage/Login.module.css';

const SocialMediaIcons = () => (
    <section className={styles.socialMedia} >
        {
            ["instagram", "whatsapp", "facebook", "twitter"].map((platform) => (
                <i key={platform} className={`fa-brands fa-${platform}`} title={platform} > </i>
            ))
        }
    </section>
);

export { SocialMediaIcons };