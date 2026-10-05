import { useState } from "react";
import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import { isoDate } from "../../utils/dates.js";
import FollowUpItem from "./followUpItem/index.jsx";
import WeekCard from "./weekCard/index.jsx";
import styles from "./styles.module.css";
import appStyles from "../../App.module.css";

const FollowUps = ({ upcoming, thisWeek, onOpenContact, onMarkDone, onNavChange, onAddContact }) => {
    const [period, setPeriod] = useState("this-week");
    const today = new Date(`${isoDate()}T12:00:00`);
    const futureContacts = upcoming.filter(
        (contact) => contact.nextFollowUp >= isoDate(),
    );
    const periodContacts = upcoming.filter((contact) => {
        const daysUntil = Math.round(
            (new Date(`${contact.nextFollowUp}T12:00:00`) - today) / 86400000,
        );

        if (period === "this-week") return daysUntil >= 0 && daysUntil <= 7;
        if (period === "next-week") return daysUntil > 7 && daysUntil <= 14;
        if (period === "overdue") return daysUntil < 0;
        return daysUntil >= 0;
    }).slice(0, 4);

    return (
                <section className={styles["bottom-grid"]} id="follow-ups">
                    <article className={styles["followup-panel"]}>
                        <div className={styles["panel-heading"]}>
                            <div>
                                <div className={appStyles["eyebrow"]}>
                                    MAKE THE NEXT MOVE
                                </div>
                                <h2>
                                    Coming up
                                    <span className={appStyles["heading-period"]}>.</span>
                                </h2>
                            </div>
                            <label className={styles["period-select"]}>
                                <select
                                    aria-label="Filter follow-ups by period"
                                    value={period}
                                    onChange={(event) =>
                                        setPeriod(event.target.value)
                                    }
                                >
                                    <option value="this-week">This week</option>
                                    <option value="next-week">Next week</option>
                                    <option value="overdue">Overdue</option>
                                    <option value="all-upcoming">All upcoming</option>
                                </select>
                                <FiChevronDown aria-hidden="true" />
                            </label>
                        </div>
                        <div className={styles["followup-list"]}>
                            {periodContacts.length ? (
                                periodContacts.map((contact) => (
                                    <FollowUpItem
                                        key={contact.id}
                                        contact={contact}
                                        onOpenContact={onOpenContact}
                                        onMarkDone={onMarkDone}
                                    />
                                ))
                            ) : (
                                <p className={styles["empty-list"]}>
                                    No follow-ups for this period.
                                </p>
                            )}
                        </div>
                        <a
                            className={styles["panel-footer-link"]}
                            href="#contacts"
                            onClick={() => onNavChange("contacts")}
                        >
                            See everyone on your board <FiArrowUpRight />
                        </a>
                    </article>
                    <WeekCard
                        thisWeek={thisWeek}
                        upcoming={futureContacts}
                        onAddContact={onAddContact}
                    />
                </section>
    );
};

export default FollowUps;
