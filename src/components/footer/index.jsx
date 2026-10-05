import {
    FaCoffee,
    FaCodepen,
    FaFacebookF,
    FaGithub,
    FaGlobe,
    FaHeart,
    FaLinkedinIn,
    FaPatreon,
    FaYoutube,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { currentYear } from "../../utils/dates.js";
import styles from "./styles.module.css";
import classNames from "../../utils/classNames.js";

const footerLinks = [
    {
        label: "Portfolio",
        href: "https://www.ashishranjan.net",
        icon: <FaGlobe />,
    },
    { label: "GitHub", href: "https://github.com/a2rp", icon: <FaGithub /> },
    {
        label: "CodePen",
        href: "https://codepen.io/ash1198",
        icon: <FaCodepen />,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aashishranjan",
        icon: <FaLinkedinIn />,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/theash.ashish/",
        icon: <FaFacebookF />,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",
        icon: <FaYoutube />,
    },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: <FiMail /> },
    {
        label: "Support",
        href: "https://a2rp-donation-page.netlify.app/",
        icon: <FaHeart />,
    },
    {
        label: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/ashishranjan",
        icon: <FaCoffee />,
    },
    {
        label: "Patreon",
        href: "https://www.patreon.com/ashishranjan",
        icon: <FaPatreon />,
    },
];

const Footer = () => {
    return (
        <footer className={classNames(styles.root, styles["site-footer"])}>
            <div className={styles["footer-credit"]}>
                <a
                    className={styles["footer-logo"]}
                    href="https://www.ashishranjan.net"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Ashish Ranjan portfolio"
                >
                    <img
                        src={`${import.meta.env.BASE_URL}logo.png`}
                        alt="Ashish Ranjan logo"
                    />
                </a>
                <p>
                    © {currentYear}{" "}
                    <a
                        href="https://github.com/a2rp"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ashish Ranjan
                    </a>
                    . All rights reserved.
                </p>
            </div>
            <nav className={styles["footer-links"]} aria-label="Ashish Ranjan links">
                {footerLinks.map((link) => (
                    <a
                        href={link.href}
                        key={link.label}
                        target={
                            link.href.startsWith("mailto:")
                                ? undefined
                                : "_blank"
                        }
                        rel="noreferrer"
                        aria-label={link.label}
                        title={link.label}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </a>
                ))}
            </nav>
        </footer>
    );
};

export default Footer;
