import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Copy, Trash2, FileJson, Minimize2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
      toast({
        title: "Formatted successfully",
        description: "Your JSON is valid and beautified.",
        duration: 2000,
      });
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
      toast({
        title: "Minified successfully",
        description: "Your JSON is valid and minified.",
        duration: 2000,
      });
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied to clipboard",
      description: "JSON output copied.",
      duration: 2000,
    });
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Validate, format, and minify your JSON data. Paste your code below."
      toolId="json-formatter"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)] min-h-[500px]">
        {/* Input Panel */}
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Input JSON</label>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={handleClear} disabled={!input}>
                <Trash2 className="h-4 w-4 mr-1" /> Clear
              </Button>
            </div>
          </div>
          <Textarea 
            className="flex-1 font-mono text-sm resize-none p-4 bg-card border-border shadow-sm focus:ring-primary/20"
            placeholder={`{"name": "DevUtils", "awesome": true}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Controls (Mobile only) */}
        <div className="flex lg:hidden gap-2 flex-wrap">
          <Button onClick={handleFormat} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <FileJson className="h-4 w-4 mr-2" /> Format
          </Button>
          <Button onClick={handleMinify} variant="outline" className="flex-1">
            <Minimize2 className="h-4 w-4 mr-2" /> Minify
          </Button>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col gap-2 h-full relative">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Output</label>
            <div className="flex gap-2 lg:opacity-100">
              <div className="hidden lg:flex gap-2 mr-4 border-r border-border pr-4">
                <Button size="sm" onClick={handleFormat} disabled={!input}>
                  <FileJson className="h-4 w-4 mr-1" /> Format
                </Button>
                <Button size="sm" variant="outline" onClick={handleMinify} disabled={!input}>
                  <Minimize2 className="h-4 w-4 mr-1" /> Minify
                </Button>
              </div>
              <Button size="sm" variant="secondary" onClick={handleCopy} disabled={!output}>
                <Copy className="h-4 w-4 mr-1" /> Copy
              </Button>
            </div>
          </div>
          <div className="relative flex-1">
            <Textarea 
              className={cn(
                "w-full h-full font-mono text-sm resize-none p-4 bg-muted/30 border-border shadow-sm read-only:focus:ring-0",
                error ? "border-red-300 focus:border-red-400 bg-red-50/50" : ""
              )}
              value={error || output}
              readOnly
              placeholder="Result will appear here..."
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-bottom-2">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
