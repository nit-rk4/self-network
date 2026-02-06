import { useState } from "react";
import RootNode from "./components/RootNode";
import PasswordScreen from "./components/PasswordScreen";
import TitleScreen from "./components/TitleScreen";
import innerNetworkGif from "./assets/inner-network.gif";
import outerNetworkGif from "./assets/outer-network.gif";

const innerNodes = [
  { label: "IDENTITY" },
  { label: "STRENGTHS" },
  { label: "SHADOWS" },
  { label: "INNER VOICE" },
  { label: "GROWTH" },
  { label: "FORGIVENESS" },
];

export default function App() {
  const [screen, setScreen] = useState("password"); // "password" | "title" | "main"

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#071025]">
      {screen === "password" && (
        <PasswordScreen onSuccess={() => setScreen("title")} />
      )}
      {screen === "title" && (
        <TitleScreen onComplete={() => setScreen("main")} />
      )}
      {screen === "main" && (
        <RootNode
          label="Denise Ruth Manalang"
          childrenNodes={innerNodes}
          outerBgGif={outerNetworkGif}
          innerBgGif={innerNetworkGif}
        />
      )}
    </div>
  );
}