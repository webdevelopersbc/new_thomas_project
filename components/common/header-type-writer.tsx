import { useTypewriter, Cursor } from 'react-simple-typewriter';

export const HeaderTypeWriter = () => {
  const { text: typewriter } = useTypewriter({
    words: ['Conferences', 'Bootcamps', 'Community Events'],
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
