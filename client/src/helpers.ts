export const toDataURL = (data: string): string | undefined => {
  if (!data) return undefined;

  return `data:image/svg+xml;base64,${data}`;
};
