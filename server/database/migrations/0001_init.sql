-- Migration number: 0001 	 2025-03-17T14:53:05.868Z
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS lookup (id INTEGER PRIMARY KEY, hash TEXT, created_at INTEGER);