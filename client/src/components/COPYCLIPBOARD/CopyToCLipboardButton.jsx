import React from "react";
import './clipboard.scss'
import { AiTwotoneCopy } from "react-icons/ai";



const CopyToClipboardButton = () => {
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        alert("Failed to copy to clipboard!");
      });
  };

  return (

    <div className="clipboard">
        <AiTwotoneCopy  onClick={copyToClipboard} size={'40px'} />
    </div>
    

  );
};

export default CopyToClipboardButton;
