const getPaginationForRange = ({ from, to, current }: {
  from: number;
  to: number;
  current: number;
}): string[] => {
  const pages = [];

  for (let page = from; page <= to; page++) {
    if (page === current) {
      pages.push(`(${page})`);
    } else {
      pages.push(`${page}`);
    }
  }

  return pages;
};

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

  if (totalPages <= 7) {
    return getPaginationForRange({ from: 1, to: totalPages, current: currentPage }).join(' ');
  }

  const pages = [];

  if (currentPage < 5) {
    pages.push(...getPaginationForRange({ from: 1, to: 5, current: currentPage }));
    pages.push(`... ${totalPages}`);

    return pages.join(' ');
  }

  if (currentPage > totalPages - 4) {
    pages.push(`1 ...`);
    pages.push(...getPaginationForRange({ from: totalPages - 4, to: totalPages, current: currentPage }));

    return pages.join(' ');
  }

  return `1 ... ${currentPage - 1} (${currentPage}) ${currentPage + 1} ... ${totalPages}`;
};

export { getPagination };
