import React, { FunctionComponent } from 'react';
import {
  Control,
  Controller,
  DeepRequired,
  FieldErrorsImpl,
} from 'react-hook-form';
import { Form, Popup } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FormInputs } from '@components';
import {
  ADDRESS1,
  ADDRESS2,
  CITY,
  COUNTRY,
  LATITUDE,
  LOCATION_NAME,
  LONGITUDE,
  POSTAL_CODE,
  STATE_PROVINCE,
  EVENT_TYPE,
  EVENT_TYPES,
} from '@constants';
import { COUNTRY_LIST } from '@constants';

export type LocationStepProps = {
  control: Control<FormInputs>;
  errors: FieldErrorsImpl<DeepRequired<FormInputs>>;
};

export const LocationStep: FunctionComponent<LocationStepProps> = ({
  control,
  errors,
}) => {
  const countryOptions = Object.entries(COUNTRY_LIST).map(([key, value]) => ({
    key,
    value: key,
    flag: key,
    text: value,
  }));

  return (
    <section>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Location
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Tell us about your event.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-5">
            {/* Event Type */}
            <Form.Field
              required
              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                htmlFor={EVENT_TYPE}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Event Type
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={EVENT_TYPE}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Dropdown
                      {...field}
                      ref={null}
                      options={EVENT_TYPES}
                      selection
                      fluid
                      placeholder="Event Type"
                      onChange={(e, data) => {
                        field.onChange(data.value);
                      }}
                      error={errors?.event_type?.message}
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* Event Type */}

            {/* Location Name */}
            <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <Popup
                trigger={
                  <label
                    htmlFor={LOCATION_NAME}
                    className="pointer block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Location Name{' '}
                    <FontAwesomeIcon icon={faCircleInfo} className="pl-1" />
                  </label>
                }
              >
                <Popup.Header>Location Name</Popup.Header>
                <Popup.Content>
                  This would be a descriptive name for the location. ie
                  Microsoft Office, Hilton Hotel, MGM Grand
                </Popup.Content>
              </Popup>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={LOCATION_NAME}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      ref={null}
                      placeholder="Location Name"
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* End Location Name */}

            {/* Address Line 1 */}
            <Form.Field
              required
              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                htmlFor={ADDRESS1}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Address Line 1
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={ADDRESS1}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      ref={null}
                      placeholder="Address Line 1"
                      error={errors?.address1?.message}
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* End Address Line 1 */}

            {/* Address Line 2 */}
            <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor={ADDRESS2}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Address Line 2
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={ADDRESS2}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      ref={null}
                      placeholder="Address Line 2"
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* End Address Line 2 */}

            {/* City */}
            <Form.Field
              required
              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                htmlFor={CITY}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                City
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={CITY}
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      ref={null}
                      placeholder="City"
                      error={errors?.city?.message}
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* end City */}

            {/* State/Province */}
            <Form.Field
              required
              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                htmlFor={STATE_PROVINCE}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                State/Province
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={STATE_PROVINCE}
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      ref={null}
                      placeholder="State/Province"
                      error={errors?.state_province?.message}
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* end State/Province */}

            {/* Postal Code */}
            <Form.Field
              required
              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                htmlFor={POSTAL_CODE}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Postal Code
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={POSTAL_CODE}
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      ref={null}
                      placeholder="Postal Code"
                      error={errors?.postal_code?.message}
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* Postal Code */}

            {/* Country */}
            <Form.Field
              required
              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                htmlFor={COUNTRY}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Country
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={COUNTRY}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Dropdown
                      {...field}
                      ref={null}
                      options={countryOptions}
                      selection
                      search
                      placeholder="Country"
                      onChange={(e, data) => {
                        field.onChange(data.value);
                      }}
                      error={errors?.country?.message}
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* Country */}

            {/* Latitude */}
            <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor={LATITUDE}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Latitude
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={LATITUDE}
                  control={control}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      ref={null}
                      placeholder="Latitude"
                      error={errors?.latitude?.message}
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* end Latitude */}

            {/* Longitude */}
            <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor={LONGITUDE}
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Longitude
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-1">
                <Controller
                  name={LONGITUDE}
                  control={control}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      ref={null}
                      placeholder="Longitude"
                      error={errors?.longitude?.message}
                    />
                  )}
                />
              </div>
            </Form.Field>
            {/* end Longitude */}
          </div>
        </div>
      </div>
    </section>
  );
};
