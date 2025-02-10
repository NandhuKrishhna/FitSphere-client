import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface BasicPaginationProps {
  count: number;               
  page: number;               
  onChange: (page: number) => void;
}

export default function BasicPagination({ count, page, onChange }: BasicPaginationProps) {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };

  return (
    <Stack spacing={2} className="flex  justify-center mt-4">
      <Pagination 
        count={count} 
        page={page} 
        onChange={handleChange} 
        color="secondary" 
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
          },
          "& .MuiPaginationItem-previousNext": {
            color: "white",
          },
        }}
      />
    </Stack>
  );
}
