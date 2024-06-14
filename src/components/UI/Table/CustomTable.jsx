const CustomTable = ({ data, type }) => {
  const columns =
    type === 'controller'
      ? [
          {
            Header: 'Timestamp',
            accessor: 'createAt',
          },
          {
            Header: 'Device Name',
            accessor: 'deviceName',
          },
          {
            Header: 'Value',
            accessor: 'value',
          },
        ]
      : [
          {
            Header: 'Timestamp',
            accessor: 'createAt',
          },
          {
            Header: 'Sensor type',
            accessor: 'sensorType',
          },
          {
            Header: 'Value',
            accessor: 'value',
          },
        ];

  return (
    <table className="w-full border border-primary-500 bg-main-100 font-mono text-sm tracking-tight">
      <thead className="border border-primary-500 text-base font-bold text-primary-600">
        <tr className="">
          {columns.map((column) => (
            <th className=" border border-primary-500" key={column.accessor}>
              {column.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center text-primary-500  ">
        <tr>
          {columns.map((column) => (
            <td className="border border-primary-500" key={column.accessor}>
              {data[column.accessor]}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default CustomTable;
