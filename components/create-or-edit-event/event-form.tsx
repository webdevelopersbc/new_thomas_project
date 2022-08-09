// @ts-nocheck
import React, {
  useState,
  useEffect,
  BaseSyntheticEvent,
  FunctionComponent,
} from 'react';
import {
  EventSteps,
  Loader,
  CreateUpdateSuccessModal,
  GeneralStep,
  ImagesStep,
  LocationStep,
  RegistrationStep,
  EventStepper,
  ContentStep,
} from '@components';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form } from 'semantic-ui-react';
import { uploadBlob, upsertEvent, getEvent } from '@services';
import {
  BANNER_IMAGE,
  BANNER_IMAGE_ATTRIBUTION_LINK,
  BANNER_IMAGE_ATTRIBUTION_TEXT,
  BANNER_IMAGE_RIGHTS,
  CONTACT_EMAIL,
  END_DATE,
  HARD_CODE_CLIENT_ID,
  PREVIEW_IMAGE,
  PREVIEW_IMAGE_ATTRIBUTION_LINK,
  PREVIEW_IMAGE_ATTRIBUTION_TEXT,
  PREVIEW_IMAGE_RIGHTS,
  SPONSOR_PROSPECTUS,
  START_DATE,
  TITLE,
  VALIDATIONS,
} from '@constants';

interface FileWithPath extends File {
  path: string;
}

export type EventFormProps = {
  eventId?: string;
};

export type EventStep = {
  id: string;
  status: string;
  name: string;
  description?: string;
};

export type FormInputs = {
  title: string;
  start_date: string;
  end_date: string;
  website: string;
  contact_email: string;
  event_type: string;
  address1: string;
  city: string;
  state_province: string;
  postal_code: string;
  location: string;
  country: string;
  address2: string;
  address2: string;
  longitude: number;
  latitude: number;
  registration_url: string;
  registration_start_date: string;
  registration_end_date: string;
  sessionize_key: string;
  speaker_call_start_date: string;
  speaker_call_end_date: string;
  call_for_speakers_link: string;
  call_for_sponsors_link: string;
  sponsor_call_start_date: string;
  sponsor_call_end_date: string;
  sponsor_prospectus: FileWithPath;
  banner_image: FileWithPath;
  banner_image_rights: boolean;
  banner_image_attribution_text: string;
  banner_image_attribution_link: string;
  preview_image: FileWithPath;
  preview_image_rights: boolean;
  preview_image_attribution_text: string;
  preview_image_attribution_link: string;
  home_content: string;
  schedule_content: string;
  speakers_content: string;
  sessions_content: string;
  sponsors_content: string;
  status: string;
  tagline: string;
  timezone: string;
  twitter: string;
  hashtag: string;
};

