import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProposalPreviewProps {
  previewHtml: string | null;
  downloadUrl: string | null;
  isLoading: boolean;
}

export function ProposalPreview({
  previewHtml,
  downloadUrl,
  isLoading,
}: ProposalPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleDownload = useCallback(() => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  }, [downloadUrl]);

  const handleCopyText = useCallback(async () => {
    if (!iframeRef.current?.contentDocument) return;

    const textContent = iframeRef.current.contentDocument.body.innerText;
    
    try {
      await navigator.clipboard.writeText(textContent);
      toast({
        title: "Copied!",
        description: "Proposal text copied to clipboard.",
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try selecting and copying manually.",
        variant: "destructive",
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-muted animate-pulse-soft" />
          <Send className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
        </div>
        <p className="mt-4 text-sm" aria-live="polite">
          Generating your proposal...
        </p>
      </div>
    );
  }

  if (!previewHtml) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
        <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
          <Send className="h-10 w-10 text-muted-foreground/50" />
        </div>
        <p className="text-center text-sm max-w-[220px]">
          Fill out the form and click "Generate Proposal" to create your document
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Button
          onClick={handleDownload}
          disabled={!downloadUrl}
          className="flex-1 transition-smooth hover:shadow-glow"
        >
          <Download className="mr-2 h-4 w-4" />
          Download DOCX
        </Button>
        <Button
          onClick={handleCopyText}
          variant="outline"
          className="flex-1 transition-smooth hover:border-primary"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Text
        </Button>
      </div>

      <div className="flex-1 rounded-lg border border-border bg-card overflow-hidden shadow-soft">
        <iframe
          ref={iframeRef}
          srcDoc={previewHtml}
          title="Proposal Preview"
          className="w-full h-full min-h-[400px] bg-card"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}
