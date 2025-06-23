import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddNewCourseDialog = ({ children }) => {
  const onlyChild = React.Children.only(children); // throws error if not a single element
  const[loading,setLoading]=useState(false)
  const [formData , setFormData]=useState({
    name:"",
    description:"",
    includeVideo:false,
    noOfChapters:1,
    category:'',
    level:""
  });
  const router=useRouter()
  const onHandleInputChange=(field,value)=>{
    setFormData(prev=>({
        ...prev,
        [field]:value
    }))
    console.log("Form Data is ", formData)
  }
  const onGenerateCourse=async()=>{
    console.log("After Generating Course :", formData)
    setLoading(true)
    const result=await axios.post("/api/generate-course-layout",{
        ...formData
    });
    console.log("AI Generated Data is ", result.data)
    if(result.data.resp=="Limit Reached"){
      toast.warning("Please Subscribe to Plan !!")
      router.push("/workspace/billing")
    }
    setLoading(false)
    router.push("/workspace/edit-course/"+result.data?.courseId)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{onlyChild}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-3 mt-3">
              <div>
                <Label htmlFor="Course Name" className={"mb-2"}>
                  Course Name
                </Label>
                <Input id="Course Name" placeholder="Course Name"
                onChange={(event)=>onHandleInputChange("name",event.target.value)}></Input>
              </div>
              <div>
                <Label htmlFor="Course Description" className={"mb-2"}>
                  Course Description (Optional)
                </Label>
                <Textarea
                  id="Course Description"
                  placeholder="Course Description"
                   onChange={(event)=>onHandleInputChange("description",event.target.value)}
                ></Textarea>
              </div>
              <div>
                <Label htmlFor="No. of Chapters" className={"mb-2"}>
                  No. of Chapters
                </Label>
                <Input
                  id="No. of Chapters"
                  placeholder="No. of Chapters"
                  type={"number"}
                   onChange={(event)=>onHandleInputChange("noOfChapters",event.target.value)}
                ></Input>
              </div>
              <div className="flex gap-1 items-center">
                <Label htmlFor="Include Video">Include Video</Label>
                <Switch id="Include Video" onCheckedChange={()=>onHandleInputChange("includeVideo",!formData?.includeVideo)}></Switch>
              </div>
              <div>
                <Label className={"mb-2"}> Difficulty Level</Label>
                <Select onValueChange={(value)=>onHandleInputChange("level",value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                <div>
                <Label htmlFor="Category" className={"mb-2"}>
                  Category
                </Label>
                <Input
                  id="Category"
                  placeholder="Category ( Separated by Comma )"
                   onChange={(event)=>onHandleInputChange("category",event.target.value)}
                ></Input>
              </div>
              <div className="mt-4">
                <Button onClick={()=>onGenerateCourse()} className={"cursor-pointer w-full flex items-center justify-center"} disabled={loading}> 
                    {loading?<Loader2Icon className="animate-spin" />:<SparklesIcon/>}Generate Course</Button>
                    
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewCourseDialog;
