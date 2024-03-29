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
    } else if (field === "username" && props[field]?.length < 4) {
      errors.push({ field, message: "must have at least 4 characters!" });
    } else if (field === "password" && props[field]?.length < 6) {
      errors.push({ field, message: "must have at least 6 characters!" });
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

export function getServerErrors(code: number) {
  if (code === 401) {
    return [{ field: "", message: "Invalid credencials" }];
  } else if (code === 404) {
    return [{ field: "", message: "User not found" }];
  } else if (code === 409) {
    return [{ field: "", message: "User already exists" }];
  } else {
    return [{ field: "", message: "Service unavailable. Try again later" }];
  }
}
