export const checkVersion = (userVersion: string, latestVersion: string) => {
  const lVersion = latestVersion.split('.').map(Number);
  const uVersion = userVersion.split('.').map(Number);

  for (let i = 0; i < Math.max(lVersion.length, uVersion.length); i++) {
    const uVal = uVersion[i] ?? 0; // Default to 0 if undefined
    const lVal = lVersion[i] ?? 0;

    if (uVal > lVal) return true; // userVersion is newer
    if (uVal < lVal) return false; // userVersion is older
  }
};
