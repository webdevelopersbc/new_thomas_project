import React, { FunctionComponent } from 'react';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faBlog, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header, Modal, ModalProps } from 'semantic-ui-react';
import { nl2br, toTitleCase } from '@utils';
import { SessionDetail } from '@components';

export type SpeakerModalProps = {
  speaker: any;
  open: boolean;
  sessions: any[];
  close: (event: React.MouseEvent<HTMLElement>) => void;
};

export const SpeakerModal: FunctionComponent<SpeakerModalProps> = ({
  speaker,
  open,
  sessions,
  close,
}) => {
  const formatLink = (link: any) => {
    switch (link.linkType) {
      case 'LinkedIn':
        return (
          <a
            href={link.url}
            target="_blank"
            className="text-linkedIn"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        );
      case 'Twitter':
        return (
          <a
            href={link.url}
            target="_blank"
            className="text-twitter"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        );
      case 'Company_Website':
        return (
          <a href={link.url} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGlobe} />
          </a>
        );
      case 'Instagram':
        return (
          <a
            href={link.url}
            target="_blank"
            className="text-instagram"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        );
      case 'Facebook':
        return (
          <a
            href={link.url}
            target="_blank"
            className="text-facebook"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        );
      case 'Blog':
        return (
          <a href={link.url} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faBlog} />
          </a>
        );
      case 'Sessionize':
        return '';
      default:
        return (
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.title}
          </a>
        );
    }
  };

  const profilePicture = speaker.profilePicture || '/images/avatar.png';
  return (
    <Modal closeIcon open={open} onClose={close}>
      <Modal.Content>
        <div className="flex mb-6">
          <div className="w-[100px] mr-6">
            <img
              alt="profile"
              src={profilePicture}
              className="mb-2 w-full rounded-lg"
            />
          </div>
          <div className="grow">
            <div className="text-pink text-xl">
              {toTitleCase(speaker.fullName)}
            </div>
            <div>{speaker.tagLine}</div>
            {speaker.links?.map((link: any, index: number) => (
              <span key={index} className="text-2xl mt-2 mr-3 inline-block">
                {formatLink(link)}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <Header as="h3">
            About
            {toTitleCase(speaker.firstName)}
          </Header>
          <div dangerouslySetInnerHTML={{ __html: nl2br(speaker.bio) }} />
        </div>
        {sessions && (
          <div className="">
            <Header as="h3">Sessions</Header>
            {sessions?.map((session, i) => (
              <SessionDetail key={i} {...session} showTitle className="mt-4" />
            ))}
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
};
