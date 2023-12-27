import Form from "@/app/components/Form";
import { LOGIN } from "@/utils/constants";

export default function SignIn() {
  return (
    <div>
      <Form endpoint={LOGIN} />
    </div>
  );
}
