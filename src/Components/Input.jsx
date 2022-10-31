import { React, useContext, useState } from "react";
import { Context } from "../App";
import { mkdirhandler } from "../CommandHandlers/mkdir";
import { cdhandler } from "../CommandHandlers/cd";
import { touchhandler } from "../CommandHandlers/touch";
import { listhandler } from "../CommandHandlers/list";

export default function Input() {
  const [workingDirectory, setWorkingDirectory] = useContext(Context); //Global state that stores the current working directory
  const [command, setCommand] = useState(null); //State for storing the entire user input
  const [success, setSuccess] = useState(); //State for representing status of firebase api call
  const [valid, setValid] = useState(); //State for representing validity of command
  const [commandComplete, setCommandComplete] = useState(false); //State for representing whether the user input is over
  const [output, setOutput] = useState(null);

  const handleKeyDown = (e) => {
    //Function for checking whether enter is pressed
    if (e.key === "Enter") {
      e.preventDefault();
      setCommandComplete(true);
      e.target.disabled = "true"; //To make the input field disabled
      analyzeCommand();
    }
  };

  function analyzeCommand() {
    //Function to call firebase api
    if (!command) {
      setOutput("Empty");
      return;
    }
    const commandWords = command.split(" ");
    console.log(commandWords);

    switch (commandWords[0]) {
      case "mkdir":
        setValid(true);
        mkdirhandler(commandWords[1])
          .then((result) => {
            setSuccess(result.status);
            setOutput(result.message);
            console.log(result);
          })
          .catch((e) => {
            setSuccess(false);
            setOutput("Unable to create directory");
            console.log("error ", e);
          });

        break;

      case "cd":
        setValid(true);
        cdhandler(commandWords[1]).then((result) => {
          console.log(result);
          setSuccess(result.status);
          setOutput(result.message);
        }).catch((e) => {
          console.log(e);
          setSuccess(false);
          setOutput("Unable to get directory details");
        });
        break;

        case "pwd":
          setValid(true);
          setOutput(workingDirectory);
          setSuccess(true);
          break;

      case "ls":
        setValid(true);
        listhandler()
          .then((result) => {
            setSuccess(result.status);
            let message = "";
            result.contents.forEach((item) => {
              message = message + item + "\n";
            });
            setOutput(message);
          })
          .catch((err) => {
            setSuccess(false);
            setOutput("Unable to get folder information");
          });
        break;

      case "touch":
        setValid(true);
        setSuccess(touchhandler(workingDirectory, commandWords[1]));
        break;

      default:
        setValid(false);
        const msg = "Command '" + commandWords[0] + "' not found!";
        setOutput(msg);
        console.log(output, " and ", msg);
        console.log("Invalid command!");
    }
  }
  return (
    <div className="text-white w-full h-full font-mono selection:bg-green-600">
      <div className="flex">
        <p className="text-green-600 selection:bg-white text-start">
          terminal_to_cloud:~$
        </p>
        <input
          className="bg-black ml-2 border-0 caret-green-600 stroke-2 focus:outline-none flex-grow"
          autoFocus
          spellCheck="false"
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
      {commandComplete && (
        <div>
          <div className="flex justify-start">{command && <p>{output}</p>}</div>

          {/* Recursively calling the Input component to show the prompt after each command is executed */}
          {output && <Input />}
        </div>
      )}
    </div>
  );
}
