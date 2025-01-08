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

import ChatSession from '../../../configs/geminiModal'

import { useUser } from '@clerk/nextjs';

import { useRouter } from 'next/router';
const PROMPT = ", On the basis of description please give form in json format with form title, form subheading, Form field, form name, placeholder name, and form label,fieldType, field required In Json format"

export default function CreateForm() {
    const [userInput,setUserInput] = useState();
    const[loading,setloading] = useState();
    const {user} = useUser();
    
    const onGenerateForm = async()=>{
        setloading(true)

          const chatSession = await ChatSession; // Assuming ChatSession is a Promise
    const result = await chatSession.sendMessage("Description:" + userInput + PROMPT);
        console.log(result.response.text())
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
           
            <textarea className="textarea textarea-success" onChange={(e)=>setUserInput(e.target.value)} placeholder="Write the desrciption of your form"></textarea>
          </div>
    
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onGenerateForm} >Generate Form</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
