
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Upload } from "lucide-react";

const IssueForm = () => {
  const [block, setBlock] = useState("");
  const [room, setRoom] = useState("");
  const [amenity, setAmenity] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Validate form
    if (!block) return setError("Please select a block");
    if (!room) return setError("Please enter your room number");
    if (!amenity) return setError("Please select an amenity");
    if (!description) return setError("Please describe the issue");
    if (description.length > 200) return setError("Description must be less than 200 characters");
    
    // Show loading state
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess("Issue reported successfully. Reference ID: REF" + Math.floor(Math.random() * 10000));
      
      // Reset form
      setBlock("");
      setRoom("");
      setAmenity("");
      setDescription("");
      setFile(null);
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Report an Issue</CardTitle>
        <CardDescription>
          Report issues with estate amenities for prompt resolution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="block" className="text-sm font-medium">
                Block / Building
              </label>
              <Select value={block} onValueChange={setBlock}>
                <SelectTrigger id="block">
                  <SelectValue placeholder="Select block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hostel A">Hostel A</SelectItem>
                  <SelectItem value="Hostel B">Hostel B</SelectItem>
                  <SelectItem value="Block C">Block C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="room" className="text-sm font-medium">
                Room Number
              </label>
              <Input
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. Room 5"
                maxLength={20}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="amenity" className="text-sm font-medium">
              Amenity Type
            </label>
            <Select value={amenity} onValueChange={setAmenity}>
              <SelectTrigger id="amenity">
                <SelectValue placeholder="Select amenity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Power">Power</SelectItem>
                <SelectItem value="Water">Water</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Issue Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue (max 200 characters)"
              maxLength={200}
              rows={4}
            />
            <p className="text-xs text-muted-foreground text-right">
              {description.length}/200 characters
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="photo" className="text-sm font-medium">
              Upload Photo (Optional)
            </label>
            <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="file"
                id="photo"
                accept="image/jpeg, image/png"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label htmlFor="photo" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm font-medium">
                  {file ? file.name : "Click to upload (JPEG/PNG, max 2MB)"}
                </span>
                {file && (
                  <span className="text-xs text-muted-foreground mt-1">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                )}
              </label>
            </div>
          </div>
          
          {error && (
            <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
              {success}
            </div>
          )}
        
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Issue Report"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IssueForm;
