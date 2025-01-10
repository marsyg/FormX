import { Input } from "@/components/ui/input";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FormEdit from "./FormEdit";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function FormUi({ jsonForm, onFieldUpdate, deleteField, selectedTheme ,editable}) {
     const [formData,setFormData] = useState(); 
    
      const handleFormInputChange = (e)=>{
        const {name,value} =e.target 
        setFormData({
          ...FormData,
          [name]:value
        })
    
      }
      console.log(jsonForm)

      const FormSubmit =(e)=>{
        e.preventDefault();
        console.log(formData)
      }
      console.log(jsonForm.formFields[6].options, "form fields ---");
    if (jsonForm !== "") {
        console.log("after loaded ----", {
            jsonForm,
            formTitle: jsonForm?.formTitle,
        });
       
    }

    return (
        <ScrollArea>
            <form
                className={`border p-5 md:w-[600px] rounded-lg`}
                data-theme={selectedTheme}
                onSubmit={FormSubmit}
            > 
                
                {!jsonForm || Object.keys(jsonForm).length === 0 ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex flex-col">
                        <h2 className="font-bold text-center text-2xl">
                            {jsonForm?.formTitle}
                        </h2>
                        <h2 className="text-sm text-gray-400 text-center">
                            {jsonForm?.formSubheading}
                        </h2>

                      
                        {jsonForm?.formFields.map((field, index) => (
                            <div key={index} className="my-3">
                                
                                {field.fieldType === "select" && field.options ? (
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            {field.formLabel}
                                        </label>
                                        <Select>
                                            <SelectTrigger className="w-full bg-transparent">
                                                <SelectValue placeholder={field.placeholderName} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field?.options.map((item, optionIndex) => (
                                                    <SelectItem key={optionIndex} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ) : null}

                              
                                {field.fieldType === "radio" && field.options ? (
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            {field.formLabel}
                                        </label>
                                        <RadioGroup defaultValue={field.options[0].value}>
                                            {field.options.map((item, optionIndex) => (
                                                <div
                                                    key={optionIndex}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <RadioGroupItem value={item.value} id={item.value} />
                                                    <Label htmlFor={item.value}>{item.label}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                ) : null}

                             
                                {field.fieldType === "checkbox" && field.options ? (
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            {field.formLabel}
                                        </label>
                                        {field.options.map((item, optionIndex) => (
                                            <div
                                                key={optionIndex}
                                                className="flex gap-2 my-2 items-center"
                                            >
                                                <Checkbox />
                                                <h2>{item.label}</h2>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}

                               
                                {["text", "email", "password", "tel"].includes(
                                    field.fieldType
                                ) ? (
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            {field.formLabel}
                                        </label>
                                        <Input
                                            type={field.fieldType}
                                            placeholder={field.placeholderName}
                                            name={field.formName}
                                            required={field.fieldRequired}
                                        />
                                    </div>
                                ) : null}

                               
                                {field.fieldType === "textarea" ? (
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            {field.formLabel}
                                        </label>
                                        <textarea
                                            placeholder={field.placeholderName}
                                            name={field.formName}
                                            required={field.fieldRequired}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                ) : null}
                               {
                                editable&&
                                <div>
                                <FormEdit
                                    defaultValue={field}
                                    deleteField={() => deleteField(index)}
                                    onUpdate={(value) => onFieldUpdate(value, index)}
                                ></FormEdit>
                            </div>
                               }
                            </div>
                        ))}
                       <div className="flex justify-end  mt-4">
                       <Button type="submit" className="justify-end  ">Submit</Button>
                       </div>
                    </div>
                )}
            </form>
        </ScrollArea>
    );
}

export default FormUi;
