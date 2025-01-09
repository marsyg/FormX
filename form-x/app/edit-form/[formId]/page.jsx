"use client";

import db from "@/configs/db";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import FormUi from '../_components/FormUI'

export default function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState('')
  const [loading, setLoading] = useState(true);
  useEffect(  () => {
   if(user){
     GetFormData();
     console.log(jsonForm)
   }
  }, [user])
  const GetFormData = async () => {
    const result = await db.select().from(JsonForms).where(
      and(
        eq(JsonForms.id, params?.formId),
        eq(
          JsonForms.createdBy,
          user?.primaryEmailAddress?.emailAddress
        )
      )
    ); 
    // console.log(result[0].jsonform,"from edit form ");
    
    const parseres = JSON.parse(result[0].jsonform)
    // console.log(parseres,"json parsed--------")
    if(parseres){
      setLoading(false);
    }
    setJsonForm(parseres)
    // console.log(jsonForm,"json form  from edit-form -----")
   
   
  };
  useEffect(() => {
    console.log(jsonForm, "Updated json form from useEffect json -----");
  }, [jsonForm])
  return (
    <div className="flex w-full">
    <div className="flex flex-col w-full">
      <h2 className="flex w-full gap-2 items-center my-5 cursor-pointer">
        <ArrowLeft className="hover:scale-50" /> 
        Back
      </h2>
      <div className="flex w-full"> 
        <div className="card bg-base-300 rounded-box grid w-80 h-screen place-items-center mr-4 mb-4">content</div>
        <div className="card bg-base-300 rounded-box flex h-screen w-full place-items-center"><FormUi loading={loading} jsonForm={jsonForm}></FormUi></div>
      </div>  
    </div>
  </div>
  )
}