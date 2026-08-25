/* SPDX-License-Identifier: GPL-3.0-only */

import styles from './StatusBadge.module.css';

const statusMap = {
  active: { label: 'Active', className: styles.active },
  inactive: { label: 'Inactive', className: styles.inactive },
  blocked: { label: '🚫 Blocked', className: styles.blocked },
  error: { label: 'Error', className: styles.error },
};

function StatusBadge({ status }) {
  const { label, className } = statusMap[status] || statusMap.inactive;
  return <span class={`${styles.badge} ${className}`}>{label}</span>;
}

export default StatusBadge;