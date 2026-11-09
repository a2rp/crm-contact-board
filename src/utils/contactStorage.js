import { starterContacts } from "../data/contacts.js";
import { isoDate } from "./dates.js";

const stages = new Set(["New", "Contacted", "Qualified", "Customer"]);
const colors = new Set(["mint", "lavender", "peach", "blue", "yellow"]);

const textValue = (value, maxLength) =>
    typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const isIsoDate = (value) => {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const date = new Date(`${value}T12:00:00`);
    return !Number.isNaN(date.getTime()) &&
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` === value;
};

const normalizeContact = (value, index) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;

    const name = textValue(value.name, 120);
    if (!name) return null;

    const avatar = textValue(value.avatar, 500);
    const publicBase = import.meta.env.BASE_URL;

    return {
        id: textValue(value.id, 120) || `saved-${index}`,
        name,
        role: textValue(value.role, 120),
        company: textValue(value.company, 160),
        email: textValue(value.email, 254),
        phone: textValue(value.phone, 80),
        stage: stages.has(value.stage) ? value.stage : "New",
        tags: Array.isArray(value.tags)
            ? [...new Set(value.tags.map((tag) => textValue(tag, 50)).filter(Boolean))].slice(0, 30)
            : [],
        lastContact: isIsoDate(value.lastContact) ? value.lastContact : isoDate(),
        nextFollowUp: isIsoDate(value.nextFollowUp) ? value.nextFollowUp : isoDate(),
        owner: textValue(value.owner, 120) || "You",
        notes: textValue(value.notes, 5000),
        avatar:
            avatar.startsWith(publicBase) || avatar.startsWith("https://")
                ? avatar
                : "",
        color: colors.has(value.color) ? value.color : "mint",
    };
};

export const readContacts = () => {
    try {
        const saved = localStorage.getItem("kinfield-contacts");
        if (!saved) return starterContacts;

        const contacts = JSON.parse(saved);
        if (!Array.isArray(contacts)) return starterContacts;

        const normalizedContacts = contacts.map(normalizeContact).filter(Boolean);
        const usedIds = new Set();
        return normalizedContacts.map((contact) => {
            let id = contact.id;
            let suffix = 1;
            while (usedIds.has(id)) id = `${contact.id}-${suffix++}`;
            usedIds.add(id);
            return id === contact.id ? contact : { ...contact, id };
        });
    } catch {
        return starterContacts;
    }
};

export const writeContacts = (contacts) => {
    try {
        localStorage.setItem("kinfield-contacts", JSON.stringify(contacts));
        return true;
    } catch {
        return false;
    }
};

export const createContactId = () =>
    globalThis.crypto?.randomUUID?.() ||
    `c-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
