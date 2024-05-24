import CustomChart from '../../UI/Chart/CustomChart'
import { sensorStyleKit } from '../Sensors/Sensor'

const ChartPortal = ({stationType, data}) => {
    if (!data || !stationType) return

    const chartData = {
        labels : data.map(item => new Date(item.timestamp).toLocaleString()),
        datasets: [
            {
                label: 'Sensor Data',
                data: data.map((item) => item.value),
                fill: true,
                backgroundColor: sensorStyleKit(stationType, 'chart-background'),
                borderColor: sensorStyleKit(stationType, 'chart-border')
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled:true,
            },
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: `VALUE (unit)`,
                    font: {
                        size: 12,
                        weight: 700,
                    },
                    color: '#EDF1D6',
                },
                ticks:{
                    display:false,
                    font:{
                        size:12,
                    },
                }
            },
            x: {
                time: {
                    unit: 'second'
                },
                title: {
                    display: true,
                    text: 'TIMESTAMP',
                    font: {
                        size: 12,
                        weight: 700,
                    },
                    color: '#EDF1D6',
                },
                ticks:{
                    display:false,
                    font:{
                        size:12,
                    },
                }
            },
        },
    }

    return (
        
                <>
                    <p className={`font-bold text-lg uppercase ${sensorStyleKit(stationType,'text', 0)}`}>{stationType} sensor history</p>
                    <CustomChart data={chartData} options={chartOptions} />
                </>
        
    )
}

export default ChartPortal
