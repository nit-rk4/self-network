import { useState } from "react";
import RootNode from "./components/nodes/RootNode";
import PasswordScreen from "./components/screens/PasswordScreen";
import TitleScreen from "./components/screens/TitleScreen";
import innerNetworkGif from "./assets/inner-network.gif";
import outerNetworkGif from "./assets/outer-network.gif";

const innerNodes = [
  { label: "IDENTITY",    color: "160,180,200" },   // silver — neutral, self
  { label: "STRENGTHS",   color: "255,200,60" },    // gold — confidence, power
  { label: "SHADOWS",     color: "160,100,220" },   // dark purple — hidden depths
  { label: "INNER VOICE", color: "80,200,255" },    // cyan — clarity, thought
  { label: "GROWTH",      color: "100,220,140" },   // green — renewal, progress
  { label: "FORGIVENESS", color: "255,140,180" },   // pink — compassion, healing
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