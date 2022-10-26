import { useEffect } from "react";
import "../styles/spinner.scss";

export default function Spinner({ spinnerValue }: any) {
  useEffect(() => {
    const spinnerContainer = document.getElementById("spinnerContainer");

    if (spinnerContainer) {
      if (spinnerValue) {
        spinnerContainer.style.display = "block";
      } else {
        spinnerContainer.style.display = "none";
      }
    }
  }, [spinnerValue]);

  return (
    <div className="spinnerContainer" id="spinnerContainer">
      <div className="spinner" id="spinner"></div>
    </div>
  );
}
