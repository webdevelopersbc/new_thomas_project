import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import {
  Control,
  Controller,
  DeepRequired,
  FieldErrorsImpl,
} from 'react-hook-form';
import { FormInputs } from '@components';
import { Form, Popup } from 'semantic-ui-react';
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { END_DATE, START_DATE, TITLE } from '@constants';

const Flatpickr = dynamic(() => import('react-flatpickr'), { ssr: false });

export type GeneralStepProps = {
  control: Control<FormInputs>;
  errors: FieldErrorsImpl<DeepRequired<FormInputs>>;
};

export const GeneralStep: FunctionComponent<GeneralStepProps> = ({
  control,
  errors,
}) => (
  <section>
    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            General Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Tell us about your event.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-5">
          {/* Title Field */}
          <Form.Field
            required
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              htmlFor={TITLE}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Title
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={TITLE}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    placeholder="Title"
                    error={errors?.title?.message}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* End Title Field  */}

          {/* Tagline Field */}
          <Form.Field
            htmlFor="tagline"
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <Popup
              trigger={
                <label
                  htmlFor="tagline"
                  className="pointer block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Tagline{' '}
                  <FontAwesomeIcon icon={faCircleInfo} className="pl-1" />
                </label>
              }
            >
              <Popup.Header>Tagline</Popup.Header>
              <Popup.Content>
                This is the catch phrase or slogan display in the hero tile. ie
                "New York's Premier Summer Microsoft Event"
              </Popup.Content>
            </Popup>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name="tagline"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    placeholder="Tagline"
                    error={errors?.tagline?.message}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* End Tagline Field */}

          {/* Timezone Field */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <Popup
              trigger={
                <label
                  htmlFor="timezone"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Timezone{' '}
                  <FontAwesomeIcon icon={faCircleInfo} className="pl-1" />
                </label>
              }
            >
              <Popup.Header>Timezone</Popup.Header>
              <Popup.Content>
                Your timezone is automatically detected from your local machine.
                Your event's time will be based on this zone.
              </Popup.Content>
            </Popup>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name="timezone"
                control={control}
                defaultValue={DateTime.now().toFormat('z')}
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    disabled
                    value={DateTime.now().toFormat('z')}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* End Timezone Field */}

          {/* Start Date / Time */}
          <Form.Field
            required
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              htmlFor={START_DATE}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Start Date / Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={START_DATE}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Flatpickr
                      {...field}
                      options={{
                        dateFormat: 'F j, Y h:i K',
                        enableTime: true,
                        defaultHour: 8,
                        mode: 'single',
                        wrap: true,
                      }}
                    >
                      <Form.Input
                        type="text"
                        iconPosition="left"
                        error={errors?.start_date?.message}
                      >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input data-input placeholder="Select Date" />
                      </Form.Input>
                    </Flatpickr>
                    <Form.Input
                      style={{ display: 'none' }}
                      error={errors?.start_date?.message}
                    />
                  </>
                )}
              />
            </div>
          </Form.Field>
          {/* End Start Date / Time */}

          {/* End Date / Time */}
          <Form.Field
            required
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              htmlFor={END_DATE}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              End Date / Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={END_DATE}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Flatpickr
                      {...field}
                      options={{
                        dateFormat: 'F j, Y h:i K',
                        enableTime: true,
                        defaultHour: 18,
                        mode: 'single',
                        wrap: true,
                      }}
                    >
                      <Form.Input
                        type="text"
                        iconPosition="left"
                        error={Boolean(errors?.end_date?.message?.length)}
                      >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input data-input placeholder="Select Date" />
                      </Form.Input>
                    </Flatpickr>
                    <Form.Input
                      style={{ display: 'none' }}
                      error={errors?.end_date?.message}
                    />
                  </>
                )}
              />
            </div>
          </Form.Field>
          {/* End End Date / Time */}

          {/* Twitter */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="twitter"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Twitter
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name="twitter"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    icon="at"
                    iconPosition="left"
                    placeholder="Twitter"
                    error={errors?.twitter?.message}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* End Twitter */}

          {/* Hashtag */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="hashtag"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Hashtag
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name="hashtag"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    icon="hashtag"
                    iconPosition="left"
                    placeholder="Hashtag"
                    error={errors?.hashtag?.message}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* End Hashtag */}

          {/* Website */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Website
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name="website"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    placeholder="Website"
                    error={errors?.website?.message}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* End Website */}

          {/* Contact Email */}
          <Form.Field
            required
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              htmlFor="contact_email"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Contact Email
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name="contact_email"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    placeholder="Contact Email"
                    error={errors?.contact_email?.message}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* Contact Email */}
        </div>
      </div>
    </div>
  </section>
);
