import { FiCheck } from "react-icons/fi";
import Avatar from "../../contactBoard/avatar/index.jsx";
import { isoDate, relativeDate } from "../../../utils/dates.js";
import styles from "./styles.module.css";

const FollowUpItem = ({ contact, onOpenContact, onMarkDone }) => {
    return (
<div className={`${styles.root} followup-item`}>
                                    <span
                                        className={`follow-date ${contact.nextFollowUp <= isoDate() ? "today" : ""}`}
                                    >
                                        <strong>
                                            {new Date(
                                                `${contact.nextFollowUp}T12:00:00`,
                                            ).getDate()}
                                        </strong>
                                        <small>
                                            {new Date(
                                                `${contact.nextFollowUp}T12:00:00`,
                                            )
                                                .toLocaleDateString("en-US", {
                                                    month: "short",
                                                })
                                                .toUpperCase()}
                                        </small>
                                    </span>
                                    <Avatar contact={contact} size="small" />
                                    <button
                                        type="button"
                                        className="followup-person"
                                        onClick={() => onOpenContact(contact)}
                                    >
                                        <strong>{contact.name}</strong>
                                        <span>
                                            {contact.company} <i>{"\u00b7"}</i>{" "}
                                            {contact.role}
                                        </span>
                                    </button>
                                    <span
                                        className={`follow-relative ${contact.nextFollowUp <= isoDate() ? "is-today" : ""}`}
                                    >
                                        {relativeDate(contact.nextFollowUp)}
                                    </span>
                                    <button
                                        type="button"
                                        className="done-button"
                                        onClick={() => onMarkDone(contact)}
                                        aria-label={`Mark follow-up with ${contact.name} done`}
                                    >
                                        <FiCheck />
                                    </button>
                                </div>
    );
};

export default FollowUpItem;
