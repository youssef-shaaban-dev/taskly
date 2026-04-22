import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignUpFormData, signUpSchema } from "../schemas/signUpSchema";
import { SignupService } from "../services/signupService";
import { ROUTES } from "@/constant";
import { toast } from "sonner";

export const useSignUp = () => {
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await SignupService(data);

      toast.success("logged in successfully");

      router.push(ROUTES.HOME);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Network error, please try again.";
      form.setError("root", {
        message: errorMessage,
      });
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
};
