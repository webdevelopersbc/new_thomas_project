import React, { FunctionComponent } from 'react';
import { Modal, ModalProps } from 'semantic-ui-react';
import { nl2br } from '@utils';

export type SessionModalProps = {
  open: boolean;
  close: (event: React.MouseEvent<HTMLElement>, data: ModalProps) => void;
  title: string;
  description: string;
};

export const SessionModal: FunctionComponent<SessionModalProps> = ({
  open,
  close,
  title,
  description,
}) => {
  return (
    <Modal closeIcon open={open} onClose={close}>
      <Modal.Content>
        <div className="text-2xl mb-4 font-bold">{title}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: nl2br(description),
          }}
        />
      </Modal.Content>
    </Modal>
  );
};
