import { useState } from "react";

export default function Example() {
  const [numberOfInput, setNumberOfInput] = useState([""]);

  return (
    <>
      {numberOfInput.map((item, idx) => (
        <>
          <input onChange={(e) => {
            
          }}/>
          <button
            className="ml-2"
            onClick={() => {
              setNumberOfInput((prevState) => {
                const notDeleteInput = prevState.filter(
                  (i, idxOfDeleteInput) => idxOfDeleteInput !== idx
                );
                setNumberOfInput(notDeleteInput);
              });
            }}
          >
            delete
          </button>
        </>
      ))}

      <button
        onClick={() => {
          setNumberOfInput((prevState) => {
            return [...prevState, ""];
          });
        }}
      >
        add
      </button>
    </>
  );
}
