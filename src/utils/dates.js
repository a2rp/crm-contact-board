const today = new Date();

export const currentYear = today.getFullYear();
export const dateToday = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
});

export const formatIsoDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const isoDate = (offset = 0) => {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    return formatIsoDate(date);
};

export const dateLabel = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

export const relativeDate = (date) => {
    const days = Math.round(
        (new Date(`${date}T12:00:00`) - new Date(`${isoDate()}T12:00:00`)) /
            86400000,
    );
    if (days < 0) return `${Math.abs(days)}d overdue`;
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `In ${days} days`;
};
