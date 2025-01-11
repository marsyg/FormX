"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { JsonForms } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import db from "@/configs/db";
import { useState, useEffect } from "react";
import FormListItem from "./FormListItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
const FormList = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFormList();
    }
  }, [user]);
  console.log(user?.primaryEmailAddress?.emailAddress, "this is wierd--------");
  const GetFormList = async () => {
    console.log("fuction called ");
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    console.log(result, "is this empty  ");
    console.log("reached here");
    setFormList(result);
  };
  return (
    <>
      <ScrollArea>
        <div className="flex flex-row">
          {formList.map((value, index) => (
            <FormListItem key={index} jsonData={JSON.parse(value.jsonform)} />
          ))}
        </div>
        <ScrollBar orientation="horizontal"></ScrollBar>
      </ScrollArea>
    </>
  );
};

export default FormList;
