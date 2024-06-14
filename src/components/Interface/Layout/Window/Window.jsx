const Window = ({ label, children }) => {
  return (
    <div className="no-scrollbar h-full overflow-auto rounded bg-main-300 shadow-window">
      <div className="sticky top-0 z-20 w-full bg-main-100 px-2 py-1 font-mono font-bold uppercase text-main-300 ">{label}</div>
      {children}
    </div>
  );
};

export default Window;
