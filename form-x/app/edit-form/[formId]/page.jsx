"use client";

import db from "@/configs/db";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import FormUi from '../_components/FormUI'
import Controller from '../_components/Controller'
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"

export default function EditForm({ params }) {
  const { user } = useUser();
  const [record, setRecord] = useState([])
  const [jsonForm, setJsonForm] = useState('')
  const [updateTrigger, setUpdateTrigger] = useState()
  const [selectedTheme ,setSelectedTheme] = useState('light')
  const [loading, setLoading] = useState(true);
 const editable= true
  useEffect(() => {
    if (user) {
      GetFormData();
      console.log(jsonForm)
    }
  }, [user])
  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm)
      updateJsonFormInDb()
    }
  }, [updateTrigger])
  const onFieldUpdate = (value, index) => {
    console.log(value.label,"Field update value from edit-form page")
    jsonForm.formFields[index].formLabel = value.label
    jsonForm.formFields[index].placeholderName = value.placeholder
    setUpdateTrigger(Date.now())
  }

  const updateJsonFormInDb = async () => {
    const result = await db.update(JsonForms)
      .set({
        jsonform: jsonForm
      }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
      .returning({ id: JsonForms.id })
    
  }
  const deleteField = (indexToRemove) => {
    const result = jsonForm.formFields.filter((field, index) => index !== indexToRemove)
    jsonForm.formFields = result
    setUpdateTrigger(Date.now())
  }
  const updateControllerFields = async (value, columnName) => {
    const result = await db.update(JsonForms).set({
      [columnName]: value
        .where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
        .returning({ id: JsonForms.id })
    })
  }
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
    setRecord(result[0])
    // console.log(result[0].jsonform,"from edit form ");

    const parseres = JSON.parse(result[0].jsonform)
    // console.log(parseres,"json parsed--------")
    if (parseres) {
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
       <div className="flex flex-row justify-between">
       <h2 className="flex w-full gap-2 items-center hover:scale-50 my-5 cursor-pointer">
          <ArrowLeft className="" />
          Back
        </h2>
        <div className="flex mt-3  flex-row">
        <Button className="mx-2"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
</svg> 
Share</Button>
    <Link href={`/Form/${record.id}`}>
     <Button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
Preview</Button></Link>
        </div>

       </div>
        
        <div className="flex w-full">
          <div className="card bg-base-300 rounded-box grid w-80 h-screen place-items-center mr-4 mb-4"><Controller setSelectedTheme={(value)=>setSelectedTheme(value)} /></div>
          <div className="card bg-base-300 rounded-box flex h-screen w-full place-items-center">
            <FormUi
              loading={loading}
              selectedTheme={selectedTheme}
              onFieldUpdate={onFieldUpdate}
              jsonForm={jsonForm}
              deleteField={(index) => deleteField(index)}
              editable={editable}
            ></FormUi></div>
        </div>
      </div>
    </div>
  )
}