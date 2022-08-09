import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { Tab } from 'semantic-ui-react';
import { Control, Controller } from 'react-hook-form';
import { FormInputs } from '@components';
import {
  HOME_CONTENT,
  SESSIONS_CONTENT,
  SPEAKERS_CONTENT,
  SCHEDULE_CONTENT,
  SPONSORS_CONTENT,
} from '@constants';
import { ReactQuillProps } from 'react-quill';

const ReactQuill = dynamic<ReactQuillProps>(() => import('react-quill'), {
  ssr: false,
});

export type ContentStepProps = {
  control: Control<FormInputs>;
};

export const ContentStep: FunctionComponent<ContentStepProps> = ({
  control,
}) => {
  const panes = [
    {
      menuItem: 'Home',
      pane: {
        key: 'home',
        content: (
          <Controller
            name={HOME_CONTENT}
            control={control}
            defaultValue=""
            render={({ field }) => <ReactQuill {...field} theme="snow" />}
          />
        ),
      },
    },
    {
      menuItem: 'Sessions',
      pane: {
        key: 'sessions',
        content: (
          <Controller
            name={SESSIONS_CONTENT}
            control={control}
            defaultValue=""
            render={({ field }) => <ReactQuill {...field} theme="snow" />}
          />
        ),
      },
    },
    {
      menuItem: 'Speakers',
      pane: {
        key: 'speakers',
        content: (
          <Controller
            name={SPEAKERS_CONTENT}
            control={control}
            defaultValue=""
            render={({ field }) => <ReactQuill {...field} theme="snow" />}
          />
        ),
      },
    },
    {
      menuItem: 'Schedule',
      pane: {
        key: 'schedule',
        content: (
          <Controller
            name={SCHEDULE_CONTENT}
            control={control}
            defaultValue=""
            render={({ field }) => <ReactQuill {...field} theme="snow" />}
          />
        ),
      },
    },
    {
      menuItem: 'Sponsors',
      pane: {
        key: 'sponsors',
        content: (
          <Controller
            name={SPONSORS_CONTENT}
            control={control}
            defaultValue=""
            render={({ field }) => <ReactQuill {...field} theme="snow" />}
          />
        ),
      },
    },
  ];

  return (
    <section>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Page Content
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Each tab represents the content sections available on each page.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <Tab panes={panes} renderActiveOnly={false} />
          </div>
        </div>
      </div>
    </section>
  );
};
