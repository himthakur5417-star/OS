-- =========================================================================
-- OFFICIUM SUPREMUM: CENTRAL AUDIT & TRAFFIC DATABASE AUTO-EXPORT
-- File: data/traffic_and_logins.sql
-- =========================================================================

CREATE TABLE IF NOT EXISTS users (
  uid VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255),
  display_name VARCHAR(255),
  role VARCHAR(50),
  roll_number VARCHAR(100),
  created_at TIMESTAMP,
  last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS login_logs (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255),
  role VARCHAR(50),
  status VARCHAR(50),
  ip VARCHAR(100),
  user_agent TEXT,
  timestamp TIMESTAMP
);

CREATE TABLE IF NOT EXISTS traffic_logs (
  id VARCHAR(255) PRIMARY KEY,
  path VARCHAR(255),
  user_email VARCHAR(255),
  role VARCHAR(50),
  ip VARCHAR(100),
  user_agent TEXT,
  referrer VARCHAR(255),
  timestamp TIMESTAMP
);

-- USER DIRECTORY

-- LOGIN & SECURITY AUDIT LOGS

-- WEBSITE TRAFFIC & VISITOR ACTIVITY
