const header = ({ title = "title", buttons = <></> }) => {
  return (
    <div className="p-2 bg-gray-200 dark:bg-[#1a2748] dark:text-white">
      <div className="flex justify-between">
        <h1 className="text-xl">{title}</h1>
        <div className="flex gap-2">{buttons}</div>
      </div>
    </div>
  );
};

export default header;
