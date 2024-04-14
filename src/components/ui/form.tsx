"use client";

import {
  createContext,
  forwardRef,
  use,
  type ComponentPropsWithoutRef,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  Control as FormControl,
  ValidityState as FormValidityState,
  Message,
  Root,
  Field,
  Label,
  Submit,
} from "@radix-ui/react-form";
import { ReloadIcon } from "@radix-ui/react-icons";

import { cn, twc } from "@/lib/tailwind";
import { Label as ShadcnLabel } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type FormContextValue = { errors?: Record<string, string[]> };
const FormContext = createContext<FormContextValue>({ errors: {} });

type FormRootProps = Omit<ComponentPropsWithoutRef<typeof Root>, "action"> & {
  action: (
    state: FormContextValue,
    formData: FormData,
  ) => Promise<FormContextValue>;
};
const FormRoot = forwardRef<HTMLFormElement, FormRootProps>(
  ({ action, ...props }, ref) => {
    const [state, formAction] = useFormState(action, { errors: {} });
    return (
      <FormContext.Provider value={state}>
        <Root {...props} action={formAction} ref={ref} {...props} />
      </FormContext.Provider>
    );
  },
);
FormRoot.displayName = "FormRoot";

const FormMessage = twc(Message)`text-sm font-medium text-destructive`;
FormMessage.displayName = "FormMessage";

const FormField = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Field>
>(({ className, children, name, ...props }, ref) => {
  const state = use(FormContext);

  return (
    <Field
      {...props}
      className={cn("space-y-2", className)}
      name={name}
      ref={ref}
      serverInvalid={!!state.errors?.[name]}
    >
      {children}
      {state.errors?.[name]?.map((error) => (
        <FormMessage key={error}>{error}</FormMessage>
      ))}
    </Field>
  );
});
FormField.displayName = "FormField";

const FormLabel = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label asChild>
    <ShadcnLabel
      {...props}
      className={cn("data-[invalid]:text-destructive", className)}
    />
  </Label>
));
FormLabel.displayName = "FormLabel";

const FormSubmit = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof Button>
>(({ className, children, ...props }, ref) => {
  const status = useFormStatus();

  return (
    <Submit asChild>
      <Button>
        {status.pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    </Submit>
  );
});
FormSubmit.displayName = "FormSubmit";

export {
  FormControl,
  FormValidityState,
  FormMessage,
  FormRoot,
  FormField,
  FormLabel,
  FormSubmit,
};
