import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addHour, addMinuete } from '../../../redux/slices/timerSlice';
import { TextField, Box } from '@mui/material';

function TimePicker() {


    function handleHourChange(event) {
        const newHour = event.target.value;
        dispatch(addHour(newHour))
        //   setHour(newHour);
    }

    function handleMinuteChange(event) {
        const newMinute = event.target.value;
        dispatch(addMinuete(newMinute))

    }

  
    const timePicker = useSelector((state) => state.timePicker)
    const dispatch = useDispatch();


    return (
        <Box gap={2}display='flex' alignItems="center" >
            <TextField label='hour' type="number" min="1" max="12" value={timePicker.hour} onChange={handleHourChange} />
            <span>:</span>
            <TextField label='minuete' type="number" min="0" max="59" value={timePicker.minuete} onChange={handleMinuteChange} />
           
        </Box>
    );
}

export default TimePicker;
