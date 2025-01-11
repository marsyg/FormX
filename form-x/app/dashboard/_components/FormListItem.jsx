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
import Link from "next/link";

export default function FormListItem({ jsonData, id }) {
  const handleViewButton = () => {};
  console.log(jsonData, "from List Item  hehehe");
  return (
    <Card className="w-[450px] m-7  ">
      <CardHeader>
        <CardTitle>{`${jsonData.formTitle}`}</CardTitle>
        <CardDescription>{`${jsonData.formSubheading}`}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Label className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Created At
          </Label>
        </div>
        <div className="flex gap-2">
          <Link href={`/Form/${id}`}>
            <Button variant="outline">View</Button>
          </Link>
          <Button>Share</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
