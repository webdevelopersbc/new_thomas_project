import React, { useState } from 'react';
import { PageLayout } from '@components';
import { Accordion, AccordionTitleProps } from 'semantic-ui-react';
import { NextPage } from 'next';

const faqs = [
  {
    title: 'How can I organize an SPS Event 1?',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
            ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
            In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
            Fusce sed commodo purus, at tempus turpis.`,
  },
  {
    title: 'What are the guidelines to host an Event 1?',
    content:
      'Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.',
  },
  {
    title: 'Curabitur laoreet, mauris vel blandit fringilla 1',
    content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
          Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
          Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
          Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
  },
  {
    title: 'How can I organize an SPS Event 2?',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
            ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
            In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
            Fusce sed commodo purus, at tempus turpis.`,
  },
  {
    title: 'What are the guidelines to host an Event 2?',
    content:
      'Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.',
  },
  {
    title: 'Curabitur laoreet, mauris vel blandit fringilla 2',
    content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
          Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
          Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
          Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
  },
  {
    title: 'How can I organize an SPS Event 3?',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
            ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
            In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
            Fusce sed commodo purus, at tempus turpis.`,
  },
  {
    title: 'What are the guidelines to host an Event 4?',
    content:
      'Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.',
  },
  {
    title: 'Curabitur laoreet, mauris vel blandit fringilla 3',
    content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
          Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
          Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
          Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
  },
];

const Faqs: NextPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (
    _e: React.MouseEvent<HTMLDivElement>,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : Number(index);
    setActiveIndex(newIndex);
  };

  return (
    <PageLayout title="FAQs">
      <Accordion>
        {faqs.map((faq, index) => (
          <div key={faq.title} className="bg-zinc-100 rounded mb-6 px-6 py-4">
            <Accordion.Title
              className="!text-2xl"
              active={activeIndex === index}
              index={index}
              onClick={handleClick}
            >
              <div className="float-right">
                <div className="glyph-wrapper float-right">
                  <span className="line-h" />
                  <span className="line-v" />
                </div>
              </div>
              <span>{faq.title}</span>
            </Accordion.Title>
            <Accordion.Content
              active={activeIndex === index}
              className="mr-20 mb-6 text-black"
            >
              {faq.content}
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    </PageLayout>
  );
};

export default Faqs;
