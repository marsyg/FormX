'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { JsonForms } from "@/configs/schema";
import { useEffect,useState } from 'react'
import { and, eq } from "drizzle-orm";
import db from "@/configs/db";
import FormUi from '@/app/edit-form/_components/FormUI';
import { useUser } from "@clerk/nextjs";
const PreviewForm = () => {
  const editable = false ;
    const { user } = useUser();
      const [loading, setLoading] = useState(true);
    const [record, setRecord] = useState([])
    const [jsonForm, setJsonForm] = useState('')
    const params = useParams()
    useEffect(()=>{
  if(params){
    GetFormData()
  }
    },[params])

   
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
        console.log(result)

      
        const parseResult = JSON.parse(result[0].jsonform)
      
        if (parseResult) {
           
        }
        setJsonForm(parseResult)
       
    
    
      };

    
  return (
    <div className='flex justify-center'><FormUi 
    editable={editable}
    jsonForm={jsonForm}
    onFieldUpdate={()=>{}}
   
    ></FormUi></div>
  )
}

export default PreviewForm