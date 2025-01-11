"use client";
import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import templateArray from "@/template";

function templateUi({}) {
  const Params = useParams();
  const id = Params.templateId;
  const jsonForm = templateArray[id];

  const [formData, setFormData] = useState({});
  const formRef = useRef();

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    formRef.current.reset();
    setFormData({});
  };

  if (!jsonForm || Object.keys(jsonForm).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading form...
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen">
      <Card className="w-full max-w-2xl mx-auto my-8 shadow-md rounded-lg">
        <form ref={formRef} onSubmit={handleFormSubmit}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              {jsonForm.formTitle}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {jsonForm.formSubheading}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {jsonForm.formFields.map((field, index) => (
              <div key={index} className="space-y-2">
                <Label
                  htmlFor={field.formName}
                  className="text-sm font-medium text-gray-700"
                >
                  {field.formLabel}
                  {field.fieldRequired && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>

                {field.fieldType === "select" && field.options?.length > 0 && (
                  <Select
                    onValueChange={(value) =>
                      handleFormSelectChange(field.formName, value)
                    }
                  >
                    <SelectTrigger className="w-full border-gray-300 rounded-md">
                      <SelectValue placeholder={field.placeholderName} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option, i) => (
                        <SelectItem key={i} value={option.value || option}>
                          {option.label || option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {field.fieldType === "radio" && field.options?.length > 0 && (
                  <RadioGroup
                    className="space-y-2"
                    onValueChange={(value) =>
                      handleFormSelectChange(field.formName, value)
                    }
                  >
                    {field.options.map((option, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem
                          id={`${field.formName}-${i}`}
                          value={option.value || option}
                        />
                        <Label
                          htmlFor={`${field.formName}-${i}`}
                          className="text-gray-700"
                        >
                          {option.label || option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {field.fieldType === "checkbox" &&
                  field.options?.length > 0 && (
                    <div className="space-y-2">
                      {field.options.map((option, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${field.formName}-${i}`}
                            value={option.value || option}
                            onCheckedChange={(checked) =>
                              handleFormSelectChange(field.formName, {
                                ...formData[field.formName],
                                [option.value || option]: checked,
                              })
                            }
                          />
                          <Label
                            htmlFor={`${field.formName}-${i}`}
                            className="text-gray-700"
                          >
                            {option.label || option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}

                {["text", "email", "password", "tel"].includes(
                  field.fieldType
                ) && (
                  <Input
                    type={field.fieldType}
                    id={field.formName}
                    placeholder={field.placeholderName}
                    name={field.formName}
                    required={field.fieldRequired}
                    className="border-gray-300 rounded-md"
                    onChange={handleFormInputChange}
                  />
                )}

                {field.fieldType === "textarea" && (
                  <textarea
                    id={field.formName}
                    name={field.formName}
                    placeholder={field.placeholderName}
                    required={field.fieldRequired}
                    className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
                    onChange={handleFormInputChange}
                  ></textarea>
                )}
              </div>
            ))}
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </Button>
          </CardContent>
        </form>
      </Card>
    </ScrollArea>
  );
}

export default templateUi;
