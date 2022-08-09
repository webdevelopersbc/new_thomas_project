import React from 'react';
import { DateTime } from 'luxon';
import { useForm } from 'react-hook-form';

export const DetailsGeneral = () => {
  const { register } = useForm();

  return (
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
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Title
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                id="title"
                placeholder="Title"
                defaultValue=""
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                {...register('title')}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="tagline"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Tagline
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="tagline"
                id="tagline"
                placeholder="Tagline"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="timezone"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Timezone
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                id="timezone"
                name="timezone"
                type="text"
                disabled
                placeholder="Timezone"
                value={DateTime.now().toFormat('z')}
                className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="startdatetime"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Start Date / Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2" />
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="enddatetime"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              End Date / Time
            </label>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="twitter"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Twitter
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="twitter"
                id="twitter"
                placeholder="Twitter"
                className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="hashtag"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Hashtag
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="hashtag"
                id="hashtag"
                placeholder="Hashtag"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Website
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="website"
                id="website"
                placeholder="website"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="contactemail"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Contact Email
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="contactemail"
                id="contactemail"
                placeholder="Contact Email"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
