import CustomChart from '../../UI/Chart/CustomChart'
import { useSelector } from 'react-redux'
import { sensorStyleKit } from '../Sensors/Sensor'
import { sensorType } from '../Sensors/Sensor'

const ChartPortal = ({stationType, data}) => {
    const activeSensor = useSelector(state => state.dashboard.sensorActiveID)
    if (!data || !stationType) return
    const chartData = {
        labels: [0, 10, 15, 20],
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
                    color: '#285430',
                },
                ticks:{
                    display:false,
                    font:{
                        size:12,
                    },
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'TIMESTAMP',
                    font: {
                        size: 12,
                        weight: 700,
                    },
                    color: '#285430',
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
