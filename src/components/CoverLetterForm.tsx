import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, Link as LinkIcon } from "lucide-react";

interface FormData {
  jobDescription: string;
  applicantName: string;
  position: string;
  companyName: string;
  references: string[];
}

interface CoverLetterFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
}

export function CoverLetterForm({ onSubmit, isLoading }: CoverLetterFormProps) {
  const [formData, setFormData] = useState<FormData>({
    jobDescription: "",
    applicantName: "",
    position: "",
    companyName: "",
    references: ["", ""],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      references: formData.references.filter((ref) => ref.trim() !== ""),
    };
    await onSubmit(cleanedData);
  };

  const updateField = (field: keyof Omit<FormData, "references">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateReference = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.map((ref, i) => (i === index ? value : ref)),
    }));
  };

  const isFormValid =
    formData.jobDescription.trim() &&
    formData.applicantName.trim() &&
    formData.position.trim() &&
    formData.companyName.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="jobDescription" className="text-sm font-medium text-foreground">
          Job Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="jobDescription"
          placeholder="Paste the job description or job URL here..."
          value={formData.jobDescription}
          onChange={(e) => updateField("jobDescription", e.target.value)}
          className="min-h-[140px] resize-none bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
          required
          aria-required="true"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="applicantName" className="text-sm font-medium text-foreground">
            Your Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="applicantName"
            placeholder="John Doe"
            value={formData.applicantName}
            onChange={(e) => updateField("applicantName", e.target.value)}
            className="bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
            required
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position" className="text-sm font-medium text-foreground">
            Position <span className="text-destructive">*</span>
          </Label>
          <Input
            id="position"
            placeholder="Software Engineer"
            value={formData.position}
            onChange={(e) => updateField("position", e.target.value)}
            className="bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
            required
            aria-required="true"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-sm font-medium text-foreground">
          Company Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="companyName"
          placeholder="Acme Corporation"
          value={formData.companyName}
          onChange={(e) => updateField("companyName", e.target.value)}
          className="bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
          required
          aria-required="true"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-muted-foreground" />
          Reference Links <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <div className="space-y-3">
          {formData.references.map((ref, index) => (
            <Input
              key={index}
              placeholder={`https://linkedin.com/in/yourprofile`}
              value={ref}
              onChange={(e) => updateReference(index, e.target.value)}
              className="bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
              type="url"
              aria-label={`Reference link ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full h-12 text-base font-medium transition-smooth hover:shadow-glow disabled:opacity-50"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-5 w-5" />
            Create Cover Letter
          </>
        )}
      </Button>
    </form>
  );
}
