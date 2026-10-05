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
import Avatar from "./Avatar/index.jsx";
import ContactCard from "./ContactCard/index.jsx";
import styles from "./styles.module.css";

function ContactBoard({ filteredContacts, activeStage, onStageChange, view, onViewChange, onExport, onOpenContact, onAddToStage, onToast }) {
    return (
        <div className={styles.root}>
                <section className="board-section" id="contacts">
                    <div className="section-heading">
                        <div className="section-title-wrap">
                            <div className="section-icon">
                                <FiUsers />
                            </div>
                            <div>
                                <div className="eyebrow">YOUR PEOPLE</div>
                                <h2>
                                    Relationship board
                                    <span className="heading-period">.</span>
                                </h2>
                            </div>
                            <span className="contact-total">
                                {filteredContacts.length} contacts
                            </span>
                        </div>
                        <div className="board-controls">
                            <label className="filter-select">
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
                                className="view-toggle"
                                role="group"
                                aria-label="Board display"
                            >
                                <button
                                    type="button"
                                    className={
                                        view === "board" ? "selected" : ""
                                    }
                                    onClick={() => onViewChange("board")}
                                    aria-label="Board view"
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    type="button"
                                    className={
                                        view === "list" ? "selected" : ""
                                    }
                                    onClick={() => onViewChange("list")}
                                    aria-label="List view"
                                >
                                    <FiSliders />
                                </button>
                            </div>
                            <button
                                className="icon-button export-button"
                                type="button"
                                onClick={onExport}
                                aria-label="Export contacts"
                            >
                                <FiDownload />
                            </button>
                        </div>
                    </div>

                    {view === "board" ? (
                        <div className="kanban-board">
                            {stageList.map((stage, index) => {
                                const inStage = filteredContacts.filter(
                                    (contact) => contact.stage === stage,
                                );
                                return (
                                    <section
                                        className={`kanban-column column-${index + 1}`}
                                        key={stage}
                                        aria-label={`${stage} contacts`}
                                    >
                                        <div className="column-heading">
                                            <span className="column-marker" />
                                            <h3>{stage}</h3>
                                            <span className="column-count">
                                                {inStage.length}
                                            </span>
                                            <button
                                                type="button"
                                                className="column-menu"
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
                                        <div className="column-cards">
                                            {inStage.length ? (
                                                inStage.map((contact) => (
                                                    <ContactCard
                                                        key={contact.id}
                                                        contact={contact}
                                                        onOpen={onOpenContact}
                                                    />
                                                ))
                                            ) : (
                                                <p className="empty-stage">
                                                    No contacts here yet
                                                </p>
                                            )}
                                            <button
                                                className="add-to-stage"
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
                        <div className="contact-table-wrap">
                            <table className="contact-table">
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
                                                <span className="table-person">
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
                                                    className={`stage-pill stage-${contact.stage.toLowerCase()}`}
                                                >
                                                    {contact.stage}
                                                </span>
                                            </td>
                                            <td>
                                                {dateLabel(
                                                    contact.nextFollowUp,
                                                )}{" "}
                                                <small className="table-relative">
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
                                                className="no-results"
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
}

export default ContactBoard;

