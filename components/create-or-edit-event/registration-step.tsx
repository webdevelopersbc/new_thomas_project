import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import {
  Control,
  Controller,
  DeepRequired,
  FieldErrorsImpl,
  UseFormGetValues,
} from 'react-hook-form';
import { Form, Message, Icon, List } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropzone from 'react-dropzone';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FormInputs } from '@components';
import {
  REGISTRATION_END_DATE,
  REGISTRATION_START_DATE,
  REGISTRATION_URL,
  SESSIONIZE_KEY,
  SPEAKER_CALL_END_DATE,
  SPEAKER_CALL_START_DATE,
  SPONSOR_CALL_END_DATE,
  SPONSOR_CALL_START_DATE,
  SPONSOR_PROSPECTUS,
  CALL_FOR_SPEAKERS_LINK,
  CALL_FOR_SPONSORS_LINK,
} from '@constants';

const Flatpickr = dynamic(() => import('react-flatpickr'), { ssr: false });

export type RegistrationStepProps = {
  control: Control<FormInputs>;
  errors: FieldErrorsImpl<DeepRequired<FormInputs>>;
  getValues: UseFormGetValues<FormInputs>;
};

export const RegistrationStep: FunctionComponent<RegistrationStepProps> = ({
  control,
  errors,
  getValues,
}) => (
  <section>
    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Registration, Speakers, &amp; Sponsors
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Tell us about your event.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-5">
          {/* Registration Link */}
          <Form.Field
            required
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              htmlFor={REGISTRATION_URL}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Registration Link
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={REGISTRATION_URL}
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    placeholder="Registration Link"
                    error={errors?.registration_url?.message}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* Registration Link */}

          {/* Registration Start Date / Time */}
          <Form.Field
            required
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              htmlFor={REGISTRATION_START_DATE}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Registration Start Date / Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={REGISTRATION_START_DATE}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Flatpickr
                      {...field}
                      options={{
                        dateFormat: 'F j, Y h:i K',
                        enableTime: true,
                        mode: 'single',
                        wrap: true,
                      }}
                    >
                      <Form.Input
                        type="text"
                        iconPosition="left"
                        error={Boolean(
                          errors?.registration_start_date?.message?.length
                        )}
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
                      error={errors?.registration_start_date?.message}
                    />
                  </>
                )}
              />
            </div>
          </Form.Field>
          {/* Registration Start Date / Time */}

          {/* Registration End Date / Time */}
          <Form.Field
            required
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              htmlFor={REGISTRATION_END_DATE}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Registration End Date / Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={REGISTRATION_END_DATE}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <Flatpickr
                      {...field}
                      options={{
                        dateFormat: 'F j, Y h:i K',
                        enableTime: true,
                        mode: 'single',
                        wrap: true,
                      }}
                    >
                      <Form.Input
                        type="text"
                        iconPosition="left"
                        error={Boolean(
                          errors?.registration_end_date?.message?.length
                        )}
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
                      error={errors?.registration_end_date?.message}
                    />
                  </>
                )}
              />
            </div>
          </Form.Field>
          {/* Registration End Date / Time */}

          {/* Sessionize Key */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={SESSIONIZE_KEY}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Sessionize Key
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={SESSIONIZE_KEY}
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    placeholder="Sessionize Key"
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* Sessionize Key */}

          {/* Call for Speakers Link */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={CALL_FOR_SPEAKERS_LINK}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Call for Speakers Link
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={CALL_FOR_SPEAKERS_LINK}
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    placeholder="Call for Speakers Link"
                    error={errors?.call_for_speakers_link?.message}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* Call for Speakers Link */}

          {/* Call for Speakers Start */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={SPEAKER_CALL_START_DATE}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Call for Speakers - Start Date / Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={SPEAKER_CALL_START_DATE}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    options={{
                      dateFormat: 'F j, Y h:i K',
                      enableTime: true,
                      mode: 'single',
                      wrap: true,
                    }}
                  >
                    <Form.Input type="text" iconPosition="left">
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
                )}
              />
            </div>
          </Form.Field>
          {/* Call for Speakers Start */}

          {/* Call for Speakers End */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={SPEAKER_CALL_END_DATE}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Call for Speakers - End Date / Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={SPEAKER_CALL_END_DATE}
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    options={{
                      dateFormat: 'F j, Y h:i K',
                      enableTime: true,
                      mode: 'single',
                      wrap: true,
                    }}
                  >
                    <Form.Input type="text" iconPosition="left">
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
                )}
              />
            </div>
          </Form.Field>
          {/* Call for Speakers End */}

          {/* Call for Sponsors Link */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={CALL_FOR_SPONSORS_LINK}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Call for Sponsors Link
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={CALL_FOR_SPONSORS_LINK}
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Form.Input
                    {...field}
                    ref={null}
                    placeholder="Call for Sponsors Link"
                    error={errors?.call_for_sponsors_link?.message}
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* Call for Sponsors Link */}

          {/* Call for Sponsors Start */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={SPONSOR_CALL_START_DATE}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Call for Sponsors - Start Date / Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={SPONSOR_CALL_START_DATE}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    options={{
                      dateFormat: 'F j, Y h:i K',
                      enableTime: true,
                      mode: 'single',
                      wrap: true,
                    }}
                  >
                    <Form.Input type="text" iconPosition="left">
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
                )}
              />
            </div>
          </Form.Field>
          {/* Call for Sponsors Start */}

          {/* Call for Sponsors End */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={SPONSOR_CALL_END_DATE}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Call for Sponsors - End Date / Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-1">
              <Controller
                name={SPONSOR_CALL_END_DATE}
                control={control}
                render={({ field }) => (
                  <>
                    <Flatpickr
                      {...field}
                      options={{
                        dateFormat: 'F j, Y h:i K',
                        enableTime: true,
                        mode: 'single',
                        wrap: true,
                      }}
                    >
                      <Form.Input
                        type="text"
                        iconPosition="left"
                        error={Boolean(
                          errors?.sponsor_call_end_date?.message?.length
                        )}
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
                      error={errors?.sponsor_call_end_date?.message}
                    />
                  </>
                )}
              />
            </div>
          </Form.Field>
          {/* Call for Sponsors End */}

          {/* Sponsor Prospectus */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={SPONSOR_PROSPECTUS}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Sponsorship Prospectus
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <Message icon>
                <Icon name="file alternate" />
                <Message.Content>
                  <Message.Header>Sponsor Details</Message.Header>
                  <Message.List>
                    <Message.Item>item 1</Message.Item>
                    <Message.Item>item 2</Message.Item>
                  </Message.List>
                </Message.Content>
              </Message>
              <Controller
                name={SPONSOR_PROSPECTUS}
                control={control}
                render={({ field }) => {
                  const sponsorProspectus = getValues(SPONSOR_PROSPECTUS);
                  return (
                    <>
                      <Dropzone
                        {...field}
                        ref={null}
                        onDrop={(acceptedFiles) => {
                          field.onChange(acceptedFiles[0]);
                        }}
                        multiple={false}
                      >
                        {({ getRootProps }) => (
                          <section className="container border-2 border-dashed p-8">
                            <div
                              {...getRootProps({
                                className: 'dropzone',
                              })}
                            >
                              <p className="!mb-2">
                                Drag &apos;n&apos; drop some files here, or
                                click to select files
                              </p>
                            </div>
                            {sponsorProspectus?.name && (
                              <aside>
                                <List bulleted>
                                  <List.Item>
                                    {`${sponsorProspectus.path} - ${sponsorProspectus.size} bytes`}
                                  </List.Item>
                                </List>
                              </aside>
                            )}
                            {sponsorProspectus &&
                              typeof sponsorProspectus === 'string' &&
                              String(sponsorProspectus).indexOf('/') !== -1 && (
                                <a href={sponsorProspectus}>
                                  <FontAwesomeIcon
                                    icon={faDownload}
                                    className="mr-1"
                                  />
                                  {String(sponsorProspectus).substring(
                                    String(sponsorProspectus).lastIndexOf('/') +
                                      1
                                  )}
                                </a>
                              )}
                          </section>
                        )}
                      </Dropzone>
                      <Form.Input
                        style={{ display: 'none' }}
                        error={errors?.sponsor_prospectus?.message}
                      />
                    </>
                  );
                }}
              />
            </div>
          </Form.Field>
          {/* Sponsor Prospectus */}
        </div>
      </div>
    </div>
  </section>
);
