import React from 'react';
import { FooterLinkColumn } from '@components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => (
  <footer className="bg-light-gray text-black opacity-70 font-dm-sans px-6 py-6 lg:px-12 lg:py-16 xl:p-16">
    <div className="grid grid-cols-1 mb-12 sm:grid-cols-4 lg:mb-32">
      <div className="mb-6">
        <FooterLinkColumn
          columnTitle="Helpful Links"
          links={[
            { text: 'Become an Organizer', url: '/' },
            { text: 'Who We Are', url: '/' },
            { text: 'Item 1', url: '/' },
          ]}
        />
      </div>
      <div className="mb-6">
        <FooterLinkColumn
          columnTitle="Explore"
          links={[
            { text: 'Event Finder', url: '/events' },
            { text: 'Upcoming Events', url: '/events' },
            { text: 'Past Events', url: '/events?past' },
          ]}
        />
      </div>
      <div className="mb-6">
        <FooterLinkColumn
          columnTitle="About Us"
          links={[
            { text: 'm365 Team', url: '/about' },
            { text: 'Terms of Use', url: '/terms-of-use' },
          ]}
        />
      </div>
      <div className="mb-6">
        <FooterLinkColumn columnTitle="Sponsored By" />
        <a href="https://sohodragon.nyc">
          <Image
            src="/images/soho-logo.png"
            alt="SoHo Dragon"
            width={314}
            height={141}
          />
        </a>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-1">
      <div className="mb-12">
        <a href="https://twitter.com/search?q=%23m365events">
          <FontAwesomeIcon icon={faTwitter} className="mb-3 pl-1" />
        </a>
        <hr className="w-4/6 mb-3 border-black opacity-20" />
        <span className="pl-1">
          Built by the Community for the Communtiy. Proudly hosted on{' '}
          <b>
            <a href="https://azure.microsoft.com/">Azure</a>
          </b>
          !
        </span>
      </div>
      <div className="mb-12 hidden">
        <div className="text-lg uppercase mb-3">Newsletter</div>
      </div>
    </div>
  </footer>
);
