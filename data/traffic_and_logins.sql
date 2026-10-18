-- Officium Supremum Schema for Traffic & Logins
CREATE TABLE IF NOT EXISTS login_logs (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(64) NOT NULL,
  status VARCHAR(32) NOT NULL,
  ip VARCHAR(64),
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS traffic_logs (
  id VARCHAR(64) PRIMARY KEY,
  path VARCHAR(255) NOT NULL,
  user_email VARCHAR(255),
  role VARCHAR(64),
  ip VARCHAR(64),
  user_agent TEXT,
  referrer TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL
);
