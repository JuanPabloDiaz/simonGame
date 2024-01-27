import { forwardRef } from "react";

const GameBtn = forwardRef(({ color, border, bg, onClick }, ref) => (
  <button
    color={color}
    className={`${border} ${bg} m-2 h-[175px] w-[175px] duration-200 hover:scale-105 sm:h-[200px] sm:w-[200px]`}
    onClick={onClick}
    ref={ref}
  />
));

export default GameBtn;
