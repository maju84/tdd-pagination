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

  if (totalPages > 7) {

    if (currentPage < 5){
    
      for (let page = 1; page <= 5; page++) {
        if (page === currentPage) {
          pages.push(`(${page})`);
        } else {
          pages.push(page);
        }
      }

      pages.push(`... ${totalPages}`);
      return pages.join(' ');

    }

    if (currentPage > totalPages-4 ){
    
      pages.push(`1 ...`); 
      for (let page = totalPages-4; page <= totalPages; page++) {
        if (page === currentPage) {
          pages.push(`(${page})`);
        } else {
          pages.push(page);
        }
      }
      
      return pages.join(' ');

    }

    return `1 ... ${currentPage-1} (${currentPage}) ${currentPage+1} ... ${totalPages}`;

  }
  
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
