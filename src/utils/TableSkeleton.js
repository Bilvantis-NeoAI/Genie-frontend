// TableSkeleton.js
import React from 'react';
import ShimmerLoader from './ShimmerLoader';

const TableSkeleton = () => {
  // Adjust the number of rows as needed
  const numberOfRows = 5;
  return (
    <tbody>
      {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {/* Adjust cell widths to line up with your actual table headers */}
          <td style={{ width: "3%" }}>
            <ShimmerLoader width="20px" height="20px" />
          </td>
          <td style={{ width: "15%" }}>
            <ShimmerLoader width="90%" height="20px" />
          </td>
          <td style={{ width: "10%" }}>
            <ShimmerLoader width="80%" height="20px" />
          </td>
          <td>
            <ShimmerLoader width="90%" height="20px" />
          </td>
          <td style={{ width: "18%" }}>
            <ShimmerLoader width="90%" height="20px" />
          </td>
          <td>
            <ShimmerLoader width="90%" height="20px" />
          </td>
          <td>
            <ShimmerLoader width="90%" height="20px" />
          </td>
          <td style={{ width: "10%" }}>
            <ShimmerLoader width="40px" height="20px" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;
