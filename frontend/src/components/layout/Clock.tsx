import { useEffect, useState } from "react";
import "./Clock.css";

function Clock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return <span className="navbar-clock">{time}</span>;
}

export default Clock;