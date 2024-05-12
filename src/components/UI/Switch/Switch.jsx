import {default as ReactSwitch} from 'react-switch'

const Switch = ({onChange, checked, isEnabled}) => {
    return (
        <ReactSwitch
            onChange={onChange}
            checked={checked}
            disabled={!isEnabled}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor='#5D9C59'
            offColor='#DF2E38'
            className='mySwitch '
            height={24}
            handleDiameter={18}
        />
    )

}


export default Switch