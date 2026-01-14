import { useEffect, useState } from "react";
import "./styles.css";

const phases = [
  {
    base: [
      { id: 1, colour: "no-light" },
      { id: 2, colour: "no-light" },
      { id: 3, colour: "green" },
    ],
    duration: 3000,
  },
  {
    base: [
      { id: 1, colour: "no-light" },
      { id: 2, colour: "yellow" },
      { id: 3, colour: "no-light" },
    ],
    duration: 1000,
  },
  {
    base: [
      { id: 1, colour: "red" },
      { id: 2, colour: "no-light" },
      { id: 3, colour: "no-light" },
    ],
    duration: 3000,
  },
];

export default function App() {
  const [phrase, setPhrase] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkingOn, setBlinkingOn] = useState(true);

  const lights = isBlinking
    ? phases[phrase].base.map((l) =>
        blinkingOn ? l : { ...l, colour: "no-light" }
      )
    : phases[phrase].base;
  useEffect(() => {
    let timer;

    if (isBlinking) {
      let count = 0;
      const blink = () => {
        setBlinkingOn((pre) => !pre);
        count++;
        if (count < 4) {
          timer = setTimeout(blink, 200);
        } else {
          setIsBlinking(false);
          setPhrase((prev) => (prev + 1) % phases.length);
        }
      };
      timer = setTimeout(blink, 200);
    } else {
      timer = setTimeout(() => {
        setIsBlinking(true);
      }, phases[phrase].duration);
    }
    return () => clearTimeout(timer);
  }, [phrase.duration, isBlinking]);

  return (
    <div className="App">
      <div className="box">
        {lights.map((light) => (
          <span
            key={light.id}
            className={
              light.colour === "no-light" ? "light" : `${light.colour} light`
            }
          />
        ))}
      </div>
    </div>
  );
}
