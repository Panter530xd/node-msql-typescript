import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Clock } from "tabler-icons-react";

interface CustomTimePickerProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  id,
  placeholder,
  value,
  onChange,
}) => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value) {
      const timeParts = value.split(":");
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);

      if (!isNaN(hours) && !isNaN(minutes)) {
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        setSelectedTime(date);
      }
    } else {
      setSelectedTime(null);
    }
  }, [value]);

  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);

    if (time) {
      const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      onChange(formattedTime);
    } else {
      onChange("");
    }
  };

  const CustomInput = React.forwardRef<HTMLInputElement | null>(
    ({ value, onClick }: any, ref) => {
      const [inputValue, setInputValue] = useState(value || "");

      useEffect(() => {
        setInputValue(value || "");
      }, [value]);


      return (
        <div
          className="flex justify-between items-center md:w-32 w-20 h-10 rounded-md border border-gray-300 px-2 cursor-pointer"
          onClick={onClick}
        >
          <span className="mr-2">{inputValue || placeholder}</span>
          <Clock size={20} className="text-gray-500" />
          <input
            type="text"
            className="hidden"
            ref={ref}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      );
    }
  );

  return (
    <div>
     
      <DatePicker
        selected={selectedTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        customInput={<CustomInput ref={inputRef} />}
        placeholderText={placeholder}
      />
    </div>
  );
};

export default CustomTimePicker;
