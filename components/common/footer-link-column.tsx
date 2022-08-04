import React, { FunctionComponent } from 'react';

export type FooterLinkColumnProps = {
  columnTitle: string;
  links?: {
    text: string;
    url: string;
  }[];
};

export const FooterLinkColumn: FunctionComponent<FooterLinkColumnProps> = ({
  columnTitle,
  links,
}) => (
  <>
    <div className="text-lg uppercase mb-1 md:mb-3">{columnTitle}</div>
    <ul className="list-none">
      {links?.map(({ text, url }) => (
        <li className="py-1" key={text}>
          <a href={url}>{text}</a>
        </li>
      ))}
    </ul>
  </>
);
