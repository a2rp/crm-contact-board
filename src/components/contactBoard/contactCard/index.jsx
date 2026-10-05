import { FiBriefcase, FiChevronRight, FiClock, FiMoreHorizontal } from "react-icons/fi";
import Avatar from "../avatar/index.jsx";
import { dateLabel, relativeDate } from "../../../utils/dates.js";
import styles from "./styles.module.css";

function ContactCard({ contact, onOpen }) {
    const due = relativeDate(contact.nextFollowUp);
    return (
        <button
            className={`${styles.root} contact-card`}
            type="button"
            onClick={() => onOpen(contact)}
            aria-label={`Open ${contact.name}`}
        >
            <div className="card-topline">
                <Avatar contact={contact} />
                <span
                    className={`follow-chip ${due.includes("overdue") ? "is-overdue" : ""}`}
                >
                    <FiClock aria-hidden="true" /> {due}
                </span>
                <span className="card-more">
                    <FiMoreHorizontal aria-hidden="true" />
                </span>
            </div>
            <span className="contact-name">{contact.name}</span>
            <span className="contact-role">{contact.role}</span>
            <span className="company-line">
                <FiBriefcase aria-hidden="true" /> {contact.company}
            </span>
            <span className="tag-row">
                {contact.tags.slice(0, 2).map((tag) => (
                    <span className="tag" key={tag}>
                        {tag}
                    </span>
                ))}
            </span>
            <span className="card-divider" />
            <span className="card-footline">
                <span>Last touch</span>
                <strong>{dateLabel(contact.lastContact)}</strong>
                <FiChevronRight aria-hidden="true" />
            </span>
        </button>
    );
}

export default ContactCard;
