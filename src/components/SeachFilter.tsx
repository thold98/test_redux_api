import React, { useState } from "react";
import { Box, TextField, List, ListItem, Typography } from "@mui/material";

const SearchFilter: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const items = [
        "Apple",
        "Banana",
        "Cherry",
        "Date",
        "Elderberry",
        "Fig",
        "Grape",
        "Vacana",
        "Sagan"
    ];

    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 400, margin: "0 auto", p: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Search Filter
            </Typography>
            <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleInputChange}
            />
            <List sx={{ mt: 2 }}>
                {filteredItems.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                ))}
                {filteredItems.length === 0 && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        No items found.
                    </Typography>
                )}
            </List>
        </Box>
    );
};

export default SearchFilter;

