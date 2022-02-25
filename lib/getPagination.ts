const getPagination = ({ currentPage, totalPages }: {
  currentPage: number;
  totalPages: number;
}): string => {
  if (currentPage === 1 && totalPages === 1) {
    return '(1)';
  }

  const pages = [];

  for (let page =1; page<=totalPages; page++){
    if (page === currentPage) {
      pages.push(`(${page})`);
    } else {
      pages.push(page);
    }    
  }

  return pages.join(' ');
};

export { getPagination };
