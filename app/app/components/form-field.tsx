import { useState, useEffect } from "react"

interface FormFieldAtt{
    htmlFor: string,
    label: string,
    type?: string,
    value: any,
    onChange?: (...args: any) => any,
    error?: string
}

export function FormField({
    htmlFor,
    label,
    type = "text",
    value,
    onChange = () => { },
    error = ""
}: FormFieldAtt) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])

    return <>
        <label htmlFor="{htmlFor}" className="font-semibold">{label}</label>
        <input onChange={e => {
            onChange(e)
            setErrorText('')
        }} type={type} id={htmlFor} name={htmlFor} className="w-full p-2 rounded-xl my-2" value={value}/>
        <div className="text-xs font-semibold text-center w-full tracking-wide text-red-500">
            {errorText || ''}
        </div>
    </>
}