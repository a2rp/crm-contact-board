import { useEffect, useRef, useState } from "react";
import { FiBell, FiChevronDown, FiSearch } from "react-icons/fi";
import styles from "./styles.module.css";
import appStyles from "../../App.module.css";

const Header = ({ activeNav, contactsCount, onNavChange, search, onSearchChange, onToast }) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const searchRef = useRef(null);
    const profileMenuRef = useRef(null);

    useEffect(() => {
        if (!profileMenuOpen) return undefined;

        const closeOnOutsidePointer = (event) => {
            if (!profileMenuRef.current?.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setProfileMenuOpen(false);
        };

        document.addEventListener("pointerdown", closeOnOutsidePointer);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsidePointer);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [profileMenuOpen]);

    return (
            <header className={styles.topbar}>
                <a
                    href="#overview"
                    className={styles["brand-lockup"]}
                    onClick={() => onNavChange("overview")}
                    aria-label="Kinfield home"
                >
                    <span className={styles["brand-mark"]}>
                        <i />
                        <i />
                        <i />
                        <i />
                    </span>
                    <span className={styles["brand-name"]}>
                        kinfield<span className={styles["brand-dot"]}>.</span>
                    </span>
                </a>
                <nav className={styles["main-nav"]} aria-label="Main navigation">
                    <a
                        href="#overview"
                        className={activeNav === "overview" ? styles["is-active"] : undefined}
                        onClick={() => onNavChange("overview")}
                    >
                        Overview
                    </a>
                    <a
                        href="#contacts"
                        className={activeNav === "contacts" ? styles["is-active"] : undefined}
                        onClick={() => onNavChange("contacts")}
                    >
                        Contacts{" "}
                        <span className={styles["nav-count"]}>{contactsCount}</span>
                    </a>
                    <a
                        href="#follow-ups"
                        className={
                            activeNav === "follow-ups" ? styles["is-active"] : undefined
                        }
                        onClick={() => onNavChange("follow-ups")}
                    >
                        Follow-ups
                    </a>
                </nav>
                <div className={styles["topbar-tools"]}>
                    <label
                        className={`${styles["search-box"]} ${searchOpen ? styles["search-open"] : ""}`}
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
                        <kbd>Ctrl + K</kbd>
                    </label>
                    <button
                        className={`${appStyles["icon-button"]} ${styles["notification-button"]}`}
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
                    <span className={styles["topbar-rule"]} />
                    <div className={styles["profile-menu-wrap"]} ref={profileMenuRef}>
                        <button
                            className={styles["profile-button"]}
                            type="button"
                            onClick={() =>
                                setProfileMenuOpen((isOpen) => !isOpen)
                            }
                            aria-label="Your profile"
                            aria-haspopup="menu"
                            aria-expanded={profileMenuOpen}
                            aria-controls="profile-menu"
                        >
                            <span className={styles["profile-avatar"]}>AR</span>
                            <span className={styles["profile-name"]}>Ashish</span>
                            <FiChevronDown />
                        </button>
                        {profileMenuOpen && (
                            <div
                                className={styles["profile-menu"]}
                                id="profile-menu"
                                role="menu"
                                aria-label="Profile menu"
                            >
                                <div className={styles["profile-menu-heading"]}>
                                    <span className={styles["profile-menu-avatar"]}>
                                        AR
                                    </span>
                                    <span className={styles["profile-menu-identity"]}>
                                        <strong>Ashish Ranjan</strong>
                                        <small>Personal workspace</small>
                                    </span>
                                </div>
                                <span
                                    className={styles["profile-menu-divider"]}
                                    aria-hidden="true"
                                />
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                        setProfileMenuOpen(false);
                                        onToast("Personal profile selected");
                                    }}
                                >
                                    My profile
                                </button>
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                        setProfileMenuOpen(false);
                                        onToast("Workspace settings selected");
                                    }}
                                >
                                    Workspace settings
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
    );
};

export default Header;
