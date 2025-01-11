import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormListItem({ jsonData }) {
  console.log(jsonData, "from List Item  hehehe");
  return (
    <Card className="w-[450px] m-7  ">
      <CardHeader>
        <CardTitle>{`${jsonData.formTitle}`}</CardTitle>
        <CardDescription>{`${jsonData.formSubheading}`}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex justify-between">
        <Label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          created at
        </Label>
        <Button>Share</Button>
      </CardFooter>
    </Card>
  );
}
