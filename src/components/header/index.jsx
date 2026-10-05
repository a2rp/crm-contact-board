import { useRef, useState } from "react";
import { FiBell, FiChevronDown, FiSearch } from "react-icons/fi";
import styles from "./styles.module.css";

function Header({ activeNav, contactsCount, onNavChange, search, onSearchChange, onToast }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef(null);

    return (
            <header className={`${styles.root} topbar`}>
                <a
                    href="#overview"
                    className="brand-lockup"
                    onClick={() => onNavChange("overview")}
                    aria-label="Kinfield home"
                >
                    <span className="brand-mark">
                        <i />
                        <i />
                        <i />
                        <i />
                    </span>
                    <span className="brand-name">
                        kinfield<span className="brand-dot">.</span>
                    </span>
                </a>
                <nav className="main-nav" aria-label="Main navigation">
                    <a
                        href="#overview"
                        className={activeNav === "overview" ? "is-active" : ""}
                        onClick={() => onNavChange("overview")}
                    >
                        Overview
                    </a>
                    <a
                        href="#contacts"
                        className={activeNav === "contacts" ? "is-active" : ""}
                        onClick={() => onNavChange("contacts")}
                    >
                        Contacts{" "}
                        <span className="nav-count">{contactsCount}</span>
                    </a>
                    <a
                        href="#follow-ups"
                        className={
                            activeNav === "follow-ups" ? "is-active" : ""
                        }
                        onClick={() => onNavChange("follow-ups")}
                    >
                        Follow-ups
                    </a>
                </nav>
                <div className="topbar-tools">
                    <label
                        className={`search-box ${searchOpen ? "search-open" : ""}`}
                        onClick={() => {
                            setSearchOpen(true);
                            requestAnimationFrame(() =>
                                searchRef.current?.focus(),
                            );
                        }}
                    >
                        <FiSearch aria-hidden="true" />
                        <input
                            ref={searchRef}
                            aria-label="Search contacts"
                            placeholder="Search people, companies..."
                            value={search}
                            onChange={(event) => onSearchChange(event.target.value)}
                            onBlur={() => {
                                if (!search) setSearchOpen(false);
                            }}
                        />
                        <kbd>âŒ˜ K</kbd>
                    </label>
                    <button
                        className="icon-button notification-button"
                        type="button"
                        aria-label="Show reminders"
                        onClick={() => {
                            document
                                .querySelector("#follow-ups")
                                ?.scrollIntoView({ behavior: "smooth" });
                            onNavChange("follow-ups");
                        }}
                    >
                        <FiBell />
                        <i />
                    </button>
                    <span className="topbar-rule" />
                    <button
                        className="profile-button"
                        type="button"
                        onClick={() =>
                            onToast("You are viewing your personal workspace")
                        }
                        aria-label="Your profile"
                    >
                        <span className="profile-avatar">AR</span>
                        <span className="profile-name">Ashish</span>
                        <FiChevronDown />
                    </button>
                </div>
            </header>
    );
}

export default Header;
