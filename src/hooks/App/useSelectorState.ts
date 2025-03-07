import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useSelectorState<T>(key: string, defaultValue: T | null = null, nextPath?: string) {
  const [selectedValue, setSelectedValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedValue !== null) {
      localStorage.setItem(key, JSON.stringify(selectedValue));
    }
  }, [selectedValue, key]);

  const handleNextPage = () => {
    if (selectedValue && nextPath) {
      navigate(nextPath);
    }
  };

  return {
    value: selectedValue,
    setValue: setSelectedValue,
    handleNextPage,
    isSelected: selectedValue !== null,
  };
}
