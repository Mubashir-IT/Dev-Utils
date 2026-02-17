import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Shield, ShieldCheck, ArrowRightLeft, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { toast } = useToast();

  useEffect(() => {
    // Auto detect mode
    if (input.trim().length > 0) {
      const isBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(input.trim()) && input.trim().length % 4 === 0;
      if (isBase64 && mode === 'encode') {
        setMode('decode');
      } else if (!isBase64 && mode === 'decode') {
        setMode('encode');
      }
    }
  }, [input]);

  useEffect(() => {
    handleProcess();
  }, [input, mode]);

  const handleProcess = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput("Invalid input for " + mode);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({ title: "Copied!", description: "Output copied to clipboard" });
  };

  return (
    <ToolLayout
      title="Base64 Encoder / Decoder"
      description="Encode text to Base64 or decode Base64 back to text. Auto-detects format."
      toolId="base64-converter"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-300px)] min-h-[500px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex bg-muted p-1 rounded-lg">
              <Button 
                variant={mode === 'encode' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setMode('encode')}
                className="h-8"
              >
                Encode
              </Button>
              <Button 
                variant={mode === 'decode' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setMode('decode')}
                className="h-8"
              >
                Decode
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setInput("")} disabled={!input}>
              <Trash2 className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
          <Textarea 
            placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="flex-1 font-mono text-sm resize-none p-4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Result</span>
            <Button variant="secondary" size="sm" onClick={copyToClipboard} disabled={!output}>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
          </div>
          <Textarea 
            className="flex-1 font-mono text-sm resize-none p-4 bg-muted/30"
            value={output}
            readOnly
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </ToolLayout>
  );
}
