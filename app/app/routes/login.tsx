import { Layout } from "~/components/layout"
import { FormField } from "~/components/form-field"
import { useState } from "react"
import { ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import { validateEmail, validatePassword, validateName } from "~/utils/validators.server";
import { login, register } from "~/utils/auth.server";
import { useActionData } from "@remix-run/react";
import { useRef, useEffect } from 'react';

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let firstName = form.get("firstname");
  let lastName = form.get("lastname");

  if (
    typeof action != "string" ||
    typeof email != "string" ||
    typeof password != "string"
  ) {
    return json({error: "invalid form data", form: action}, {status: 400});
  };

  if (
    action == "register" && (
      typeof firstName != "string" ||
      typeof lastName != "string"
    )
  ) {
    return json({error: "invalid form data", form: action}, {status: 400});
  };

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action == "register" ? {
      firstName: validateName(firstName as string || ""),
      lastName: validateName(lastName as string || ""),
    }: {})
  };

  if (Object.values(errors).some(Boolean)) {
    console.log("obj values");
    return json({errors, fields: {email, password, firstName, lastName}, form: action}, {status: 400});
  }

  switch(action) {
    case "login": {
      return await login({email, password});
    }
    case "register": {
      firstName = firstName as string;
      lastName = lastName as string;
      return await register({email, password, firstName, lastName})
    }
    default: return json({error: "invalid form data"}, {status: 400})
  }
};

export default function Login() {
  const actionData = useActionData();
  const [formError, setFormError] = useState(actionData?.error || "");
  const [errors, setErrors] = useState(actionData?.errors || {});
  const firstLoad = useRef(true);

  const [action, setAction] = useState('login');

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password || '',
    firstName: actionData?.fields?.firstName || '',
    lastName: actionData?.fields?.lastName || ''
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData ( form => ({
      ...form,
      [field]: event.target.value
    }))
  }

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }
      setErrors(newState)
      setFormError('')
      setFormData(newState)
    }
  }, [action])

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError('')
    }
  }, [formData])

  useEffect(() => { firstLoad.current = false }, [])

  return (
    <Layout>
      <div className="h-full flex justify-center items-center flex-col gap-y-4">
        
      <button
        onClick={() => setAction(action == 'login' ? 'register' : 'login')}
        className="absolute top-8 right-8 bg-zinc-200 rounded-xl font-semibold p-1.5"
      >
        {action === 'login' ? 'Sign Up' : 'Sign In'}
      </button>
        
        
        <h2 className="text-5xl font-extrabold text-emerald-300">
          welcome
        </h2>
          
        <p className="font-semibold">{action == 'login' ? 'login' : 'sign up'}</p>

        <form method="POST" className="rounded-2xl bg-zinc-400 p-6 w-96">
          <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
            {formError}
          </div>
          <FormField
            htmlFor = "email"
            label = "Email"
            value = {formData.email}
            onChange = {e => handleInputChange(e, 'email')}
            error = {errors?.email}
          />

          <FormField
            htmlFor = "password"
            label = "Password"
            type = "password"
            value = {formData.password}
            onChange = {e => handleInputChange(e, 'password')}
            error = {errors?.password}
          />

          {
            action != 'login' ? <>
              <FormField
                htmlFor = "firstname"
                label = "First name"
                value = {formData.firstName}
                onChange = {e => handleInputChange(e, 'firstName')}
                error = {errors?.firstName}
              />

              <FormField
                htmlFor = "lastname"
                label = "Last name"
                value = {formData.lastName}
                onChange = {e => handleInputChange(e, 'lastName')}
                error = {errors?.lastName}
              />
            </> : null
          }

          <div className="w-full text-center">
          <button type="submit" name="_action" value={action} className="bg-zinc-200 rounded-xl font-semibold p-1.5 mt-2">{action == 'login' ? 'login' : 'sign up'}</button>
          </div>           
        </form>
      </div>
    </Layout>
  )
}
  