import { useEffect, useMemo, useState } from "react";
import {
    dateToday,
    formatIsoDate,
    isoDate,
} from "./utils/dates.js";
import { readContacts } from "./utils/contactStorage.js";
import Footer from "./components/Footer/index.jsx";
import ContactModal from "./components/ContactModal/index.jsx";
import Header from "./components/Header/index.jsx";
import Overview from "./components/Overview/index.jsx";
import ContactBoard from "./components/ContactBoard/index.jsx";
import FollowUps from "./components/FollowUps/index.jsx";
import ClosingNote from "./components/ClosingNote/index.jsx";
import Toast from "./components/Toast/index.jsx";
import styles from "./App.module.css";

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
        <div className={`${styles.root} app-shell`}>
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

                <ContactBoard
                    filteredContacts={filteredContacts}
                    activeStage={activeStage}
                    onStageChange={setActiveStage}
                    view={view}
                    onViewChange={setView}
                    onExport={exportContacts}
                    onOpenContact={openContact}
                    onAddToStage={(stage) => {
                        setModalContact({
                            stage,
                            id: "c-" + Date.now(),
                            name: "",
                            role: "",
                            company: "",
                            email: "",
                            phone: "",
                            tags: [],
                            nextFollowUp: isoDate(3),
                            lastContact: isoDate(),
                            notes: "",
                            owner: "You",
                            color: "mint",
                        });
                        setModalOpen(true);
                    }}
                    onToast={setToast}
                />

                <FollowUps
                    upcoming={upcoming}
                    thisWeek={thisWeek}
                    onOpenContact={openContact}
                    onMarkDone={markDone}
                    onToast={setToast}
                    onNavChange={setActiveNav}
                    onAddContact={() => {
                        setModalContact(null);
                        setModalOpen(true);
                    }}
                />

                <ClosingNote />
                <Footer />
            </main>

            {modalOpen && (
                <ContactModal
                    contact={modalContact}
                    onClose={() => setModalOpen(false)}
                    onSave={saveContact}
                />
            )}
            {toast && <Toast message={toast} />}
        </div>
    );
}

export default App;
