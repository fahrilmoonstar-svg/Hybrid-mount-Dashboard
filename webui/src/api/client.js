/* SPDX-License-Identifier: GPL-3.0-only */

// API client untuk komunikasi dengan backend
// (Saat ini dummy — nanti bisa diintegrasikan dengan server nyata)

export async function fetchModules() {
  // Simulasi fetch dari API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'zygisk_next', name: 'Zygisk Next', version: 'v1.1.0', status: 'active', author: 'Dr-TSNG' },
        { id: 'play_integrity_fix', name: 'Play Integrity Fix', version: 'v15.9', status: 'active', author: 'chiteroman' },
        { id: 'systemless_hosts', name: 'Systemless Hosts', version: 'v1.0', status: 'inactive', author: 'topjohnwu' },
      ]);
    }, 500);
  });
}

export async function fetchBlacklist() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['malware_mod', 'bootloop_mod']);
    }, 500);
  });
}

export async function toggleBlacklist(moduleId) {
  // Simulasi POST ke API
  console.log(`Toggling blacklist for: ${moduleId}`);
  return { success: true };
}
