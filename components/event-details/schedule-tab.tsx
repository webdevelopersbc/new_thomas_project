import { DateTime } from 'luxon';
import React, { FunctionComponent } from 'react';
import { sort } from '@utils';
import {
  TimelineViews,
  Day,
  Agenda,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
} from '@syncfusion/ej2-react-schedule';
import { COLORS } from '@constants';

import 'devextreme/dist/css/dx.light.css';

export type ScheduleTabProps = {
  schedule: any;
  content: string;
};

export const ScheduleTab: FunctionComponent<ScheduleTabProps> = ({
  schedule,
  content,
}) => {
  const rooms = schedule.rooms.map((r: any, i: number) => ({
    ...r,
    color: COLORS[i],
  }));

  const sessions = rooms.map((r: any) => r.sessions);

  const tracks: any[] = [];

  sessions.forEach((session: any) => {
    session.forEach((item: any) => {
      tracks.push(item);
    });
  });

  const sortedEarliest = sort(tracks, 'startsAt', 'asc');

  const startDateTime =
    sortedEarliest.length >= 1
      ? DateTime.fromISO(sortedEarliest[0].startsAt)
      : null;

  const startHour =
    startDateTime
      ?.minus({ minutes: 30 })
      .toLocaleString(DateTime.TIME_24_SIMPLE) || 0;

  const currentDate = startDateTime || DateTime.now();

  const sortedLastest = sort(tracks, 'endsAt', 'desc');

  const endDateTime =
    sortedLastest.length >= 1
      ? DateTime.fromISO(sortedLastest[0].endsAt)
      : null;

  const endHour =
    endDateTime!.plus({ minutes: 30 }).toLocaleString(DateTime.TIME_24_SIMPLE) ||
    24;

  // const eventTemplate = () => {
  //   return (
  //     <div className="template-wrap" style={{ background: SecondaryColor }}>
  //       <div className="subject" style={{ background: PrimaryColor }}>
  //         {Subject}
  //       </div>
  //       <div className="time" style={{ background: PrimaryColor }}>
  //         Time: {startsAt.toString()} - {endsAt.toString()}
  //       </div>
  //       <div className="image">
  //         <img src={`src/schedule/images/${ImageName}.svg`} alt={ImageName} />
  //       </div>
  //       <div className="event-description">{Description}</div>
  //       <div>{categories[0]?.name}</div>
  //       <div className="footer" style={{ background: PrimaryColor }} />
  //     </div>
  //   );
  // };

  return (
    <>
      {content && (
        <div
          className="bg-light-gray rounded p-8 mb-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      <ScheduleComponent
        rowAutoHeight
        cssClass="timeline-resource-grouping"
        width="auto"
        height="auto"
        minDate={startDateTime!.startOf('day').toJSDate()}
        maxDate={endDateTime!.endOf('day').toJSDate()}
        selectedDate={currentDate.toJSDate()}
        currentView="Day"
        eventSettings={{
          dataSource: tracks,
          fields: {
            id: 'x',
            startTime: { name: 'startsAt', title: 'startsAt' },
            endTime: { name: 'endsAt', title: 'endsAt' },
            description: { name: 'description', title: 'description' },
            subject: { name: 'title', title: 'name' },
            location: { name: 'room', title: 'room' },
            isReadonly: 'true',
          },
        }}
        readonly
        startHour={String(startHour)}
        endHour={String(endHour)}
        timeScale={{ enable: true, interval: 30, slotCount: 2 }}
        editorTemplate=""
        group={{ resources: ['Rooms'] }}
        eventClick={() => {
          // alert("do nothing")
        }}
      >
        <ResourcesDirective>
          <ResourceDirective
            field="roomId"
            title="Choose Project"
            name="Rooms"
            allowMultiple={false}
            dataSource={rooms}
            textField="name"
            idField="id"
            colorField="color"
          />
        </ResourcesDirective>
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective
            option="TimelineDay"
            // eventTemplate={() => eventTemplate}
          />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, TimelineViews, Agenda]} />
      </ScheduleComponent>
    </>
  );
};
