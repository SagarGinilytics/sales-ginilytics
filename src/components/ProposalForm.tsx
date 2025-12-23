import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, Link as LinkIcon, User, Mail, Building } from "lucide-react";

interface ProposalFormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  callLink: string;
  jobDescription: string;
}

interface ProposalFormProps {
  onSubmit: (data: ProposalFormData) => Promise<void>;
  isLoading: boolean;
}

export function ProposalForm({ onSubmit, isLoading }: ProposalFormProps) {
  const [formData, setFormData] = useState<ProposalFormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    callLink: "",
    jobDescription: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const updateField = (field: keyof ProposalFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.companyName.trim() &&
    (formData.callLink.trim() || formData.jobDescription.trim());

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
            required
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
            required
            aria-required="true"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
          required
          aria-required="true"
        />
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-sm font-medium text-foreground flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
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

      {/* Call Link */}
      <div className="space-y-2">
        <Label htmlFor="callLink" className="text-sm font-medium text-foreground flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-muted-foreground" />
          Call Audio Link
        </Label>
        <Input
          id="callLink"
          type="url"
          placeholder="https://example.com/call-recording.mp3"
          value={formData.callLink}
          onChange={(e) => updateField("callLink", e.target.value)}
          className="bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
        />
        <p className="text-xs text-muted-foreground">
          Link to call recording or meeting notes
        </p>
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <Label htmlFor="jobDescription" className="text-sm font-medium text-foreground">
          Job Description / Requirements
        </Label>
        <Textarea
          id="jobDescription"
          placeholder="Paste the job description, project requirements, or client needs here..."
          value={formData.jobDescription}
          onChange={(e) => updateField("jobDescription", e.target.value)}
          className="min-h-[140px] resize-none bg-background border-input transition-smooth focus:shadow-glow focus:border-primary"
        />
        <p className="text-xs text-muted-foreground">
          Provide either a call link or job description (or both)
        </p>
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
            Generating Proposal...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Generate Proposal
          </>
        )}
      </Button>
    </form>
  );
}
