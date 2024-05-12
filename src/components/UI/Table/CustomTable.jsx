const CustomTable = ({data, type}) => {
    const columns = type === 'controller' ? [
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
          }
    ] : [
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
    ]
    

    return (
        <table className="text-sm w-full font-mono border border-primary-500 bg-main-100 tracking-tight">
            <thead className="text-base font-bold text-primary-600 border border-primary-500">
                <tr className="">
                    {columns.map(column => <th className=" border border-primary-500" key={column.accessor}>{column.Header}</th> )}
                </tr>
            </thead>
            <tbody className="text-center text-primary-500  ">
                <tr >
                    {columns.map(column => <td className="border border-primary-500" key={column.accessor}>{data[column.accessor]}</td>)}
                </tr>
            </tbody>
        </table>
    )
}

export default CustomTable