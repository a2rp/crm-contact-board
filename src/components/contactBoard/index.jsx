import {
    FiChevronDown,
    FiChevronRight,
    FiDownload,
    FiFilter,
    FiGrid,
    FiMoreHorizontal,
    FiPlus,
    FiSliders,
    FiUsers,
} from "react-icons/fi";
import { stageList } from "../../data/contacts.js";
import { dateLabel, isoDate, relativeDate } from "../../utils/dates.js";
import Avatar from "./avatar/index.jsx";
import ContactCard from "./contactCard/index.jsx";
import styles from "./styles.module.css";
import appStyles from "../../App.module.css";
import classNames from "../../utils/classNames.js";

const ContactBoard = ({ filteredContacts, activeStage, onStageChange, view, onViewChange, onExport, onOpenContact, onAddToStage, onToast }) => {
    return (
        <div className={styles.root}>
                <section className={styles["board-section"]} id="contacts">
                    <div className={styles["section-heading"]}>
                        <div className={styles["section-title-wrap"]}>
                            <div className={styles["section-icon"]}>
                                <FiUsers />
                            </div>
                            <div>
                                <div className={appStyles["eyebrow"]}>YOUR PEOPLE</div>
                                <h2>
                                    Relationship board
                                    <span className={appStyles["heading-period"]}>.</span>
                                </h2>
                            </div>
                            <span className={styles["contact-total"]}>
                                {filteredContacts.length} contacts
                            </span>
                        </div>
                        <div className={styles["board-controls"]}>
                            <label className={styles["filter-select"]}>
                                <FiFilter />
                                <select
                                    aria-label="Filter by stage"
                                    value={activeStage}
                                    onChange={(event) =>
                                        onStageChange(event.target.value)
                                    }
                                >
                                    <option>All stages</option>
                                    {stageList.map((stage) => (
                                        <option key={stage}>{stage}</option>
                                    ))}
                                </select>
                                <FiChevronDown />
                            </label>
                            <div
                                className={styles["view-toggle"]}
                                role="group"
                                aria-label="Board display"
                            >
                                <button
                                    type="button"
                                    className={
                                        view === "board" ? styles.selected : undefined
                                    }
                                    onClick={() => onViewChange("board")}
                                    aria-label="Board view"
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    type="button"
                                    className={
                                        view === "list" ? styles.selected : undefined
                                    }
                                    onClick={() => onViewChange("list")}
                                    aria-label="List view"
                                >
                                    <FiSliders />
                                </button>
                            </div>
                            <button
                                className={classNames(appStyles["icon-button"], styles["export-button"])}
                                type="button"
                                onClick={onExport}
                                aria-label="Export contacts"
                            >
                                <FiDownload />
                            </button>
                        </div>
                    </div>

                    {view === "board" ? (
                        <div className={styles["kanban-board"]}>
                            {stageList.map((stage, index) => {
                                const inStage = filteredContacts.filter(
                                    (contact) => contact.stage === stage,
                                );
                                return (
                                    <section
                                        className={classNames(
                                            styles["kanban-column"],
                                            styles[`column-${index + 1}`],
                                        )}
                                        key={stage}
                                        aria-label={`${stage} contacts`}
                                    >
                                        <div className={styles["column-heading"]}>
                                            <span className={styles["column-marker"]} />
                                            <h3>{stage}</h3>
                                            <span className={styles["column-count"]}>
                                                {inStage.length}
                                            </span>
                                            <button
                                                type="button"
                                                className={styles["column-menu"]}
                                                aria-label={`${stage} options`}
                                                onClick={() =>
                                                    onToast(
                                                        `${stage} contacts are organized below`,
                                                    )
                                                }
                                            >
                                                <FiMoreHorizontal />
                                            </button>
                                        </div>
                                        <div className={styles["column-cards"]}>
                                            {inStage.length ? (
                                                inStage.map((contact) => (
                                                    <ContactCard
                                                        key={contact.id}
                                                        contact={contact}
                                                        onOpen={onOpenContact}
                                                    />
                                                ))
                                            ) : (
                                                <p className={styles["empty-stage"]}>
                                                    No contacts here yet
                                                </p>
                                            )}
                                            <button
                                                className={styles["add-to-stage"]}
                                                type="button"
                                                onClick={() => onAddToStage(stage)}
                                            >
                                                <FiPlus /> Add a person
                                            </button>
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles["contact-table-wrap"]}>
                            <table className={styles["contact-table"]}>
                                <thead>
                                    <tr>
                                        <th>Person</th>
                                        <th>Company</th>
                                        <th>Stage</th>
                                        <th>Next follow-up</th>
                                        <th aria-label="Actions" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredContacts.map((contact) => (
                                        <tr
                                            key={contact.id}
                                            onClick={() => onOpenContact(contact)}
                                        >
                                            <td>
                                                <span className={styles["table-person"]}>
                                                    <Avatar
                                                        contact={contact}
                                                        size="small"
                                                    />
                                                    <span>
                                                        <strong>
                                                            {contact.name}
                                                        </strong>
                                                        <small>
                                                            {contact.role}
                                                        </small>
                                                    </span>
                                                </span>
                                            </td>
                                            <td>{contact.company}</td>
                                            <td>
                                                <span
                                                    className={classNames(
                                                        styles["stage-pill"],
                                                        styles[`stage-${contact.stage.toLowerCase()}`],
                                                    )}
                                                >
                                                    {contact.stage}
                                                </span>
                                            </td>
                                            <td>
                                                {dateLabel(
                                                    contact.nextFollowUp,
                                                )}{" "}
                                                <small className={styles["table-relative"]}>
                                                    {relativeDate(
                                                        contact.nextFollowUp,
                                                    )}
                                                </small>
                                            </td>
                                            <td>
                                                <FiChevronRight />
                                            </td>
                                        </tr>
                                    ))}
                                    {!filteredContacts.length && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className={styles["no-results"]}
                                            >
                                                No people match that search yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
        </div>
    );
};

export default ContactBoard;

