import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiX } from "react-icons/fi";
import { stageList } from "../../data/contacts.js";
import { isoDate } from "../../utils/dates.js";
import styles from "./styles.module.css";

const ContactModal = ({ contact, onClose, onSave }) => {
    const isExisting = Boolean(contact?.name);
    const [form, setForm] = useState(
        () =>
            contact || {
                id: `c-${Date.now()}`,
                name: "",
                role: "",
                company: "",
                email: "",
                phone: "",
                stage: "New",
                tags: [],
                lastContact: isoDate(),
                nextFollowUp: isoDate(3),
                owner: "You",
                notes: "",
                avatar: "",
                color: "mint",
            },
    );
    const [tagsText, setTagsText] = useState((contact?.tags || []).join(", "));
    const setField = (event) =>
        setForm((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));

    const submit = (event) => {
        event.preventDefault();
        onSave({
            ...form,
            tags: tagsText
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        });
        onClose();
    };

    return (
        <div
            className={`${styles.root} modal-scrim`}
            role="presentation"
            onMouseDown={(event) =>
                event.target === event.currentTarget && onClose()
            }
        >
            <section
                className="contact-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
            >
                <div className="modal-heading">
                    <div>
                        <span className="eyebrow">
                            {isExisting
                                ? "CONTACT PROFILE"
                                : "NEW RELATIONSHIP"}
                        </span>
                        <h2 id="contact-modal-title">
                            {isExisting
                                ? "A little context goes a long way."
                                : "Add someone to your board."}
                        </h2>
                    </div>
                    <button
                        type="button"
                        className="icon-button close-button"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <FiX />
                    </button>
                </div>
                <form onSubmit={submit}>
                    <div className="modal-fields">
                        <label className="field full-field">
                            Full name
                            <input
                                name="name"
                                value={form.name}
                                onChange={setField}
                                required
                                placeholder="Name"
                            />
                        </label>
                        <label className="field">
                            Role
                            <input
                                name="role"
                                value={form.role}
                                onChange={setField}
                                placeholder="What they do"
                            />
                        </label>
                        <label className="field">
                            Company
                            <input
                                name="company"
                                value={form.company}
                                onChange={setField}
                                placeholder="Where they work"
                            />
                        </label>
                        <label className="field">
                            Email
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={setField}
                                placeholder="name@company.com"
                            />
                        </label>
                        <label className="field">
                            Phone
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={setField}
                                placeholder="Optional"
                            />
                        </label>
                        <label className="field">
                            Relationship stage
                            <select
                                name="stage"
                                value={form.stage}
                                onChange={setField}
                            >
                                {stageList.map((stage) => (
                                    <option key={stage}>{stage}</option>
                                ))}
                            </select>
                        </label>
                        <label className="field">
                            Next follow-up
                            <input
                                name="nextFollowUp"
                                type="date"
                                value={form.nextFollowUp}
                                onChange={setField}
                            />
                        </label>
                        <label className="field full-field">
                            Tags
                            <input
                                value={tagsText}
                                onChange={(event) =>
                                    setTagsText(event.target.value)
                                }
                                placeholder="Design, Referral"
                            />
                        </label>
                        <label className="field full-field">
                            A note to remember
                            <textarea
                                name="notes"
                                rows="3"
                                value={form.notes}
                                onChange={setField}
                                placeholder="What would be useful to remember next time?"
                            />
                        </label>
                    </div>
                    <div className="modal-actions">
                        <span className="save-hint">
                            <FiCheck aria-hidden="true" /> Saved to this browser
                        </span>
                        <div>
                            <button
                                type="button"
                                className="button button-quiet"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="button button-primary"
                            >
                                {isExisting ? "Save changes" : "Add contact"}{" "}
                                <FiArrowUpRight />
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ContactModal;
