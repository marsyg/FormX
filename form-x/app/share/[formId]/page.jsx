"use client";
import React from "react";
import FormUi from "../../edit-form/_components/FormUI";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import db from "@/configs/db";
import { JsonForms } from "@/configs/schema";
import { useParams } from "next/navigation";
import { and, eq } from "drizzle-orm";



const page = () => {
  const router = useRouter();
  const { user } = useUser();
  const [record, setRecord] = useState([]);
  const [jsonForm, setJsonForm] = useState("");

  const [loading, setLoading] = useState(true);
  const params = useParams();
  const editable = true;
  useEffect(() => {
    GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(and(eq(JsonForms.id, params?.formId)));
    setRecord(result[0]);
    const parsedData = JSON.parse(result[0].jsonform);
    if (parsedData) {
      setLoading(false);
    }
    setJsonForm(parsedData);
  };
  return (
    <div>
      <div className="flex justify-center">
        <FormUi
          editable={editable}
          jsonForm={jsonForm}
          onFieldUpdate={() => {}}
        ></FormUi>
      </div>
    </div>
  );
};

export default page;
