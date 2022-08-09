import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Header, Icon, Image, Modal } from 'semantic-ui-react';
import { sort, toTitleCase, getDateString } from '@utils';
import { PageLayout } from '@components';
import { deleteEvent, getEvents } from '@services';
import { HARD_CODE_CLIENT_ID } from '@constants';

const Dashboard: NextPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [eventToDelete, setEventToDelete] = useState<any | undefined>(
    undefined
  );
  const router = useRouter();

  const fetchData = async () => {
    const myEvents = `PartitionKey eq '${HARD_CODE_CLIENT_ID}'`;
    const response = await getEvents(myEvents);
    const sorted = sort(response, 'start_date', 'desc');
    setEvents(sorted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditEvent = (eventId: string) => {
    router.push({
      pathname: '/app/edit-event',
      query: {
        eventId,
      },
    });
  };

  const handleDeleteEvent = async () => {
    if (eventToDelete) {
      await deleteEvent(eventToDelete.PartitionKey, eventToDelete.RowKey);

      setEventToDelete(undefined);

      fetchData();
    }
  };

  return (
    <PageLayout>
      <div className="mt-48">
        <Header as="h2">Events Dashboard</Header>

        <Modal
          basic
          onClose={() => setEventToDelete(undefined)}
          open={Boolean(eventToDelete)}
          size="small"
        >
          <Header icon>
            <Icon name="trash alternate" />
            Delete Event Confirmation
          </Header>
          <Modal.Content>
            <p>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="red"
              inverted
              onClick={() => setEventToDelete(undefined)}
            >
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={handleDeleteEvent}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>

        {/* list all events, edit / delete */}
        <Card.Group>
          {events.map((event) => {
            const color =
              event.status === 'published' ? 'text-green-800' : 'text-red-600';
            return (
              <Card className="" key={event.RowKey}>
                <Image
                  alt="preview image"
                  src={event.preview_image}
                  wrapped
                  ui={false}
                />
                <div className={`absolute top-2 right-4 ${color}`}>
                  {event.status === 'published' && (
                    <FontAwesomeIcon icon={faEye} className="pr-2" />
                  )}
                  {event.status === 'draft' && (
                    <FontAwesomeIcon icon={faEyeSlash} className="pr-2" />
                  )}
                  <span>{toTitleCase(event.status)}</span>
                </div>
                <Card.Content>
                  <Card.Header>{event.title}</Card.Header>
                  <Card.Meta>
                    <span className="date">
                      {getDateString(event.start_date, event.end_date)}
                    </span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      basic
                      color="green"
                      onClick={() => handleEditEvent(event.RowKey)}
                    >
                      Edit
                    </Button>
                    <Button
                      basic
                      color="red"
                      onClick={() => {
                        setEventToDelete(event);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
