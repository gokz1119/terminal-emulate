import { React, useState } from "react";
import { mkdirhandler } from "../CommandHandlers/mkdir";

export default function Input() {
  const [command, setCommand] = useState(""); //State for storing the entire user input
  const [success, setSuccess] = useState(); //State for representing status of firebase api call
  const [valid, setValid] = useState(); //State for representing validity of command
  const [commandComplete, setCommandComplete] = useState(false); //State for representing whether the user input is over

  const handleKeyDown = (e) => { //Function for checking whether enter is pressed
    if (e.key === "Enter") {
      e.preventDefault(); 
      setCommandComplete(true);
      e.target.disabled = "true"; //To make the input field disabled
      analyzeCommand();
    }
  };

  function analyzeCommand() { //Function to call firebase api
    const commandWords = command.split(" ");
    console.log(commandWords);

    switch (commandWords[0]) {
      case "mkdir":
        setValid(true);
        setSuccess(mkdirhandler(commandWords[1]));
        break;

      default:
        setValid(false);
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
          <div className="flex justify-start">
            {valid &&
              (success ? (
                <p>Directory created successfully!</p>
              ) : (
                <p>
                  Unable to create directory! Invalid or missing directory name!
                </p>
              ))}

            {!valid && <p>Command '{command.split(" ")[0]}' not found!</p>}
          </div>
          
           {/* Recursively calling the Input component to show the prompt after each command is executed */}
          <Input /> 
        
        </div>
      )}
    </div>
  );
}
