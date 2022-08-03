import React, { FunctionComponent } from 'react';

export type FooterLinkColumnProps = {
  columnTitle: string;
  linkArray?: string[][];
};

export const FooterLinkColumn: FunctionComponent<FooterLinkColumnProps> = ({
  columnTitle,
  linkArray,
}) => (
  <>
    <div className="text-lg uppercase mb-1 md:mb-3">{columnTitle}</div>
    <ul className="list-none">
      {linkArray?.map(([title, url]) => (
        <li className="py-1" key={url}>
          <a href={url}>{title}</a>
        </li>
      ))}
    </ul>
  </>
);
