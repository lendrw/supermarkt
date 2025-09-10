export const safeRequest = async <T>(
  fn: () => Promise<T>,
  context: string
): Promise<T | null> => {
  try {
    return await fn();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error in ${context}: ${err.message}`);
    } else {
      console.error(`Error in ${context}:`, err);
    }
    return null;
  }
};
