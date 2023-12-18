"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/input/Input";
import {
   FieldValues, SubmitHandler, useForm
} from "react-hook-form"
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const RegisterForm
   = () => {

      const [isLoading, setIsLoading] = useState(false);
      const {
         register, handleSubmit, formState: { errors }
      } = useForm<FieldValues>({
         defaultValues: {
            name: "",
            email: "",
            password: "",
         }
      })
      const router=useRouter();

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
         setIsLoading(true);
         console.log(data);
         axios.post('/api/register',data)

         .then(()=>{
            toast.success('Registered successfully');
            debugger
            signIn('credentials',{
               email:data.email,
               password:data.password,
               redirect:false
            }).then((callback)=>{
               if(callback?.ok){
                  console.log('sai');
                  router.push('/cart')
                  router.refresh();
                  toast.success('Logged In')
               }
               if(callback?.error){
                  toast.error("")
               }
            })
         })
         .catch(()=>{
            toast.error('Something went wrong') 
         })
         .finally(()=>{
            setIsLoading(false);
         })
      }
      return (
         <>
            <Heading title="SignUp for E-shop" center />
            <Button outline label="Sign Up with Google" icon={AiOutlineGoogle} 
            onClick={() => {}} />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
               id="name"
               label="Name"
               disabled={isLoading}
               register={register}
               errors={errors}
               required
            />
            <Input
               id="email"
               label="Email"
               disabled={isLoading}
               register={register}
               errors={errors}
               required
            /><Input
               id="password"
               label="Password"
               disabled={isLoading}
               register={register}
               errors={errors}
               required
               type="password"
            />
            <Button label={isLoading? "Loading" : "Sign Up"} onClick={handleSubmit((onSubmit) )}/>
            <p>Already have an account?
               <Link href="/login" className="underline text-blue-500">Login</Link>
            </p>
         </>
      );
   }

export default RegisterForm
   ;