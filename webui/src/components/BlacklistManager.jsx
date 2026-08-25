/* SPDX-License-Identifier: GPL-3.0-only */

import styles from './BlacklistManager.module.css';

function BlacklistManager({ blacklist, onRemove }) {
  return (
    <section class={styles.section}>
      <h2 class={styles.title}>🚫 Global Blacklist</h2>
      {blacklist.length === 0 ? (
        <p class={styles.empty}>No modules blacklisted.</p>
      ) : (
        <ul class={styles.list}>
          {blacklist.map((id) => (
            <li key={id} class={styles.item}>
              <span class={styles.id}>{id}</span>
              <button
                class={styles.removeBtn}
                onClick={() => onRemove(id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default BlacklistManager;