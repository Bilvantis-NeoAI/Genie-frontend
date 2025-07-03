import React, { useState, useMemo } from "react";

const DynamicTable = ({
  data = [],
  columns,
  actions = [],
  emptyMessage = "No Data Found",
  itemsPerPage = 10,
}) => {
  const currentPage=1;

  const tableHeaders = columns || Object.keys(data[0] || {}).map((key) => ({
    label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    accessor: key,
  }));  
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [currentPage, data, itemsPerPage]);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <table className="table table-bordered table-hover" style={{ fontSize: 10, width: "100%" }}>
        <thead className="table-active">
          <tr>
            <th colSpan={columns?.length || 1} style={{ textAlign: "center" }}>
              {emptyMessage}
            </th>
          </tr>
        </thead>
      </table>
    );
  }

  return (
    <div>
      <table className="table table-bordered table-hover" style={{ fontSize: 10, width: "100%" }}>
        <thead className="table-active" style={{ position: "sticky", top: 0, zIndex: 0 }}>
          <tr>
            <th style={{ width: "5%" }}>Sl.N</th>
            {tableHeaders.map((col) => (
              <th key={col.accessor}>{col.label}</th>
            ))}
            {actions.length > 0 && <th style={{ width: "10%" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={row.id || index}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              {tableHeaders.map((col) => (
                <td key={col.accessor}>{row[col.accessor]}</td>
              ))}
              {actions.length > 0 && (
                <td>
                  {actions.map(({ label, icon, onClick, title }, i) => (
                    <button
                      key={i}
                      className="btn"
                      title={title}
                      onClick={() => onClick(row)}
                      style={{ border: 0 }}
                    >
                      <img src={icon} alt={label} />
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
