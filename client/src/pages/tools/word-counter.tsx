import { ToolLayout } from "@/components/layout/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { useState, useMemo } from "react";
import { Clock, AlignLeft, Type, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const paragraphs = text.trim() ? text.split(/\n+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200); // Average reading speed 200 wpm

    return { words, chars, charsNoSpaces, paragraphs, sentences, readingTime };
  }, [text]);

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, and estimate reading time. Real-time analysis."
      toolId="word-counter"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 flex flex-col h-[70vh]">
          <Textarea 
            placeholder="Start typing or paste your text here..."
            className="flex-1 p-6 text-lg leading-relaxed resize-none border-border shadow-sm focus:ring-primary/20 bg-card"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
            <h3 className="font-semibold text-lg border-b border-border pb-4">Statistics</h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Type className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Words</span>
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.words}</div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Hash className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Characters</span>
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.chars}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stats.charsNoSpaces} without spaces
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <AlignLeft className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Paragraphs</span>
                </div>
                <div className="text-3xl font-bold text-foreground">{stats.paragraphs}</div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Reading Time</span>
            </div>
            <div className="text-2xl font-bold">
              ~{stats.readingTime} min<span className="text-sm font-normal text-muted-foreground ml-1">read</span>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
