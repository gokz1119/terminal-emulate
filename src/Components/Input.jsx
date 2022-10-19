import { React, useState } from "react";
import { mkdirhandler } from "../CommandHandlers/mkdir";

export default function Input() {
  const [command, setCommand] = useState("");
  const [success, setSuccess] = useState();
  const [valid, setValid] = useState();
  const [commandComplete, setCommandComplete] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCommandComplete(true);
      e.target.blur();
      analyzeCommand();
    }
  };

  function analyzeCommand() {
    const commandWords = command.split(" ");
    console.log(commandWords);

    switch (commandWords[0]) {
      case "mkdir":
        setValid(true);
        const res = mkdirhandler(commandWords[1])
        console.log(res);
        if (res) {
          setSuccess(true);
        } else setSuccess(false);
        break;

      default:
        setValid(false);
        console.log("Invalid command!");
    }
  }
  return (
    <div className="text-white w-full h-full font-mono selection:bg-green-600">
      <div className="flex">
        <p className="text-green-600 selection:bg-white text-start">terminal_to_cloud:~$</p>
        <input
          className="bg-black ml-2 border-0 caret-green-600 stroke-2 focus:outline-none flex-grow"
          autoFocus
          spellCheck="false"
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {commandComplete && (
        <div className="flex justify-start">
          {valid && (success ? (
            <p>Directory created successfully!</p>
          ) : (
            <p>
              Unable to create directory! Invalid or missing directory name!
            </p>
          ))}

          {!valid && <p>Command '{command.split(" ")[0]}' not found!</p>}
        </div>
      )}
    </div>
  );
}
