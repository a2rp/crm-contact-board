import { useEffect, useMemo, useState } from "react";
import {
    FiArrowDownRight,
    FiArrowUpRight,
    FiCalendar,
    FiCheck,
    FiChevronDown,
    FiChevronRight,
    FiDownload,
    FiFilter,
    FiGrid,
    FiHeart,
    FiMoreHorizontal,
    FiPlus,
    FiSliders,
    FiUsers,
} from "react-icons/fi";
import { stageList } from "./data/contacts.js";
import {
    dateLabel,
    dateToday,
    formatIsoDate,
    isoDate,
    relativeDate,
} from "./utils/dates.js";
import { readContacts } from "./utils/contactStorage.js";
import Avatar from "./components/ContactBoard/Avatar/index.jsx";
import ContactCard from "./components/ContactBoard/ContactCard/index.jsx";
import Footer from "./components/Footer/index.jsx";
import ContactModal from "./components/ContactModal/index.jsx";
import Header from "./components/Header/index.jsx";
import Overview from "./components/Overview/index.jsx";
import "./App.css";

function App() {
    const [contacts, setContacts] = useState(readContacts);
    const [search, setSearch] = useState("");
    const [activeStage, setActiveStage] = useState("All stages");
    const [view, setView] = useState("board");
    const [modalContact, setModalContact] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState("");
    const [activeNav, setActiveNav] = useState("overview");

    useEffect(() => {
        localStorage.setItem("kinfield-contacts", JSON.stringify(contacts));
    }, [contacts]);

    useEffect(() => {
        if (!toast) return undefined;
        const timeout = window.setTimeout(() => setToast(""), 2800);
        return () => window.clearTimeout(timeout);
    }, [toast]);

    const filteredContacts = useMemo(
        () =>
            contacts.filter((contact) => {
                const query = search.toLowerCase().trim();
                const matchesQuery =
                    !query ||
                    [
                        contact.name,
                        contact.company,
                        contact.role,
                        contact.email,
                        ...contact.tags,
                    ]
                        .join(" ")
                        .toLowerCase()
                        .includes(query);
                return (
                    matchesQuery &&
                    (activeStage === "All stages" ||
                        contact.stage === activeStage)
                );
            }),
        [contacts, search, activeStage],
    );

    const dueToday = contacts.filter(
        (contact) => contact.nextFollowUp <= isoDate(),
    ).length;
    const openRelationships = contacts.filter(
        (contact) => contact.stage !== "Customer",
    ).length;
    const thisWeek = contacts.filter((contact) => {
        const days =
            (new Date(`${contact.nextFollowUp}T12:00:00`) -
                new Date(`${isoDate()}T12:00:00`)) /
            86400000;
        return days >= 0 && days <= 7;
    }).length;

    const openContact = (contact) => {
        setModalContact(contact);
        setModalOpen(true);
    };

    const saveContact = (contact) => {
        setContacts((current) => {
            const exists = current.some((item) => item.id === contact.id);
            return exists
                ? current.map((item) =>
                      item.id === contact.id ? contact : item,
                  )
                : [contact, ...current];
        });
        setToast(
            contact.id && contacts.some((item) => item.id === contact.id)
                ? "Contact details saved"
                : "Contact added to your board",
        );
    };

    const markDone = (contact) => {
        const next = new Date(`${isoDate()}T12:00:00`);
        next.setDate(next.getDate() + 7);
        setContacts((current) =>
            current.map((item) =>
                item.id === contact.id
                    ? {
                          ...item,
                          lastContact: isoDate(),
                          nextFollowUp: formatIsoDate(next),
                      }
                    : item,
            ),
        );
        setToast(`Follow-up with ${contact.name.split(" ")[0]} marked done`);
    };

    const exportContacts = () => {
        const headings = [
            "Name",
            "Role",
            "Company",
            "Email",
            "Phone",
            "Stage",
            "Tags",
            "Next follow-up",
        ];
        const rows = contacts.map((contact) => [
            contact.name,
            contact.role,
            contact.company,
            contact.email,
            contact.phone,
            contact.stage,
            contact.tags.join("|"),
            contact.nextFollowUp,
        ]);
        const csv = [headings, ...rows]
            .map((row) =>
                row
                    .map(
                        (value) =>
                            `"${String(value || "").replaceAll('"', '""')}"`,
                    )
                    .join(","),
            )
            .join("\n");
        const url = URL.createObjectURL(
            new Blob([csv], { type: "text/csv;charset=utf-8" }),
        );
        const link = document.createElement("a");
        link.href = url;
        link.download = "kinfield-contacts.csv";
        link.click();
        URL.revokeObjectURL(url);
        setToast("Your contact list is ready");
    };

    const upcoming = [...contacts]
        .sort((a, b) => a.nextFollowUp.localeCompare(b.nextFollowUp))
        .slice(0, 4);
    return (
        <div className="app-shell">
            <Header
                activeNav={activeNav}
                contactsCount={contacts.length}
                onNavChange={setActiveNav}
                search={search}
                onSearchChange={setSearch}
                onToast={setToast}
            />

            <main className="page-content">
                <Overview
                    contacts={contacts}
                    dueToday={dueToday}
                    openRelationships={openRelationships}
                    thisWeek={thisWeek}
                    todayLabel={dateToday}
                    onAddContact={() => {
                        setModalContact(null);
                        setModalOpen(true);
                    }}
                    onToast={setToast}
                />

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
                                        setActiveStage(event.target.value)
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
                                    onClick={() => setView("board")}
                                    aria-label="Board view"
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    type="button"
                                    className={
                                        view === "list" ? "selected" : ""
                                    }
                                    onClick={() => setView("list")}
                                    aria-label="List view"
                                >
                                    <FiSliders />
                                </button>
                            </div>
                            <button
                                className="icon-button export-button"
                                type="button"
                                onClick={exportContacts}
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
                                                    setToast(
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
                                                        onOpen={openContact}
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
                                                onClick={() => {
                                                    setModalContact({
                                                        stage,
                                                        id: `c-${Date.now()}`,
                                                        name: "",
                                                        role: "",
                                                        company: "",
                                                        email: "",
                                                        phone: "",
                                                        tags: [],
                                                        nextFollowUp:
                                                            isoDate(3),
                                                        lastContact: isoDate(),
                                                        notes: "",
                                                        owner: "You",
                                                        color: "mint",
                                                    });
                                                    setModalOpen(true);
                                                }}
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
                                            onClick={() => openContact(contact)}
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

                <section className="bottom-grid" id="follow-ups">
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
                                    setToast(
                                        `${thisWeek} follow-ups are scheduled this week`,
                                    )
                                }
                            >
                                This week <FiChevronDown />
                            </button>
                        </div>
                        <div className="followup-list">
                            {upcoming.map((contact) => (
                                <div className="followup-item" key={contact.id}>
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
                                        onClick={() => openContact(contact)}
                                    >
                                        <strong>{contact.name}</strong>
                                        <span>
                                            {contact.company} <i>Â·</i>{" "}
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
                                        onClick={() => markDone(contact)}
                                        aria-label={`Mark follow-up with ${contact.name} done`}
                                    >
                                        <FiCheck />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <a
                            className="panel-footer-link"
                            href="#contacts"
                            onClick={() => setActiveNav("contacts")}
                        >
                            See everyone on your board <FiArrowUpRight />
                        </a>
                    </article>
                    <article className="week-card">
                        <div className="week-card-top">
                            <span className="week-badge">
                                <FiCalendar /> WEEKLY RHYTHM
                            </span>
                            <span className="week-spark" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                            </span>
                        </div>
                        <div className="week-count">
                            {thisWeek}
                            <span>planned</span>
                        </div>
                        <p>
                            A good week starts with a small, thoughtful hello.
                        </p>
                        <div className="week-bottom">
                            <span>
                                <i /> Your next touch is{" "}
                                {upcoming[0]
                                    ? relativeDate(
                                          upcoming[0].nextFollowUp,
                                      ).toLowerCase()
                                    : "all set"}
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    setModalContact(null);
                                    setModalOpen(true);
                                }}
                                aria-label="Create a reminder"
                            >
                                <FiPlus />
                            </button>
                        </div>
                    </article>
                </section>

                <div className="closing-note">
                    <span className="closing-icon">
                        <FiHeart />
                    </span>
                    <p>
                        Good relationships are built in the little moments.{" "}
                        <strong>Keep showing up.</strong>
                    </p>
                    <span className="closing-stamp">
                        KINFIELD NOTES <i>âœ³</i> NO. 01
                    </span>
                </div>
                <Footer />
            </main>

            {modalOpen && (
                <ContactModal
                    contact={modalContact}
                    onClose={() => setModalOpen(false)}
                    onSave={saveContact}
                />
            )}
            {toast && (
                <div className="toast-message" role="status">
                    <span>
                        <FiCheck />
                    </span>
                    {toast}
                </div>
            )}
        </div>
    );
}

export default App;
