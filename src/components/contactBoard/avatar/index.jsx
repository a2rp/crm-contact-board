import styles from "./styles.module.css";
import classNames from "../../../utils/classNames.js";

const Avatar = ({ contact, size = "regular" }) => {
    const initials = contact.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("");
    return (
        <span
            className={classNames(
                styles.root,
                styles.avatar,
                styles[`avatar-${contact.color || "mint"}`],
                styles[`avatar-${size}`],
            )}
        >
            {contact.avatar ? <img src={contact.avatar} alt="" /> : initials}
        </span>
    );
};

export default Avatar;
