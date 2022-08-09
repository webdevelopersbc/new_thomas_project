import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';
import { Icon, Modal, Button, Header } from 'semantic-ui-react';

export type CreateUpdateSuccessModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isUpdate: boolean;
};

export const CreateUpdateSuccessModal: FunctionComponent<
  CreateUpdateSuccessModalProps
> = ({ isOpen, setIsOpen, isUpdate }) => {
  const router = useRouter();

  return (
    <Modal
      basic
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      size="small"
    >
      <Header icon>
        {/* <Icon name="trash alternate" /> */}
        Congratulations!
      </Header>
      <Modal.Content>
        <p>
          Your event was {isUpdate ? 'updated' : 'created'} successfully. It may
          take up to 15 minutes for it to appear in the site.
        </p>
        <p>
          If this is your first event it will be reviewed by the content team.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          color="green"
          inverted
          onClick={() => {
            router.push('/app/dashboard');
          }}
        >
          <Icon name="table" /> Event Dashboard
        </Button>
        <Button
          color="purple"
          inverted
          onClick={async () => {
            router.push('/');
          }}
        >
          <Icon name="home" /> Back to Home
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
