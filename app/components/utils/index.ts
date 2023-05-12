export const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(0)} MB`;
    return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
  };
  