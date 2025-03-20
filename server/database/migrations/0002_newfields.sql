-- Migration number: 0002 	 2025-03-20T12:34:37.662Z
ALTER TABLE lookup ADD COLUMN message TEXT;
ALTER TABLE lookup ADD COLUMN encrypted TEXT;