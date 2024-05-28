const Window = ({ label, children }) => {
  return (
    <div className="shadow-window rounded bg-main-300 h-full overflow-auto no-scrollbar">
      <div className="sticky top-0 z-20 px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full ">
        {label}
      </div>
      {children}
    </div>
  );
};

export default Window;
