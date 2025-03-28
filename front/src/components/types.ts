export type InputProperties =
{ 
    form: import("react-hook-form").UseFormReturn, 
    label: KeyName
    register: import("react-hook-form").UseFormRegisterReturn
    classNames? :
    {
        container: string
        label: string
        control: string
        validator: string
    }
}