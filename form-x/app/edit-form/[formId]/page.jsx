"use client";
import { useRouter } from "next/navigation";
import db from "@/configs/db";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, {  useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import FormUi from "../_components/FormUI";
import Controller from "../_components/Controller";
import { useParams } from "next/navigation";

export default function EditForm() {
  const router = useRouter();
  const { user } = useUser();
  const [record, setRecord] = useState([]);
  const [jsonForm, setJsonForm] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [loading, setLoading] = useState(true);
 const params = useParams();
  const handleGoBack = () => router.back();
  const editable = true;
  
  useEffect(() => {
    if (user) {
      GetFormData();
    }
  }, [user]);
console.log(params)
  useEffect(() => {
    if (updateTrigger) {
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value, index) => {
    jsonForm.formFields[index].formLabel = value.label;
    jsonForm.formFields[index].placeholderName = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDb = async () => {
    await db
      .update(JsonForms)
      .set({ jsonform: jsonForm })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
  };

  const deleteField = (indexToRemove) => {
    const updatedFields = jsonForm.formFields.filter(
      (_, index) => index !== indexToRemove
    );
    jsonForm.formFields = updatedFields;
    setUpdateTrigger(Date.now());
  };

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setRecord(result[0]);
    const parsedData = JSON.parse(result[0].jsonform);
    if (parsedData) {
      setLoading(false);
    }
    setJsonForm(parsedData);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
     
      <div className="flex items-center justify-between bg-white shadow-md p-4 sticky top-0 z-50">
        <Button onClick={handleGoBack}>Back</Button>
        <div className="flex space-x-4">
          <Button variant="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            Share
          </Button>
          <Link href={`/Form/${params.formId}`}>
            <Button variant="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Preview
            </Button>
          </Link>
        </div>
      </div>

    
      <div className="flex flex-row w-full p-6 space-x-6">
      
        <div className="card bg-white shadow-lg rounded-md p-4 w-80 h-screen">
          <Controller setSelectedTheme={(value) => setSelectedTheme(value)} />
        </div>

     
        <div className="card bg-white shadow-lg rounded-md flex-1 p-6">
          {loading ? (
            <span className="loading loading-bars loading-lg"></span> 
          ) : (
            <FormUi
              selectedTheme={selectedTheme}
              onFieldUpdate={onFieldUpdate}
              jsonForm={jsonForm}
              deleteField={deleteField}
              editable={editable}
            />
          )}
        </div>
      </div>
    </div>
  );
}
