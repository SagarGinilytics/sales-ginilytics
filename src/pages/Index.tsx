import { useState } from "react";
import { CoverLetterForm } from "@/components/CoverLetterForm";
import { CoverLetterPreview } from "@/components/CoverLetterPreview";
import { toast } from "@/hooks/use-toast";
import { FileText, Sparkles } from "lucide-react";

// Webhook URL - Change this to your n8n webhook URL
const WEBHOOK_URL = "https://pressure-mysql-investing-ipod.trycloudflare.com/webhook-test/coverLetter-sagar-kamboj";

interface ApiResponse {
  previewHtml: string;
  downloadUrl: string;
}

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleSubmit = async (data: {
    jobDescription: string;
    applicantName: string;
    position: string;
    companyName: string;
    references: string[];
  }) => {
    setIsLoading(true);
    setPreviewHtml(null);
    setDownloadUrl(null);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const rawText = await response.text();

      if (!rawText) {
        throw new Error("Server returned an empty response");
      }

      let result: ApiResponse;
      try {
        result = JSON.parse(rawText);
      } catch {
        console.error("Raw server response:", rawText);
        throw new Error("Server returned invalid JSON");
      }

      if (!result.previewHtml || !result.downloadUrl) {
        throw new Error("Invalid response format from server");
      }

      setPreviewHtml(result.previewHtml);
      setDownloadUrl(result.downloadUrl);

      toast({
        title: "Cover letter generated!",
        description: "Your cover letter is ready to preview and download.",
      });
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-semibold text-foreground">
                Cover Letter Generator
              </h1>
              <p className="text-sm text-muted-foreground">
                AI-powered professional cover letters
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          role="main"
          aria-label="Cover letter generator"
        >
          {/* Form Section */}
          <section aria-labelledby="form-heading">
            <div className="bg-card rounded-2xl border border-border shadow-soft p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2
                  id="form-heading"
                  className="font-heading text-lg font-semibold text-foreground"
                >
                  Create Your Cover Letter
                </h2>
              </div>
              <CoverLetterForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </section>

          {/* Preview Section */}
          <section aria-labelledby="preview-heading" aria-live="polite">
            <div className="bg-card rounded-2xl border border-border shadow-soft p-6 sm:p-8 h-full min-h-[500px] lg:min-h-0">
              <h2
                id="preview-heading"
                className="font-heading text-lg font-semibold text-foreground mb-4"
              >
                Preview
              </h2>
              <div className="h-[calc(100%-2.5rem)]">
                <CoverLetterPreview
                  previewHtml={previewHtml}
                  downloadUrl={downloadUrl}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Instructions */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            To change the webhook URL, update the <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">WEBHOOK_URL</code> constant in{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">src/pages/Index.tsx</code>
          </p>
        </footer>
      </main>
    </div>
  );
}
