import * as yup from 'yup';

export const tutorValidationSchema = yup.object().shape({
  profile_info: yup.string(),
  user_id: yup.string().nullable(),
});
