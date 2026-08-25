/* SPDX-License-Identifier: GPL-3.0-only */

import StatusBadge from './StatusBadge';
import styles from './ModuleCard.module.css';

function ModuleCard({ module, isBlacklisted, onToggleBlacklist }) {
  return (
    <div class={`${styles.card} ${isBlacklisted ? styles.blacklisted : ''}`}>
      <div class={styles.header}>
        <h3 class={styles.name}>{module.name}</h3>
        <StatusBadge status={module.status} />
      </div>
      <div class={styles.details}>
        <span class={styles.id}>ID: {module.id}</span>
        <span class={styles.version}>v{module.version}</span>
        <span class={styles.author}>by {module.author}</span>
      </div>
      <button
        class={`${styles.toggleBtn} ${isBlacklisted ? styles.remove : styles.add}`}
        onClick={() => onToggleBlacklist(module.id)}
      >
        {isBlacklisted ? '✅ Remove from Blacklist' : '🚫 Add to Blacklist'}
      </button>
    </div>
  );
}

export default ModuleCard;