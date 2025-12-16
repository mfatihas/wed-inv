-- Guestbook messages table
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for ordering messages by creation date
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
