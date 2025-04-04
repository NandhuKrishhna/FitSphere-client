import { DatePickerInputProps } from "@/types/types";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DatePickerInput: React.FC<DatePickerInputProps> = ({ date, setDate }) => {
  return (
    <div className="relative">
      <DatePicker
        selected={date ? new Date(date) : null}
        onChange={(selectedDate) => setDate(selectedDate ? selectedDate.toISOString().split("T")[0] : "")}
        placeholderText="Select Date"
        className=" w-28  cursor-pointer bg-indigo-400 placeholder:text-black text-black rounded-md px-2 py-1.5 outline-none"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default DatePickerInput;
