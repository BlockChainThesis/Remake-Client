import classes from './Input.module.css';

const Input = ({ label, ...attributes }) => (
  <div className={classes.item}>
    <input
      className={`
            bg-main-100
            rounded-lg font-mono font-semibold
            w-full py-2 px-2.5 text-main-400 leading-tight focus:outline-none`}
      {...attributes}
    />
    <label
      className="
            opacity-70 pointer-events-none
            transform transition-all duration-100 
            absolute py-2 px-2.5 font-semibold text-main-300 text-sm
            "
    >
      {label}
    </label>
  </div>
);

export default Input;