const schema = yup.object().shape({
  // GENERAL
  title: yup.string().required('This field is required'),
  start_date: yup.date().required().typeError('This field is required'),
  end_date: yup
    .date()
    .required()
    .typeError('This field is required')
    .min(
      yup.ref('start_date'),
      "End date/time can't be before Start date/time"
    ),
  website: yup.string().url('Not a valid url'),
  contact_email: yup
    .string()
    .email('Not a valid email')
    .required('This field is required'),
  // LOCATION
  event_type: yup.string().required('Select an event type'), // TODO: validate this dropdown is selected
  address1: yup.string().required('This field is required'),
  city: yup.string().required('This field is required'),
  state_province: yup.string().required('This field is required'),
  postal_code: yup.string().required('This field is required'),
  country: yup.string().required('This field is required'),
  longitude: yup
    .number()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .typeError('Longitude must be a number')
    .min(-90, 'Longitude must be more than -90')
    .max(90, 'Longitude must be lower than 90'),
  latitude: yup
    .number()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .typeError('Latitude must be a number')
    .min(-180, 'Latitude must be more than -180')
    .max(180, 'Latitude must be lower than 180'),
  // REGISTRATION
  registration_url: yup
    .string()
    .url('Not a valid url')
    .required('A valid url is required'),
  registration_start_date: yup
    .date()
    .required()
    .typeError('This field is required'),
  registration_end_date: yup
    .date()
    .required()
    .typeError('This field is required')
    .min(
      yup.ref('registration_start_date'),
      "End date/time can't be before Start date/time"
    ),
  speaker_call_start_date: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  speaker_call_end_date: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(
      yup.ref('speaker_call_start_date'),
      "End date/time can't be before Start date/time"
    ),
  call_for_speakers_link: yup.string().url('Not a valid url'),
  call_for_sponsors_link: yup.string().url('Not a valid url'),
  sponsor_call_start_date: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  sponsor_call_end_date: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(
      yup.ref('sponsor_call_start_date'),
      "End date/time can't be before Start date/time"
    ),
  // IMAGES
  banner_image: yup.mixed().required('This field is required'),
  banner_image_rights: yup.boolean(),
  banner_image_attribution_text: yup.string().when(BANNER_IMAGE_RIGHTS, {
    is: false,
    then: yup.string().required('This field is required'),
  }),
  banner_image_attribution_link: yup.string().when(BANNER_IMAGE_RIGHTS, {
    is: false,
    then: yup
      .string()
      .url('Not a valid url')
      .required('A valid url is required'),
  }),
  preview_image: yup.mixed().required('This field is required'),
  preview_image_rights: yup.boolean(),
  preview_image_attribution_text: yup.string().when(PREVIEW_IMAGE_RIGHTS, {
    is: false,
    then: yup.string().required('This field is required'),
  }),
  preview_image_attribution_link: yup.string().when(PREVIEW_IMAGE_RIGHTS, {
    is: false,
    then: yup.string().url().required('A valid url is required'),
  }),
});

