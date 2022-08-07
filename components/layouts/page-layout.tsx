import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { Parallax } from 'react-parallax';
import { Header } from 'semantic-ui-react';
import { DateTime } from 'luxon';

export type PageLayoutProps = {
  title?: string;
  bgImage?: boolean;
  invert?: boolean;
  children: React.ReactElement;
};

export const PageLayout: FunctionComponent<PageLayoutProps> = ({
  title,
  bgImage,
  invert,
  children,
}) => {
  const bgImageIndex = (Number(DateTime.now().toFormat('d')) % 5) + 1;
  const bgColor = invert ? 'bg-slate-900' : 'bg-white';
  const titleColor = bgImage || invert ? '!text-white' : '!text-black';

  return (
    <div className={`${bgColor}`}>
      <Parallax
        className=""
        bgImage="https://demo2wpopal.b-cdn.net/spker/wp-content/uploads/2019/07/bg1.svg"
        bgImageAlt="m365 is a global technology"
        strength={600}
      >
        {bgImage && (
          <div className="h-[800px absolute top-0 left-0 h-3/5 w-full z-0 -mt-12">
            <Image
              layout="fill"
              objectFit="cover"
              src={`/images/page-header-${bgImageIndex}.png`}
              alt=""
            />
          </div>
        )}

        <div className="m-6 md:m-12 relative z-10">
          {title && (
            <div className="pt-32 mb-12">
              <Header
                as="h1"
                className={`${titleColor} !font-dm-sans !text-4xl`}
              >
                {title}
              </Header>
            </div>
          )}
          <div className={`${titleColor}`}>{children}</div>
        </div>
      </Parallax>
    </div>
  );
};
