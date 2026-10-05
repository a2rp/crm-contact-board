import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import FollowUpItem from "./followUpItem/index.jsx";
import WeekCard from "./weekCard/index.jsx";
import styles from "./styles.module.css";

const FollowUps = ({ upcoming, thisWeek, onOpenContact, onMarkDone, onToast, onNavChange, onAddContact }) => {
    return (
                <section className={`${styles.root} bottom-grid`} id="follow-ups">
                    <article className="followup-panel">
                        <div className="panel-heading">
                            <div>
                                <div className="eyebrow">
                                    MAKE THE NEXT MOVE
                                </div>
                                <h2>
                                    Coming up
                                    <span className="heading-period">.</span>
                                </h2>
                            </div>
                            <button
                                type="button"
                                className="text-button"
                                onClick={() =>
                                    onToast(
                                        `${thisWeek} follow-ups are scheduled this week`,
                                    )
                                }
                            >
                                This week <FiChevronDown />
                            </button>
                        </div>
                        <div className="followup-list">
                            {upcoming.map((contact) => (
                                <FollowUpItem
                                    key={contact.id}
                                    contact={contact}
                                    onOpenContact={onOpenContact}
                                    onMarkDone={onMarkDone}
                                />
                            ))}
                        </div>
                        <a
                            className="panel-footer-link"
                            href="#contacts"
                            onClick={() => onNavChange("contacts")}
                        >
                            See everyone on your board <FiArrowUpRight />
                        </a>
                    </article>
                    <WeekCard thisWeek={thisWeek} upcoming={upcoming} onAddContact={onAddContact} />
                </section>
    );
};

export default FollowUps;
