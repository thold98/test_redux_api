import React from "react";
import { Pagination } from "@mui/material";

interface PaginationControlProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
        />
    );
};

export default PaginationControl;
