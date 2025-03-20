-- Migration number: 0004 	 2025-03-20T12:55:12.486Z
CREATE UNIQUE INDEX idx_lookup_hash ON lookup(hash);