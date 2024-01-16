import { FieldLabel, IError } from "@/app/types";
import { FORM_FIELDS, LOGIN, SIGNUP } from "@/utils/constants";

type ValidateAuthProps =
  | {
      type: typeof LOGIN;
      username: string;
      password: string;
    }
  | {
      type: typeof SIGNUP;
      username: string;
      password: string;
      confirmPassword: string;
    };

export function validateAuth(props: ValidateAuthProps) {
  const errors: IError[] = [];

  const fields =
    props.type === SIGNUP
      ? Object.values(FORM_FIELDS)
      : [FORM_FIELDS.username, FORM_FIELDS.password];

  fields.forEach((field: FieldLabel) => {
    // TODO handle typescript error
    // @ts-ignore
    if (!props[field]) {
      errors.push({ field, message: "can not be blank!" });
    }
  });

  if (props.type === SIGNUP && props.password !== props.confirmPassword) {
    errors.push({
      field: FORM_FIELDS.confirmPassword,
      message: "Passwords don't match!",
    });
  }

  return errors;
}
