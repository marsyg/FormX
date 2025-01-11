import React from "react";

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
import templateArray from "../../template";
import Link from "next/link";

const page = () => {
  console.log(templateArray[0]);

  return (
    <div className="flex m-8 flex-row flex-wrap ">
      {templateArray.map((value, index) => (
        <Card className="w-[350px] m-3">
          <CardHeader>
            <CardTitle>{`${value.formTitle}`}</CardTitle>
          </CardHeader>

          <CardFooter className="flex justify-between">
            <Link href={`/template/${index}`}>
              <Button>View</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default page;
