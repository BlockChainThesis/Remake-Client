import classes from './Input.module.css';

const Input = ({ label, ...attributes }) => (
  <div className={classes.item}>
    <input
      className={`
            w-full
            rounded-lg bg-main-100 px-2.5
            py-2 font-mono font-semibold leading-tight text-main-400 focus:outline-none`}
      {...attributes}
    />
    <label
      className="
            pointer-events-none absolute
            transform px-2.5 py-2 
            text-sm font-semibold text-main-300 opacity-70 transition-all duration-100
            "
    >
      {label}
    </label>
  </div>
);

export default Input;
