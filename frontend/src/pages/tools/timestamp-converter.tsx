import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Clock, Calendar, Globe, ArrowRightLeft, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function TimestampConverter() {
  const [unix, setUnix] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [human, setHuman] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    updateFromUnix(unix);
  }, []);

  const updateFromUnix = (value: string) => {
    setUnix(value);
    const ts = parseInt(value);
    if (!isNaN(ts)) {
      try {
        // Handle both seconds and milliseconds
        const date = new Date(ts > 9999999999 ? ts : ts * 1000);
        setHuman(format(date, "yyyy-MM-dd HH:mm:ss"));
      } catch (e) {
        setHuman("Invalid Date");
      }
    } else {
      setHuman("");
    }
  };

  const updateFromHuman = (value: string) => {
    setHuman(value);
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      setUnix(Math.floor(date.getTime() / 1000).toString());
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Value copied to clipboard" });
  };

  const setCurrentTime = () => {
    const now = Math.floor(Date.now() / 1000).toString();
    updateFromUnix(now);
  };

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates."
      toolId="timestamp-converter"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-end">
          <Button variant="outline" onClick={setCurrentTime} className="gap-2">
            <Clock className="h-4 w-4" />
            Set to Now
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Unix Timestamp</label>
              <Button size="icon" variant="ghost" onClick={() => copyToClipboard(unix)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Input 
              value={unix} 
              onChange={(e) => updateFromUnix(e.target.value)}
              className="text-2xl font-mono h-16 text-center"
              placeholder="e.g. 1700000000"
            />
            <p className="text-xs text-muted-foreground text-center">Seconds or milliseconds supported</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Human Date</label>
              <Button size="icon" variant="ghost" onClick={() => copyToClipboard(human)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Input 
              value={human} 
              onChange={(e) => updateFromHuman(e.target.value)}
              className="text-2xl font-mono h-16 text-center"
              placeholder="YYYY-MM-DD HH:mm:ss"
            />
            <p className="text-xs text-muted-foreground text-center">Format: YYYY-MM-DD HH:mm:ss</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Local Timezone</div>
              <div className="text-muted-foreground">{timezone}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">UTC Offset</div>
            <div className="text-muted-foreground">
              {new Date().getTimezoneOffset() / -60} hours
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold">Quick Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">1 Minute</div>
              <div>60 Seconds</div>
            </div>
            <div>
              <div className="text-muted-foreground">1 Hour</div>
              <div>3,600 Seconds</div>
            </div>
            <div>
              <div className="text-muted-foreground">1 Day</div>
              <div>86,400 Seconds</div>
            </div>
            <div>
              <div className="text-muted-foreground">1 Year</div>
              <div>31,536,000 Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
