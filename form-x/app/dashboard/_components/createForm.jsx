'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,   
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react';

import moment from 'moment/moment';
import db from "@/configs/db";

import ChatSession from '../../../configs/geminiModal'
import { JsonForms } from "@/configs/schema";

import { useUser } from '@clerk/nextjs';

import { useRouter } from 'next/navigation';
const PROMPT = ", On the basis of description please give form in json array  format with form title, form subheading, Form field, form name, placeholder name, and form label,fieldType, field required In Json array format.A valid json array .keep in mind the response should be in a valid json.Dont give any response other than json array "

export default function CreateForm() {
    const [userInput, setUserInput] = useState();
    const [loading, setloading] = useState();
    const { user } = useUser();
    const route = useRouter()
    const onGenerateForm = async () => {
        setloading(true)

        const chatSession = await ChatSession; 
        const result = await chatSession.sendMessage("Description:" + userInput + PROMPT);
        const jsonText = result.response.text(); 

        const startIndex = jsonText.indexOf("["); 
        const endIndex = jsonText.lastIndexOf("]");
        const jsonArrayString = jsonText.substring(startIndex, endIndex + 1); 
        const jsonArray = JSON.parse(jsonArrayString);
        console.log(jsonArray[0])
        if(result.response.text()){
            const resp= await db.insert(JsonForms)
            .values({
                jsonform:jsonArray[0],
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD/MM/YYYY')
            }).returning({id:JsonForms.id})
            console.log(resp[0].id)
            if(resp[0].id){
                route.push('/edit-form/'+resp[0].id)
            }
            setloading(false)
        }
            setloading(false)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Form</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enter  prompt </DialogTitle>
                    <DialogDescription>
                        Just a give a prompt create new form in an instant
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                    <div className="grid grid-row-4 items-center gap-4">

                        <textarea className="textarea textarea-success" onChange={(e) => setUserInput(e.target.value)} placeholder="Write the desrciption of your form"></textarea>
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onGenerateForm} disabled={loading} > {loading?
                            <Loader2 className='animate-spin'/>:'Generate Form'
                            }</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
