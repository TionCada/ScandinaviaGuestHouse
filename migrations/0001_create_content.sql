-- The site's editable content: one JSON document (texts in both languages and links to the
-- photos and the video), edited in the admin panel
CREATE TABLE content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT
);

-- The versions before the last few saves, so a mistake can be undone by hand
CREATE TABLE content_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    saved_at TEXT NOT NULL,
    saved_by TEXT
);
