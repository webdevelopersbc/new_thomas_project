import React, { FunctionComponent } from 'react';
import {
  Control,
  Controller,
  DeepRequired,
  FieldErrorsImpl,
  UseFormGetValues,
} from 'react-hook-form';
import { Form, Popup, Message, Icon, List, Checkbox } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FormInputs } from '@components';
import {
  BANNER_IMAGE,
  BANNER_IMAGE_ATTRIBUTION_LINK,
  BANNER_IMAGE_ATTRIBUTION_TEXT,
  BANNER_IMAGE_RIGHTS,
  PREVIEW_IMAGE,
  PREVIEW_IMAGE_ATTRIBUTION_LINK,
  PREVIEW_IMAGE_ATTRIBUTION_TEXT,
  PREVIEW_IMAGE_RIGHTS,
} from '@constants';
import Image from 'next/image';

export type ImagesStepProps = {
  control: Control<FormInputs>;
  errors: FieldErrorsImpl<DeepRequired<FormInputs>>;
  getValues: UseFormGetValues<FormInputs>;
};

export const ImagesStep: FunctionComponent<ImagesStepProps> = ({
  control,
  errors,
  getValues,
}) => (
  <section>
    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Images
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Tell us about your event.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-5">
          {/* Banner Image */}
          <Form.Field
            required
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <Popup
              trigger={
                <label
                  htmlFor={BANNER_IMAGE}
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Banner Image
                  <FontAwesomeIcon icon={faCircleInfo} className="pl-1" />
                </label>
              }
            >
              <Popup.Header>Banner Image</Popup.Header>
              <Popup.Content>
                <Image
                  alt="Banner Image Preview"
                  src="/images/banner_image_tip.png"
                />
              </Popup.Content>
            </Popup>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <Message icon>
                <Icon name="file image" />
                <Message.Content>
                  <Message.Header>Large Banner Image</Message.Header>
                  <Message.List>
                    <Message.Item>
                      This image will be used upcoming, previous &amp; event
                      finder
                    </Message.Item>
                    <Message.Item>
                      For best results provide and image 2200 x 1200
                    </Message.Item>
                  </Message.List>
                </Message.Content>
              </Message>
              <Controller
                name={BANNER_IMAGE}
                control={control}
                render={({ field }) => {
                  const uploadedBannerImage = getValues(BANNER_IMAGE);
                  return (
                    <>
                      <Dropzone
                        {...field}
                        ref={null}
                        onDrop={(acceptedFiles) => {
                          field.onChange(acceptedFiles[0]);
                        }}
                        multiple={false}
                        accept={{
                          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
                        }}
                      >
                        {({ getRootProps }) => (
                          <section className="container border-2 border-dashed p-8 cursor-pointer">
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
                            {uploadedBannerImage?.name && (
                              <aside>
                                <List bulleted>
                                  <List.Item>
                                    {uploadedBannerImage.path} -
                                    {uploadedBannerImage.size} bytes
                                  </List.Item>
                                </List>
                              </aside>
                            )}
                            {uploadedBannerImage &&
                              typeof uploadedBannerImage === 'string' && (
                                <img
                                  alt="upload_banner"
                                  src={String(uploadedBannerImage)}
                                />
                              )}
                          </section>
                        )}
                      </Dropzone>
                      <Form.Input
                        style={{ display: 'none' }}
                        error={errors?.banner_image?.message}
                      />
                    </>
                  );
                }}
              />
            </div>
          </Form.Field>
          {/* Banner Image */}

          {/* Banner Image Rights */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={BANNER_IMAGE_RIGHTS}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Banner Image Rights
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <Controller
                name={BANNER_IMAGE_RIGHTS}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e, data) => {
                      field.onChange(data.checked);
                    }}
                    label="I have the rights to use this photo. If not you must provide attribution"
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* Banner Image Rights */}

          {/* Banner Attribution */}
          {!getValues(BANNER_IMAGE_RIGHTS) && (
            <>
              <Form.Field
                required={!getValues(BANNER_IMAGE_RIGHTS)}
                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  htmlFor={BANNER_IMAGE_ATTRIBUTION_TEXT}
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Attribution Text
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-1">
                  <Controller
                    name={BANNER_IMAGE_ATTRIBUTION_TEXT}
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Form.Input
                        {...field}
                        ref={null}
                        placeholder="Attribution Text"
                        error={errors?.banner_image_attribution_text?.message}
                      />
                    )}
                  />
                </div>
              </Form.Field>

              <Form.Field
                required={!getValues(BANNER_IMAGE_RIGHTS)}
                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  htmlFor={BANNER_IMAGE_ATTRIBUTION_LINK}
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Attribution Link
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-1">
                  <Controller
                    name={BANNER_IMAGE_ATTRIBUTION_LINK}
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Form.Input
                        {...field}
                        ref={null}
                        placeholder="Attribution Link"
                        error={errors?.banner_image_attribution_link?.message}
                      />
                    )}
                  />
                </div>
              </Form.Field>
            </>
          )}
          {/* Banner Attribution */}

          {/* Preview Image */}

          <Form.Field
            required
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <Popup
              trigger={
                <label
                  htmlFor={PREVIEW_IMAGE}
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Preview Image{' '}
                  <FontAwesomeIcon icon={faCircleInfo} className="pl-1" />
                </label>
              }
            >
              <Popup.Header>Preview Image</Popup.Header>
              <Popup.Content>
                <Image
                  alt="Preview Image Preview"
                  src="/images/preview_image_tip.png"
                />
              </Popup.Content>
            </Popup>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <Message icon>
                <Icon name="file image" />
                <Message.Content>
                  <Message.Header>Preview Image</Message.Header>
                  <Message.List>
                    <Message.Item>
                      This image will be used upcoming, previous &amp; event
                      finder
                    </Message.Item>
                    <Message.Item>
                      For best results provide and image 400 x 300
                    </Message.Item>
                  </Message.List>
                </Message.Content>
              </Message>

              <Controller
                name={PREVIEW_IMAGE}
                control={control}
                render={({ field }) => {
                  const uploadedPreviewImage = getValues(PREVIEW_IMAGE);
                  return (
                    <>
                      <Dropzone
                        {...field}
                        ref={null}
                        onDrop={(acceptedFiles) => {
                          field.onChange(acceptedFiles[0]);
                        }}
                        multiple={false}
                        accept={{
                          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
                        }}
                      >
                        {({ getRootProps }) => (
                          <section className="container border-2 border-dashed p-8 cursor-pointer">
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
                            {uploadedPreviewImage?.name && (
                              <aside>
                                <List bulleted>
                                  <List.Item>
                                    {uploadedPreviewImage.path} -
                                    {uploadedPreviewImage.size} bytes
                                  </List.Item>
                                </List>
                              </aside>
                            )}
                            {uploadedPreviewImage &&
                              typeof uploadedPreviewImage === 'string' && (
                                <img
                                  alt="uploaded_preview_image"
                                  src={String(uploadedPreviewImage)}
                                />
                              )}
                          </section>
                        )}
                      </Dropzone>{' '}
                      <Form.Input
                        style={{ display: 'none' }}
                        error={errors?.preview_image?.message}
                      />
                    </>
                  );
                }}
              />
            </div>
          </Form.Field>
          {/* Preview Image */}

          {/* Preview Image Rights */}
          <Form.Field className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor={PREVIEW_IMAGE_RIGHTS}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Preview Image Rights
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <Controller
                name={PREVIEW_IMAGE_RIGHTS}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e, data) => {
                      field.onChange(data.checked);
                    }}
                    label="I have the rights to use this photo. If not you must provide attribution"
                  />
                )}
              />
            </div>
          </Form.Field>
          {/* Preview Image */}

          {/* Preview Image Rights */}
          {!getValues(PREVIEW_IMAGE_RIGHTS) && (
            <>
              <Form.Field
                required={!getValues(PREVIEW_IMAGE_RIGHTS)}
                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  htmlFor={PREVIEW_IMAGE_ATTRIBUTION_TEXT}
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Attribution Text
                </label>
                <Controller
                  name={PREVIEW_IMAGE_ATTRIBUTION_TEXT}
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Form.Input
                      {...field}
                      ref={null}
                      placeholder="Attribution Text"
                      error={errors?.preview_image_attribution_text?.message}
                    />
                  )}
                />
              </Form.Field>
              <Form.Field
                required={!getValues(PREVIEW_IMAGE_RIGHTS)}
                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
              >
                <label
                  htmlFor={PREVIEW_IMAGE_ATTRIBUTION_LINK}
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Attribution Link
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-1">
                  <Controller
                    name={PREVIEW_IMAGE_ATTRIBUTION_LINK}
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Form.Input
                        {...field}
                        ref={null}
                        placeholder="Attribution Link"
                        error={errors?.preview_image_attribution_link?.message}
                      />
                    )}
                  />
                </div>
              </Form.Field>
            </>
          )}
          {/* Preview Image Rights */}
        </div>
      </div>
    </div>
  </section>
);
