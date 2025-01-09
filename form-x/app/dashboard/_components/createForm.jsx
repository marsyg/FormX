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
    const [transcript, setTranscript] = useState('');
    const { user } = useUser();
    const route = useRouter()
    const speechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;

    const recognition = new speechRecognition();
    const handleOnRecord = () => {
        recognition.lang = "en-US";
        recognition.interimResults = false;

        recognition.start();
        recognition.onresult = (e) => {
            console.log(e.results[0][0].transcript);
           setUserInput((prevText)=>`${prevText} ${transcript}`)
            setTranscript(e.results[0][0].transcript)
        };
    };
    const handleOnStop = () => {
        recognition.stop();
    };
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
        if (result.response.text()) {
            const resp = await db.insert(JsonForms)
                .values({
                    jsonform: jsonArray[0],
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD/MM/YYYY')
                }).returning({ id: JsonForms.id })
            console.log(resp[0].id)
            if (resp[0].id) {
                route.push('/edit-form/' + resp[0].id)
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

                        <textarea value={userInput} className="textarea textarea-success" onChange={(e) => setUserInput(e.target.value)} placeholder="Write the desrciption of your form"></textarea>
                    </div>

                </div>
                <DialogFooter>
                    <Button onClick={handleOnRecord}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                    </svg>
                    </Button>
                    <Button type="submit" onClick={onGenerateForm} disabled={loading} > {loading ?
                        <Loader2 className='animate-spin' /> : 'Generate Form'
                    }</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

