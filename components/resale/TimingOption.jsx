const TimingOption = ({ selected, setSelected, handleChange, timing }) => {
  return (
    <button
      className={`flex flex-col justify-center sm:py-2 py-1 items-center max-w-[95px] rounded-md cursor-pointer ${
        selected
          ? `bg-gray-100-lime text-black border-black border-2`
          : ` border-gray-400 border-2 text-gray-800`
      } w-[100px]`}
      onClick={(e) => {
        handleChange(e);
        setSelected(timing.name);
      }}
      id="time"
      value={timing.time}
    >
      <span className="font-medium text-md">{timing.name}</span>
      <span className="font-thin text-xs">{timing.time} </span>
    </button>
  );
};

export default TimingOption;
