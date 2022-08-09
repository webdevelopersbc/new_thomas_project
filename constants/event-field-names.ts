export const TITLE = 'title';
export const CONTACT_EMAIL = 'contact_email';
export const LOCATION_NAME = 'location';
export const CITY = 'city';
export const STATE_PROVINCE = 'state_province';
export const POSTAL_CODE = 'postal_code';
export const COUNTRY = 'country';
export const LATITUDE = 'latitude';
export const LONGITUDE = 'longitude';
export const ADDRESS1 = 'address1';
export const ADDRESS2 = 'address2';
export const START_DATE = 'start_date';
export const END_DATE = 'end_date';
export const REGISTRATION_URL = 'registration_url';
export const REGISTRATION_START_DATE = 'registration_start_date';
export const REGISTRATION_END_DATE = 'registration_end_date';
export const SESSIONIZE_KEY = 'sessionize_key';
export const SPEAKER_CALL_START_DATE = 'speaker_call_start_date';
export const SPEAKER_CALL_END_DATE = 'speaker_call_end_date';
export const SPONSOR_CALL_START_DATE = 'sponsor_call_start_date';
export const SPONSOR_CALL_END_DATE = 'sponsor_call_end_date';
export const SPONSOR_PROSPECTUS = 'sponsor_prospectus';
export const BANNER_IMAGE = 'banner_image';
export const BANNER_IMAGE_RIGHTS = 'banner_image_rights';
export const BANNER_IMAGE_ATTRIBUTION_TEXT = 'banner_image_attribution_text';
export const BANNER_IMAGE_ATTRIBUTION_LINK = 'banner_image_attribution_link';
export const PREVIEW_IMAGE = 'preview_image';
export const PREVIEW_IMAGE_RIGHTS = 'preview_image_rights';
export const PREVIEW_IMAGE_ATTRIBUTION_TEXT = 'preview_image_attribution_text';
export const PREVIEW_IMAGE_ATTRIBUTION_LINK = 'preview_image_attribution_link';
export const EVENT_TYPE = 'event_type';
export const STATUS = 'status';
export const CALL_FOR_SPEAKERS_LINK = 'call_for_speakers_link';
export const CALL_FOR_SPONSORS_LINK = 'call_for_sponsors_link';
export const HOME_CONTENT = 'home_content';
export const SESSIONS_CONTENT = 'sessions_content';
export const SPEAKERS_CONTENT = 'speakers_content';
export const SPONSORS_CONTENT = 'sponsors_content';
export const SCHEDULE_CONTENT = 'schedule_content';

export const VALIDATIONS = {
  GENERAL: [TITLE, CONTACT_EMAIL, START_DATE, END_DATE],
  IMAGES: [BANNER_IMAGE, PREVIEW_IMAGE],
  LOCATION: [EVENT_TYPE, ADDRESS1, CITY, STATE_PROVINCE, POSTAL_CODE, COUNTRY],
  REGISTRATION_SPEAKERS_SPONSORS: [
    REGISTRATION_URL,
    REGISTRATION_START_DATE,
    REGISTRATION_END_DATE
  ]
};
