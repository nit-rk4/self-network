import RootNode from "./components/RootNode";
import innerNetworkGif from "./assets/inner-network.gif";
import outerNetworkGif from "./assets/outer-network.gif";

const innerNodes = [
  { label: "PHOTO" },
  { label: "WHAT I LOVE" },
  { label: "TALENTS" },
  { label: "POEM" },
  { label: "GRATITUDE" },
  { label: "FORGIVENESS" },
  { label: "SELF-CONSCIOUS" },
  { label: "STRUGGLES" },
];

export default function App() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#071025]">
      <RootNode 
        label="Denise Ruth Manalang" 
        childrenNodes={innerNodes}
        outerBgGif= {outerNetworkGif}// paste your link here in quotes
        innerBgGif={innerNetworkGif}
      />
    </div>
  );
}