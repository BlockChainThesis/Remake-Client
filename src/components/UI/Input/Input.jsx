import classes from './Input.module.css'


const Input = ({label, ...attributes}) => (
    <div className={classes.item}>
        <input className={`
            tablet:py-2 
            tablet:text-lg 
            tablet:px-4

            desktop:py-4 
            desktop:text-2xl 
            desktop:px-5
            rounded-lg font-mono
            w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none`}
            {...attributes}
        />
        <label className="
            tablet:py-2 
            tablet:text-lg 
            tablet:px-4
            
            desktop:py-4 
            desktop:text-2xl 
            desktop:px-5
            opacity-70 pointer-events-none
            transform transition-all duration-100 
            absolute py-2 px-2.5 font-semibold text-main-300 text-sm
            "
        >{label}</label>
    </div>

)


export default Input