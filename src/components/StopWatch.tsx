import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

const Stopwatch: React.FC = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startHandler = () => {
        if (!timerIdRef.current) {
            timerIdRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
    };

    const stopHandler = () => {
        if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }
    };

    const resetHandler = () => {
        stopHandler();
        setSeconds(0);
    };

    useEffect(() => {
        return () => {
            // Cleanup timer if component unmounts
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
            }
        };
    }, []);

    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h4">Stopwatch</Typography>
            <Typography variant="h5" sx={{ my: 2 }}>
                {seconds} seconds
            </Typography>
            <Button variant="contained" color="primary" onClick={startHandler} sx={{ m: 1 }}>
                Start
            </Button>
            <Button variant="contained" color="secondary" onClick={stopHandler} sx={{ m: 1 }}>
                Stop
            </Button>
            <Button variant="outlined" color="error" onClick={resetHandler} sx={{ m: 1 }}>
                Reset
            </Button>
        </Box>
    );
};

export default Stopwatch;

