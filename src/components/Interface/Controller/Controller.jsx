import Device from './Device'
const Controller = ( ) => {
    const renderDevice = (number) => {
        const devices = []
        for (let i = 1; i <= number; i++) devices.push(i)

        return devices.map((item, index) => {
            return (
                <Device
                    key={index}
                    device={{
                        name: `Device ${item}`,
                        index: item,
                    }}
                />
            )
        })
    }

    return (
        <>  
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 m-3">
                {renderDevice(8)}
            </div>
        </>
    )
}

export default Controller