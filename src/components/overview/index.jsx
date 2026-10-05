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
import appStyles from "../../App.module.css";
import classNames from "../../utils/classNames.js";

const Overview = ({ contacts, dueToday, openRelationships, thisWeek, todayLabel, onAddContact, onToast }) => {
    return (
        <div className={styles.root}>
                <section className={styles["welcome-row"]} id="overview">
                    <div>
                        <div className={styles["date-kicker"]}>
                            <span className={styles["live-dot"]} /> YOUR RELATIONSHIP DESK{" "}
                            <span className={styles["kicker-separator"]}>/</span>{" "}
                            {todayLabel.toUpperCase()}
                        </div>
                        <h1>
                            Know who's <em>next.</em>
                        </h1>
                        <p className={styles["welcome-copy"]}>
                            A thoughtful follow-up can change everything. Here's
                            your day at a glance.
                        </p>
                    </div>
                    <button
                        type="button"
                        className={classNames(appStyles["button"], appStyles["button-primary"], styles["add-button"])}
                        onClick={onAddContact}
                    >
                        <FiPlus /> Add a contact
                    </button>
                </section>

                <section
                    className={styles["metric-row"]}
                    aria-label="Relationship summary"
                >
                    <article className={classNames(styles["metric-card"], styles["metric-main"])}>
                        <div className={styles["metric-head"]}>
                            <span className={styles["metric-icon"]}>
                                <FiUsers />
                            </span>
                            <span className={styles["metric-label"]}>
                                PEOPLE IN YOUR CIRCLE
                            </span>
                            <button
                                type="button"
                                className={styles["mini-menu"]}
                                aria-label="Contact summary"
                                onClick={() =>
                                    onToast("Your full contact list is below")
                                }
                            >
                                <FiMoreHorizontal />
                            </button>
                        </div>
                        <div className={styles["metric-value"]}>
                            {contacts.length}
                            <span className={styles["metric-change"]}>
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
                    <article className={classNames(styles["metric-card"], styles["metric-accent"])}>
                        <div className={styles["metric-head"]}>
                            <span className={styles["metric-icon"]}>
                                <FiCalendar />
                            </span>
                            <span className={styles["metric-label"]}>
                                NEEDS A TOUCH TODAY
                            </span>
                            <span className={styles["metric-pulse"]} />
                        </div>
                        <div className={styles["metric-value"]}>
                            {dueToday}
                            <span className={styles["metric-out-of"]}>
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
                    <article className={classNames(styles["metric-card"], styles["metric-third"])}>
                        <div className={styles["metric-head"]}>
                            <span className={styles["metric-icon"]}>
                                <FiSliders />
                            </span>
                            <span className={styles["metric-label"]}>
                                ACTIVE RELATIONSHIPS
                            </span>
                            <span className={styles["metric-caption"]}>THIS WEEK</span>
                        </div>
                        <div className={styles["metric-value"]}>
                            {openRelationships}
                            <span className={classNames(styles["metric-change"], styles["metric-soft"])}>
                                <FiArrowDownRight /> steady
                            </span>
                        </div>
                        <p>
                            <strong>{thisWeek} follow-ups</strong> on your
                            calendar
                        </p>
                    </article>
                    <div className={styles["metric-note"]}>
                        <span className={styles["note-mark"]}>â€œ</span>
                        <p>People remember how you make the follow-up feel.</p>
                        <span className={styles["note-attribution"]}>
                            A LITTLE REMINDER
                        </span>
                    </div>
                </section>
        </div>
    );
};

export default Overview;
