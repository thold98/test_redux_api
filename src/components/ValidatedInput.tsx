import React, { useState, useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";

interface ValidatedInputProps {
    validationFn: (value: string) => boolean;
    errorMessage: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
    validationFn,
    errorMessage,
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    useEffect(() => {
        if (isTouched && inputValue.trim() !== "") {
            setIsValid(validationFn(inputValue));
        } else if (inputValue.trim() === "") {
            setIsValid(true);
        }
    }, [inputValue, validationFn, isTouched]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (!isTouched) {
            setIsTouched(true);
        }
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 400, margin: "0 auto", p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Form Input Validation
            </Typography>
            <TextField
                fullWidth
                label="Validated Input"
                value={inputValue}
                onChange={handleInputChange}
                error={!isValid && isTouched && inputValue.trim() !== ""}
            />
            {!isValid && isTouched && inputValue.trim() !== "" && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errorMessage}
                </Typography>
            )}
        </Box>
    );
};

export default ValidatedInput;
