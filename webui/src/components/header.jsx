/* SPDX-License-Identifier: GPL-3.0-only */

import styles from './Header.module.css';

function Header() {
  return (
    <header class={styles.header}>
      <div class={styles.logo}>
        <span class={styles.icon}>🔧</span>
        <h1>Hybrid Mount</h1>
        <span class={styles.badge}>v6.0.0</span>
      </div>
      <nav class={styles.nav}>
        <a href="#modules">Modules</a>
        <a href="#blacklist">Blacklist</a>
        <a href="#settings">Settings</a>
      </nav>
    </header>
  );
}

export default Header;