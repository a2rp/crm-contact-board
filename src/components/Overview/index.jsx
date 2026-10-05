import {
    FiArrowDownRight,
    FiArrowUpRight,
    FiCalendar,
    FiMoreHorizontal,
    FiPlus,
    FiSliders,
    FiUsers,
} from "react-icons/fi";
import styles from "./styles.module.css";

function Overview({ contacts, dueToday, openRelationships, thisWeek, todayLabel, onAddContact, onToast }) {
    return (
        <div className={styles.root}>
                <section className="welcome-row" id="overview">
                    <div>
                        <div className="date-kicker">
                            <span className="live-dot" /> YOUR RELATIONSHIP DESK{" "}
                            <span className="kicker-separator">/</span>{" "}
                            {todayLabel.toUpperCase()}
                        </div>
                        <h1>
                            Know who's <em>next.</em>
                        </h1>
                        <p className="welcome-copy">
                            A thoughtful follow-up can change everything. Here's
                            your day at a glance.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="button button-primary add-button"
                        onClick={onAddContact}
                    >
                        <FiPlus /> Add a contact
                    </button>
                </section>

                <section
                    className="metric-row"
                    aria-label="Relationship summary"
                >
                    <article className="metric-card metric-main">
                        <div className="metric-head">
                            <span className="metric-icon">
                                <FiUsers />
                            </span>
                            <span className="metric-label">
                                PEOPLE IN YOUR CIRCLE
                            </span>
                            <button
                                type="button"
                                className="mini-menu"
                                aria-label="Contact summary"
                                onClick={() =>
                                    onToast("Your full contact list is below")
                                }
                            >
                                <FiMoreHorizontal />
                            </button>
                        </div>
                        <div className="metric-value">
                            {contacts.length}
                            <span className="metric-change">
                                <FiArrowUpRight /> 12%
                            </span>
                        </div>
                        <p>
                            Across{" "}
                            <strong>
                                {
                                    new Set(
                                        contacts.map(
                                            (contact) => contact.company,
                                        ),
                                    ).size
                                }{" "}
                                companies
                            </strong>{" "}
                            and growing
                        </p>
                    </article>
                    <article className="metric-card metric-accent">
                        <div className="metric-head">
                            <span className="metric-icon">
                                <FiCalendar />
                            </span>
                            <span className="metric-label">
                                NEEDS A TOUCH TODAY
                            </span>
                            <span className="metric-pulse" />
                        </div>
                        <div className="metric-value">
                            {dueToday}
                            <span className="metric-out-of">
                                {" "}
                                / {contacts.length}
                            </span>
                        </div>
                        <p>
                            <strong>
                                {dueToday
                                    ? "A few good conversations"
                                    : "A clear day ahead"}
                            </strong>{" "}
                            are waiting
                        </p>
                    </article>
                    <article className="metric-card metric-third">
                        <div className="metric-head">
                            <span className="metric-icon">
                                <FiSliders />
                            </span>
                            <span className="metric-label">
                                ACTIVE RELATIONSHIPS
                            </span>
                            <span className="metric-caption">THIS WEEK</span>
                        </div>
                        <div className="metric-value">
                            {openRelationships}
                            <span className="metric-change metric-soft">
                                <FiArrowDownRight /> steady
                            </span>
                        </div>
                        <p>
                            <strong>{thisWeek} follow-ups</strong> on your
                            calendar
                        </p>
                    </article>
                    <div className="metric-note">
                        <span className="note-mark">â€œ</span>
                        <p>People remember how you make the follow-up feel.</p>
                        <span className="note-attribution">
                            A LITTLE REMINDER
                        </span>
                    </div>
                </section>
        </div>
    );
}

export default Overview;
