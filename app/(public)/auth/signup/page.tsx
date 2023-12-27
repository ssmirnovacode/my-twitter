import Form from "@/app/components/Form";
import { SIGNUP } from "@/utils/constants";

export default async function Signup() {
  return (
    <div>
      <Form endpoint={SIGNUP} />
    </div>
  );
}
