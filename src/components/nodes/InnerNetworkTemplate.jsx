import InsecurityWords from "../effects/InsecurityWords";
import InnerNodes from "./InnerNodes";

export default function InnerNetworkTemplate({
  nodes,
  onNodeClick,
  shadowRevealed = false,
  showInsecurityWords = false,
}) {
  return (
    <>
      <InsecurityWords visible={showInsecurityWords && shadowRevealed} />
      <InnerNodes
        nodes={nodes}
        onNodeClick={onNodeClick}
        shadowRevealed={shadowRevealed}
      />
    </>
  );
}
