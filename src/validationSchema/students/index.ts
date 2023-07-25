import * as yup from 'yup';

export const studentValidationSchema = yup.object().shape({
  parent_id: yup.string().nullable(),
  tutor_id: yup.string().nullable(),
});
