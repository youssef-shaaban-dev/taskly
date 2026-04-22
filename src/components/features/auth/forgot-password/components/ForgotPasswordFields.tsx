import Input from "@/components/ui/Input"
import { Controller, useFormContext } from "react-hook-form"

const ForgotPasswordFields = () => {
    const { formState: { errors }, control } = useFormContext();

    return (
        <Controller
            name='email'
            control={control}
            render={({ field }) =>
                <Input {...field}
                    label='Email Address'
                    type='email'
                    placeholder='yourname@company.com'
                    error={errors.email?.message as string}
                />}
        />
    )
}

export default ForgotPasswordFields;
