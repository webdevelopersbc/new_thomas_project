import React, { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Form, Segment } from 'semantic-ui-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { PageLayout } from '@components';

const schema = yup.object().shape({
  name: yup.string().required('This field Is Required'),
  email: yup.string().email().required('Please Enter Valid Email'),
  message: yup.string().required('This field Is Required'),
  captcha: yup.mixed().required('This field Is Required'),
});

const Contact = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (_formData: unknown, e?: BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
  };

  return (
    <PageLayout title="Contact" invert>
      <>
        <p className="mb-12">
          We would love to hear your feedback. Please leave us a message below
          and we will get back to you shortly
        </p>
        <Form onSubmit={handleSubmit(onSubmit)} id="contactForm">
          <div className="grid grid-cols-2 w-full gap-8">
            <Segment className="!m-0">
              <Form.Field>
                <label>Name</label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...renderProps } }) => (
                    <Form.Input
                      id="inputID"
                      {...renderProps}
                      placeholder="Enter Your Name"
                      error={errors?.name?.message}
                    />
                  )}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...renderProps } }) => (
                    <Form.Input
                      {...renderProps}
                      id="inputID"
                      placeholder="Enter Your Email"
                      error={errors?.email?.message}
                    />
                  )}
                />
              </Form.Field>
              <Form.Field>
                <label>Message</label>
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...renderProps } }) => (
                    <Form.TextArea
                      {...renderProps}
                      id="inputID"
                      placeholder="Enter Your Message Here"
                      error={errors?.message?.message}
                    />
                  )}
                />
              </Form.Field>
              <Form.Field />
            </Segment>
          </div>
          <Button className="!mt-8" type="submit">
            Submit
          </Button>
        </Form>
      </>
    </PageLayout>
  );
};

export default Contact;
