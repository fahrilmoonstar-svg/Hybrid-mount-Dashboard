/* SPDX-License-Identifier: GPL-3.0-only */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #161b22;
  border-bottom: 1px solid #30363d;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  font-size: 1.5rem;
}

.logo h1 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #f0f6fc;
}

.badge {
  background: #238636;
  color: #fff;
  padding: 0.1rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: #8b949e;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.nav a:hover {
  color: #f0f6fc;
}