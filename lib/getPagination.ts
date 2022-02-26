const getPagination = ({ currentPage, totalPages }: {
  currentPage: number;
  totalPages: number;
}): string => {
  if (totalPages < 1) {
    throw new Error('totalPages must be at least 1.');
  }
  if (currentPage < 1) {
    throw new Error('currentPage must be at least 1.');
  }
  if (currentPage > totalPages) {
    throw new Error('currentPage must be lower or equal to totalPages.');
  }

  const pages = [];

  for (let page = 1; page <= totalPages; page++) {
    if (page === currentPage) {
      pages.push(`(${page})`);
    } else {
      pages.push(page);
    }
  }

  return pages.join(' ');
};

export { getPagination };
