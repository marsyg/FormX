import { Input } from "@/components/ui/input";
import React, { use } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormEdit from "./FormEdit";
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function FormUi({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  editable,
}) {
  const params = useParams();
  const [formData, setFormData] = useState({});
  let formRef = useRef();

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Implement form submission logic here
    formRef.current.reset();
  };

  if (!jsonForm || Object.keys(jsonForm).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen">
      <Card
        className="w-full max-w-2xl mx-auto my-8"
        data-theme={selectedTheme}
      >
        <form ref={formRef} onSubmit={FormSubmit}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              {jsonForm?.formTitle}
            </CardTitle>
            <CardDescription className="text-center">
              {jsonForm?.formSubheading}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {jsonForm?.formFields.map((field, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={field.formName} className="text-sm font-medium">
                  {field.formLabel}
                  {field.fieldRequired && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>

                {field.fieldType === "select" && field.options.length > 0 && (
                  <Select
                    onValueChange={(v) =>
                      handleFormSelectChange(field.formName, v)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.placeholderName} />
                    </SelectTrigger>
                    <SelectContent>
                      {field?.options.map((item, optionIndex) => (
                        <SelectItem key={optionIndex} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {field.fieldType === "radio" && field.options.length > 0 && (
                  <RadioGroup
                    defaultValue={field.options[0].value}
                    className="flex flex-col space-y-1"
                  >
                    {field.options.map((item, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={item.value}
                          id={`${field.formName}-${item.value}`}
                        />
                        <Label htmlFor={`${field.formName}-${item.value}`}>
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {field.fieldType === "checkbox" && field.options.length > 0 && (
                  <div className="space-y-2">
                    {field.options.map((item, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={`${field.formName}-${item.value}`} />
                        <Label htmlFor={`${field.formName}-${item.value}`}>
                          {item.label}
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
                    onChange={handleFormInputChange}
                  />
                )}

                {field.fieldType === "textarea" && (
                  <textarea
                    id={field.formName}
                    placeholder={field.placeholderName}
                    name={field.formName}
                    required={field.fieldRequired}
                    className="w-full p-2 border border-input bg-background rounded-md min-h-[100px]"
                    onChange={handleFormInputChange}
                  />
                )}

                {editable && (
                  <FormEdit
                    defaultValue={field}
                    deleteField={() => deleteField(index)}
                    onUpdate={(value) => onFieldUpdate(value, index)}
                  />
                )}
              </div>
            ))}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardContent>
        </form>
      </Card>
    </ScrollArea>
  );
}

export default FormUi;
