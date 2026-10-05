import styles from "./styles.module.css";

const Avatar = ({ contact, size = "regular" }) => {
    const initials = contact.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("");
    return (
        <span
            className={`${styles.root} avatar avatar-${contact.color || "mint"} avatar-${size}`}
        >
            {contact.avatar ? <img src={contact.avatar} alt="" /> : initials}
        </span>
    );
};

export default Avatar;
