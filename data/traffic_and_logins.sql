-- =========================================================================
-- OFFICIUM SUPREMUM: CENTRAL AUDIT & TRAFFIC DATABASE AUTO-EXPORT
-- File: data/traffic_and_logins.sql
-- Generated at: 2026-10-16T18:29:19.094Z
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
INSERT INTO users (uid, email, display_name, role, roll_number, created_at, last_login) VALUES ('admin-palakjha82@gmail.com', 'palakjha82@gmail.com', 'Palak Jha', 'admin', 'OS-ADMIN', '2026-10-16T18:07:25.685Z', '2026-10-16T18:07:25.685Z') ON CONFLICT (uid) DO UPDATE SET last_login = EXCLUDED.last_login;
INSERT INTO users (uid, email, display_name, role, roll_number, created_at, last_login) VALUES ('admin-shiwangit78@gmail.com', 'shiwangit78@gmail.com', 'Shiwangi', 'admin', 'OS-ADMIN', '2026-10-16T18:04:38.169Z', '2026-10-16T18:04:38.169Z') ON CONFLICT (uid) DO UPDATE SET last_login = EXCLUDED.last_login;
INSERT INTO users (uid, email, display_name, role, roll_number, created_at, last_login) VALUES ('admin-osupremum@gmail.com', 'osupremum@gmail.com', 'Officium Supremum', 'admin', 'OS-ADMIN', '2026-10-16T18:04:31.839Z', '2026-10-16T18:04:31.839Z') ON CONFLICT (uid) DO UPDATE SET last_login = EXCLUDED.last_login;
INSERT INTO users (uid, email, display_name, role, roll_number, created_at, last_login) VALUES ('admin-himthakur5417@gmail.com', 'himthakur5417@gmail.com', 'Himanshu Thakur', 'admin', 'OS-ADMIN', '2026-10-16T18:04:25.526Z', '2026-10-16T18:04:25.526Z') ON CONFLICT (uid) DO UPDATE SET last_login = EXCLUDED.last_login;

-- LOGIN & SECURITY AUDIT LOGS
INSERT INTO login_logs (id, email, role, status, ip, user_agent, timestamp) VALUES ('log-1792175245675-3x71j', 'osupremum@gmail.com', 'admin', 'success', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', '2026-10-16T18:27:25.675Z');
INSERT INTO login_logs (id, email, role, status, ip, user_agent, timestamp) VALUES ('log-1792174045684-t8hlc', 'palakjha82@gmail.com', 'admin', 'success', '::1', 'Web Client', '2026-10-16T18:07:25.684Z');
INSERT INTO login_logs (id, email, role, status, ip, user_agent, timestamp) VALUES ('log-1792173878168-5w33c', 'shiwangit78@gmail.com', 'admin', 'success', '::1', 'Web Client', '2026-10-16T18:04:38.168Z');
INSERT INTO login_logs (id, email, role, status, ip, user_agent, timestamp) VALUES ('log-1792173871838-oiub4', 'osupremum@gmail.com', 'admin', 'success', '::1', 'Web Client', '2026-10-16T18:04:31.838Z');
INSERT INTO login_logs (id, email, role, status, ip, user_agent, timestamp) VALUES ('log-1792173865526-7288a', 'himthakur5417@gmail.com', 'admin', 'success', '::1', 'Web Client', '2026-10-16T18:04:25.526Z');

-- WEBSITE TRAFFIC & VISITOR ACTIVITY
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792175359093-d4s3y', '/contact', NULL, 'guest', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', 'http://localhost:3000/admin', '2026-10-16T18:29:19.093Z');
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792175345569-52x39', '/', NULL, 'guest', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', 'http://localhost:3000/admin', '2026-10-16T18:29:05.569Z');
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792175245714-ao5ww', '/admin', NULL, 'guest', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', NULL, '2026-10-16T18:27:25.714Z');
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792175218741-ma2z2', '/admin/login', NULL, 'guest', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', NULL, '2026-10-16T18:26:58.741Z');
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792175215819-91lcb', '/', NULL, 'guest', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', NULL, '2026-10-16T18:26:55.819Z');
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792175210930-xo004', '/', 'user@officium.academy', 'user', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', NULL, '2026-10-16T18:26:50.930Z');
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792175190443-d0378', '/', NULL, 'guest', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', NULL, '2026-10-16T18:26:30.443Z');
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792175179394-72x6q', '/admin/login', NULL, 'guest', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', NULL, '2026-10-16T18:26:19.394Z');
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792175179283-yole8', '/admin', NULL, 'guest', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36', NULL, '2026-10-16T18:26:19.283Z');
INSERT INTO traffic_logs (id, path, user_email, role, ip, user_agent, referrer, timestamp) VALUES ('trf-1792174955393-yvosl', '/', 'himthakur5417@gmail.com', 'admin', '::1', 'curl/8.7.1', 'direct', '2026-10-16T18:22:35.393Z');