export const EventForm: FunctionComponent<EventFormProps> = ({ eventId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [eventCreatedModalOpen, setEventCreatedModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      banner_image_rights: false,
      preview_image_rights: false,
      home_content: '<div></div>',
      schedule_content: '<div></div>',
      speakers_content: '<div></div>',
      sessions_content: '<div></div>',
      status: 'pending',
    },
    resolver: yupResolver(schema),
  });

  watch([BANNER_IMAGE_RIGHTS, PREVIEW_IMAGE_RIGHTS]);

  const setUpdateValues = async () => {
    if (eventId) {
      /* eslint-disable camelcase */
      setLoading(true);
      const {
        PartitionKey,
        RowKey,
        Timestamp,
        'odata.etag': etag,
        ...updateData
      } = await getEvent(HARD_CODE_CLIENT_ID, eventId);

      reset(updateData);
      setLoading(false);
      /* eslint-enable */
    }
  };

  useEffect(() => {
    setUpdateValues();
  }, []);

  const [steps, setSteps] = useState<EventStep[]>([
    {
      id: 'Step 1',
      name: 'General',
      status: 'current',
    },
    {
      id: 'Step 2',
      name: 'Images',
      status: 'upcoming',
    },
    {
      id: 'Step 3',
      name: 'Location',
      status: 'upcoming',
    },
    {
      id: 'Step 4',
      name: 'Registration, Speakers & Sponsors',
      status: 'upcoming',
    },
    {
      id: 'Step 5',
      name: 'Page Content',
      status: 'upcoming',
    },
  ]);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (formData: FormInputs, e: BaseSyntheticEvent) => {
    const direction = e.target[0].innerText.toLowerCase();
    if (direction === 'previous') previousStep();
    if (direction === 'next') nextStep();

    setLoading(true);

    const container = 'events';
    const folder = `${DateTime.fromJSDate(formData[START_DATE]).toFormat(
      'yyyy'
    )}/${eventId || uuidv4()}`;

    const [uploadedBannerImage, uploadedPreviewImage, sponsorProspectusImage] =
      getValues<any>([BANNER_IMAGE, PREVIEW_IMAGE, SPONSOR_PROSPECTUS]);

    const bannerImagesPromise = async () => {
      const result = await uploadBlob(uploadedBannerImage, container, folder);
      if (result) formData[BANNER_IMAGE] = result;
    };

    const previewImagesPromise = async () => {
      const result = await uploadBlob(uploadedPreviewImage, container, folder);
      if (result) formData[PREVIEW_IMAGE] = result;
    };

    const sponsorProspectusPromise = async () => {
      const result = await uploadBlob(
        sponsorProspectusImage,
        container,
        folder
      );
      if (result) formData[SPONSOR_PROSPECTUS] = result;
    };

    await Promise.all([
      bannerImagesPromise(),
      previewImagesPromise(),
      sponsorProspectusPromise(),
    ]);

    const createEventResult = await upsertEvent(
      HARD_CODE_CLIENT_ID,
      eventId,
      formData
    );

    if (createEventResult) setEventCreatedModalOpen(true);

    setLoading(false);
  };

  const updateSteps = (currentStepIndex: number) => {
    const updatedSteps = steps.map((step, i) => {
      if (currentStepIndex === i) {
        return {
          ...step,
          status: 'complete',
        };
      }
      return step;
    });
    setSteps(updatedSteps);
  };

  const completeStep = async (e: BaseSyntheticEvent) => {
    const hasBannerImageRights = getValues(BANNER_IMAGE_RIGHTS);
    const hasPreviewImageRights = getValues(PREVIEW_IMAGE_RIGHTS);

    const direction = e.target.innerText.toLowerCase();

    let isValid = false;
    let imageValidation = [BANNER_IMAGE, PREVIEW_IMAGE];

    switch (currentStep) {
      case 0:
        isValid = await trigger([TITLE, CONTACT_EMAIL, START_DATE, END_DATE]);

        break;
      case 1:
        if (!hasBannerImageRights) {
          imageValidation = [
            ...imageValidation,
            BANNER_IMAGE_ATTRIBUTION_LINK,
            BANNER_IMAGE_ATTRIBUTION_TEXT,
          ];
        }
        if (!hasPreviewImageRights) {
          imageValidation = [
            ...imageValidation,
            PREVIEW_IMAGE_ATTRIBUTION_LINK,
            PREVIEW_IMAGE_ATTRIBUTION_TEXT,
          ];
        }
        isValid = await trigger(imageValidation);
        break;
      case 2:
        isValid = await trigger(VALIDATIONS.LOCATION);
        break;
      case 3:
        isValid = await trigger(VALIDATIONS.REGISTRATION_SPEAKERS_SPONSORS);
        break;
      case 4:
        isValid = await trigger([]);
        break;
      default:
        break;
    }

    if (isValid) {
      updateSteps(currentStep);
      if (direction === 'previous') {
        previousStep();
      }
      if (direction === 'next') {
        nextStep();
      }
    }
  };

  const renderSteps = () => {
    switch (currentStep) {
      case 0:
        return <GeneralStep control={control} errors={errors} />;
      case 1:
        return (
          <ImagesStep control={control} errors={errors} getValues={getValues} />
        );
      case 2:
        return <LocationStep control={control} errors={errors} />;
      case 3:
        return (
          <RegistrationStep
            control={control}
            errors={errors}
            getValues={getValues}
          />
        );
      case 4:
        return <ContentStep control={control} />;
      default:
        return null;
    }
  };

  return (
    <>
      {loading && <Loader text="Saving" />}
      <CreateUpdateSuccessModal
        isOpen={eventCreatedModalOpen}
        setIsOpen={setEventCreatedModalOpen}
        isUpdate={Boolean(eventId)}
      />
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <EventSteps steps={steps} />

        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <div className="border-[1px] rounded p-6 bg-white">
            {/* <div
              className="fixed top-0 left-0 bg-white z-50 border-red-700 border-2 hide"
              style={{ zIndex: 9999 }}
            >
              <pre>{JSON.stringify(watch(), null, 2)}</pre>
              <pre>{JSON.stringify(isValid, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </div> */}
            <Form className="relative" onSubmit={handleSubmit(onSubmit)}>
              <EventStepper
                currentStep={currentStep}
                stepsLength={steps.length}
                onComplete={completeStep}
              />
              {renderSteps()}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
