export function calculatePages(
  limit: number,
  offset: number,
  total: number,
): { totalPages: number; currentPage: number } {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return {
    totalPages: totalPages > 0 ? totalPages : 1,
    currentPage: currentPage > totalPages ? totalPages : currentPage,
  };
}
