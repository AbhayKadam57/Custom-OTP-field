import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App({ length = 6 }) {
  const [count, setCount] = useState(0);
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRef = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      //move to next input
      if (index < length - 1) {
        inputRef.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index]) {
      if (index > 0) inputRef.current[index - 1].focus();
    }
  };

  return (
    <div className="container">
      <div className="otpBox">
        <h1>Enter verification code</h1>
        <div className="otpBoxes">
          {otp.map((item, index) => (
            <>
              <input
                ref={(el) => (inputRef.current[index] = el)}
                key={index}
                value={item}
                maxLength={1}
                type="text"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
              {index < otp.length - 1 && <div className="separator">-</div>}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
