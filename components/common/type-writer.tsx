import { FunctionComponent } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

export type TypeWriterProps = {
  words: string[];
};

export const TypeWriter: FunctionComponent<TypeWriterProps> = ({ words }) => {
  const { text: typewriter } = useTypewriter({
    words,
    loop: false,
    delaySpeed: 2500,
  });

  return (
    <span className="text-pink inline-block">
      {typewriter}
      <Cursor cursorStyle="|" />
    </span>
  );
};
