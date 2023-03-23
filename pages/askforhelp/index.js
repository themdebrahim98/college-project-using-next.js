import {
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FilledInput,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
const style = {
  display: "flex",
};
import FeatherIcon from "feather-icons-react";
function Query() {
  const [inputText, setinputText] = useState("");
  const [result, setresult] = useState("");




  const handleSubmit = () => {
    const fetchData = async () => {
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);

      const newObj = {
        model: "text-davinci-003",
        prompt: inputText,
        temperature: 0,
        max_tokens: 2096,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }
      const response = await openai.createCompletion(newObj);
      setresult(response.data.choices[0].text)
      console.log(response.data.choices[0].text);
    };
    fetchData();
  };
  return (
    <Box display="flex" flexDirection="column" gap={2}>
    
      <FormControl fullWidth sx={{ m: 1 }} variant="filled">
        <InputLabel htmlFor="standard-adornment-amount">
          Type Your Question
        </InputLabel>
        <FilledInput
        onChange={(e)=>setinputText(e.target.value)}
          minRows={2}
          multiline
          id="filled-adornment-amount"
          endAdornment={
            <FeatherIcon
              onClick={handleSubmit}
              icon="send"
              width="20"
              height="20"
              style={{ cursor: "pointer" }}
            />
          }
        />
      </FormControl>

      <Box sx={{ overflow: "auto", minHeight: "250px", background: "#ddd" }}>
        {result}
      </Box>
    </Box>
  );
}

export default Query;
