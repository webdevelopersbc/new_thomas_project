import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { PageLayout, EventForm } from '@components';

export type EditEventProps = {
  eventId?: string;
};

const EditEvent: NextPage<EditEventProps> = ({ eventId }) => (
    <PageLayout title="Edit Event">
      <EventForm eventId={eventId} />
    </PageLayout>
  );

export default EditEvent;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const eventId = query?.eventId;

  return {
    props: { eventId },
  };
};
