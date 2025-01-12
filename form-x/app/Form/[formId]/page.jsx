"use client";
import React from "react";
import { useParams } from "next/navigation";
import { JsonForms } from "@/configs/schema";
import { useEffect, useState } from "react";
import { and, eq } from "drizzle-orm";
import db from "@/configs/db";
import FormUi from "@/app/edit-form/_components/FormUI";
import { useUser } from "@clerk/nextjs";
import QRCodeGenerator from "../../../qrCodeGenerator";
import { useRouter } from "next/navigation";

const PreviewForm = () => {
  const editable = false;
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState([]);
  const [jsonForm, setJsonForm] = useState("");
  const [url, setUrl] = useState();
  const params = useParams();
  const router = useRouter();
  useEffect(() => {
    setUrl(`https://form-x-pun2-orcin.vercel.app/share/${params?.formId}`);
  }, [router.asPath]);
  useEffect(() => {}, [url]);

  useEffect(() => {
    if (params && user) {
      console.log("get form data called");
      GetFormData();
    }
  }, [params, user]);

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
    if (!result || result.length === 0) {
      console.warn("No records found for the given query.");
      setJsonForm(null);
      return;
    }
    console.log(result[0]?.jsonform);

    const parseResult = JSON.parse(result[0]?.jsonform);

    if (parseResult) {
    }
    setJsonForm(parseResult);
  };

  return (
    <div className="flex justify-center">
      <FormUi
        editable={editable}
        jsonForm={jsonForm}
        onFieldUpdate={() => {}}
      ></FormUi>
      <QRCodeGenerator url={url} />
      <button>Share</button>
    </div>
  );
};

export default PreviewForm;
