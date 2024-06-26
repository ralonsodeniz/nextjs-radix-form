import {
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
  FormRoot,
  FormSubmit,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/form";

const Login = () => (
  <FormRoot action={login}>
    <FormField name="email">
      <FormLabel>Email</FormLabel>
      <FormControl asChild>
        <Input type="email" required />
      </FormControl>
      <FormMessage match="valueMissing">Email is required</FormMessage>
      <FormMessage match="typeMismatch">
        Please provide a valid email address
      </FormMessage>
    </FormField>
    <FormField name="password">
      <FormLabel>Password</FormLabel>
      <FormControl asChild>
        <Input type="password" required />
      </FormControl>
      <FormMessage match="valueMissing">Password is required</FormMessage>
    </FormField>
    <FormSubmit>Log in</FormSubmit>
  </FormRoot>
);

export default Login;
