import LetterOverlay from "./LetterOverlay";

export default function FriendLetterOverlay({ onClose }) {
  return (
    <LetterOverlay title="To my best friend," onClose={onClose}>
      {`I don't say this often enough, but I'm really glad you're in my life.

You've been with me through so much — the messy days, the quiet ones, and the ones where everything felt like too much. You never made me feel like I had to be anything other than myself, and I think that's one of the rarest things a person can offer.

There are moments I remember clearly — not because something big happened, but because you were there, and that was enough. The late-night conversations, the random bursts of laughter, the silence that somehow still felt comfortable.

I know I'm not perfect, and I know we've had our rough patches. But the fact that we're still here, still choosing each other, means more to me than I can put into words.

Thank you for your patience, your honesty, and your warmth. Thank you for being someone I can trust with the parts of me that I don't show easily.

I hope I've been even half the friend to you that you've been to me.

With all sincerity,
    Denise`}
    </LetterOverlay>
  );
}
