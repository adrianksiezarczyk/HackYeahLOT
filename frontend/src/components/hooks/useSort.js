import { useState } from 'react';

const useSort = () => {
  const [{ sortColumnName, descending }, setSorting] = useState({
    sortColumnName: 'id',
    descending: true
  });

  const modifySorting = columnName => {
    if (columnName === sortColumnName)
      setSorting({ sortColumnName: columnName, descending: !descending });
    else setSorting({ sortColumnName: columnName, descending: true });
  };

  return {
    sortColumnName,
    descending,
    modifySorting
  };
};

export default useSort;
