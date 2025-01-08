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

import moment from 'moment/moment';
import { db } from "@/configs/db";

import ChatSession from '../../../configs/geminiModal'
import { JsonForms } from "@/configs/schema";

import { useUser } from '@clerk/nextjs';

import { useRouter } from 'next/router';
const PROMPT = ", On the basis of description please give form in json format with form title, form subheading, Form field, form name, placeholder name, and form label,fieldType, field required In Json format"

export default function CreateForm() {
    const [userInput, setUserInput] = useState();
    const [loading, setloading] = useState();
    const { user } = useUser();

    const onGenerateForm = async () => {
        setloading(true)

        const chatSession = await ChatSession; 
        const result = await chatSession.sendMessage("Description:" + userInput + PROMPT);
        console.log(result.response.text())
        if(result.response.text()){
            const resp= await db.insert(JsonForms)
            .values({
                jsonform:result.response.text(),
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD/MM/YYYY')
            }).returning({id:JsonForms.id})
            console.log(resp[0].id)
           
            setloading(false)
        }
            setloading(false)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
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
                    <Button type="submit" onClick={onGenerateForm} disabled={loading} >Generate Form</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
