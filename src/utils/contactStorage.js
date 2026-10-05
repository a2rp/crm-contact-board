import { starterContacts } from "../data/contacts.js";

export const readContacts = () => {
    try {
        const saved = localStorage.getItem("kinfield-contacts");
        return saved ? JSON.parse(saved) : starterContacts;
    } catch {
        return starterContacts;
    }
};
