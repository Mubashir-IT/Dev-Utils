import { ToolLayout } from "@/components/layout/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Clock, AlignLeft, Type, Hash, ArrowUp01, Sparkles, Eraser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function WordCounter() {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const paragraphs = text.trim() ? text.split(/\n+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200); // Average reading speed 200 wpm

    return { words, chars, charsNoSpaces, paragraphs, sentences, readingTime };
  }, [text]);

  const transformText = (type: 'upper' | 'lower' | 'clean') => {
    let newText = text;
    if (type === 'upper') newText = text.toUpperCase();
    if (type === 'lower') newText = text.toLowerCase();
    if (type === 'clean') newText = text.replace(/\s+/g, ' ').trim();
    
    setText(newText);
    toast({
      title: "Text Updated",
      description: `Applied ${type === 'clean' ? 'remove extra spaces' : type + 'ercase'} transformation.`,
      duration: 1500,
    });
  };

  return (
    <ToolLayout
      title="Word Counter & Text Tools"
      description="Count words, transform text case, and remove extra spaces instantly."
      toolId="word-counter"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => transformText('upper')} className="gap-2">
              <Type className="h-4 w-4" />
              UPPERCASE
            </Button>
            <Button variant="outline" size="sm" onClick={() => transformText('lower')} className="gap-2">
              <Type className="h-4 w-4" />
              lowercase
            </Button>
            <Button variant="outline" size="sm" onClick={() => transformText('clean')} className="gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Remove Extra Spaces
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setText("")} className="ml-auto text-destructive hover:text-destructive hover:bg-destructive/10">
              <Eraser className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
          <div className="h-[60vh]">
            <Textarea 
              placeholder="Start typing or paste your text here..."
              className="h-full p-6 text-lg leading-relaxed resize-none border-border shadow-sm focus:ring-primary/20 bg-card"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
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
