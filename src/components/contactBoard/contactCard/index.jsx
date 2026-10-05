import { FiBriefcase, FiChevronRight, FiClock, FiMoreHorizontal } from "react-icons/fi";
import Avatar from "../avatar/index.jsx";
import { dateLabel, relativeDate } from "../../../utils/dates.js";
import styles from "./styles.module.css";
import classNames from "../../../utils/classNames.js";

const ContactCard = ({ contact, onOpen }) => {
    const due = relativeDate(contact.nextFollowUp);
    return (
        <button
            className={classNames(styles.root, styles["contact-card"])}
            type="button"
            onClick={() => onOpen(contact)}
            aria-label={`Open ${contact.name}`}
        >
            <div className={styles["card-topline"]}>
                <Avatar contact={contact} />
                <span
                    className={classNames(
                        styles["follow-chip"],
                        due.includes("overdue") && styles["is-overdue"],
                    )}
                >
                    <FiClock aria-hidden="true" /> {due}
                </span>
                <span className={styles["card-more"]}>
                    <FiMoreHorizontal aria-hidden="true" />
                </span>
            </div>
            <span className={styles["contact-name"]}>{contact.name}</span>
            <span className={styles["contact-role"]}>{contact.role}</span>
            <span className={styles["company-line"]}>
                <FiBriefcase aria-hidden="true" /> {contact.company}
            </span>
            <span className={styles["tag-row"]}>
                {contact.tags.slice(0, 2).map((tag) => (
                    <span className={styles["tag"]} key={tag}>
                        {tag}
                    </span>
                ))}
            </span>
            <span className={styles["card-divider"]} />
            <span className={styles["card-footline"]}>
                <span>Last touch</span>
                <strong>{dateLabel(contact.lastContact)}</strong>
                <FiChevronRight aria-hidden="true" />
            </span>
        </button>
    );
};

export default ContactCard;
