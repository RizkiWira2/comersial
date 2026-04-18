import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Plus, Pencil, Trash2, Eye, EyeOff, Building2, 
  BookOpen, Upload, X, Loader2, Image as ImageIcon,
  MessageSquare, User
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"] & { images?: string[] };
type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"] & { images?: string[] };
type Article = Database["public"]["Tables"]["articles"]["Row"];
type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"];
type Consultation = Database["public"]["Tables"]["consultations"]["Row"];

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Commercial" }] }),
  component: AdminDashboard,
});

const emptyProperty: PropertyInsert = {
  title: "",
  location: "",
  price: "",
  category: "Villa",
  tenure: "Freehold",
  market_value: "",
  profit_pct: "",
  exit_projection: "",
  exit_pct: "",
  roi: "",
  capital_growth: "",
  beds: 0,
  baths: 0,
  area: "",
  image_url: "",
  images: [],
  pdf_url: "",
  is_published: true,
};

const emptyArticle: ArticleInsert = {
  title: "",
  excerpt: "",
  content: "",
  image_url: "",
  status: "published",
};

const categories = [
  "Villa",
  "Premium Residential",
  "Land",
  "Office",
  "Warehouse / Industrial",
  "Apartment / Multifamily",
  "Retail / Shophouse",
  "Hotel / Resort / Hospitality",
  "Restaurant",
  "Off-Plan",
];

const commonFeatures = [
  "Swimming Pool",
  "Fully Furnished",
  "High Speed WiFi",
  "Security 24/7",
  "Parking Area",
  "Air Conditioning",
  "Modern Kitchen",
  "Garden",
  "Ocean View",
  "Gym / Fitness Center",
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"properties" | "articles" | "consultations">("properties");
  const [properties, setProperties] = useState<Property[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Forms
  const [propForm, setPropForm] = useState<PropertyInsert>(emptyProperty);
  const [articleForm, setArticleForm] = useState<ArticleInsert>(emptyArticle);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === "properties") {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      setProperties(data || []);
    } else if (activeTab === "articles") {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      setArticles(data || []);
    } else if (activeTab === "consultations") {
      const { data } = await supabase
        .from("consultations")
        .select("*")
        .order("created_at", { ascending: false });
      setConsultations(data || []);
    }
    setLoading(false);
  };

  const insertMarkdown = (prefix: string, suffix: string) => {
    const textarea = document.getElementById('article-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = articleForm.content || "";
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);

    setArticleField("content", newText);
    
    // Focus back and set selection after state update
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 10);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handlePropSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = editingId 
        ? await supabase.from("properties").update(propForm).eq("id", editingId)
        : await supabase.from("properties").insert(propForm);
      
      if (error) throw error;

      closeForm();
      fetchData();
    } catch (error: any) {
      alert("Error saving property: " + error.message);
      console.error(error);
    }
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = editingId
        ? await supabase.from("articles").update(articleForm).eq("id", editingId)
        : await supabase.from("articles").insert(articleForm);
      
      if (error) throw error;

      closeForm();
      fetchData();
    } catch (error: any) {
      alert("Error saving article: " + error.message);
      console.error(error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('properties')
        .upload(filePath, file);

      if (error) {
        alert('Error uploading: ' + error.message);
        console.error('Error uploading:', error.message);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('properties')
        .getPublicUrl(filePath);
      
      newUrls.push(publicUrl);
    }

    if (newUrls.length > 0) {
      setPropForm(prev => ({
        ...prev,
        images: [...(prev.images || []), ...newUrls],
        image_url: prev.image_url || newUrls[0]
      }));
    }
    
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setPropForm(prev => {
      const newImages = [...(prev.images || [])];
      newImages.splice(index, 1);
      return {
        ...prev,
        images: newImages,
        // Update main image_url if we deleted it
        image_url: prev.image_url === prev.images?.[index] ? (newImages[0] || "") : prev.image_url
      };
    });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setPropForm(emptyProperty);
    setArticleForm(emptyArticle);
  };

  const setPropField = (key: string, value: any) =>
    setPropForm((prev) => ({ ...prev, [key]: value }));

  const setArticleField = (key: string, value: any) =>
    setArticleForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Tabs */}
      <div className="flex items-center gap-4 mb-8 bg-muted/50 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("properties")}
          className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${
            activeTab === "properties"
              ? "bg-foreground text-background shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 size={16} /> Properties
        </button>
        <button
          onClick={() => setActiveTab("articles")}
          className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${
            activeTab === "articles"
              ? "bg-foreground text-background shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen size={16} /> Articles
        </button>
        <button
          onClick={() => setActiveTab("consultations")}
          className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${
            activeTab === "consultations"
              ? "bg-foreground text-background shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare size={16} /> Leads
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-foreground capitalize">{activeTab === "consultations" ? "Investment Leads" : activeTab}</h1>
        {activeTab !== "consultations" && (
          <button
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-gold px-4 py-2 text-sm font-bold text-foreground transition hover:bg-gold-dark"
          >
            <Plus size={16} /> Add {activeTab === "properties" ? "Property" : "Article"}
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
        </div>
      ) : activeTab === "properties" ? (
        <PropertyTable 
          data={properties} 
          onEdit={(p) => {
            setPropForm(p);
            setEditingId(p.id);
            setShowForm(true);
          }}
          onDelete={async (id) => {
            if (confirm("Delete this property?")) {
              await supabase.from("properties").delete().eq("id", id);
              fetchData();
            }
          }}
          onToggle={async (id, cur) => {
            await supabase.from("properties").update({ is_published: !cur }).eq("id", id);
            fetchData();
          }}
        />
      ) : activeTab === "articles" ? (
        <ArticleTable 
          data={articles} 
          onEdit={(a) => {
            setArticleForm(a);
            setEditingId(a.id);
            setShowForm(true);
          }}
          onDelete={async (id) => {
            if (confirm("Delete this article?")) {
              await supabase.from("articles").delete().eq("id", id);
              fetchData();
            }
          }}
          onToggle={async (id, cur) => {
            await supabase.from("articles").update({ status: cur === 'published' ? 'draft' : 'published' }).eq("id", id);
            fetchData();
          }}
        />
      ) : (
        <ConsultationTable 
          data={consultations}
          onDelete={async (id) => {
            if (confirm("Delete this lead?")) {
              await supabase.from("consultations").delete().eq("id", id);
              fetchData();
            }
          }}
        />
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/50 pt-10 pb-20 px-4 overflow-y-auto backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-card border border-border rounded-xl p-6 shadow-2xl relative">
            <button 
              onClick={closeForm}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <Plus className="rotate-45" size={24} />
            </button>
            
            <h2 className="text-lg font-bold text-foreground mb-6">
              {editingId ? "Edit" : "Add"} {activeTab === "properties" ? "Property" : "Article"}
            </h2>

            {activeTab === "properties" ? (
              <form onSubmit={handlePropSubmit} className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" value={propForm.title!} onChange={(v) => setPropField("title", v)} required />
                <Field label="Location" value={propForm.location!} onChange={(v) => setPropField("location", v)} required />
                <Field label="Price" value={propForm.price!} onChange={(v) => setPropField("price", v)} placeholder="$50,000" required />
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Category</label>
                  <select
                    value={propForm.category}
                    onChange={(e) => setPropField("category", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-gold"
                  >
                    {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <Field label="Tenure" value={propForm.tenure!} onChange={(v) => setPropField("tenure", v)} />
                <Field label="Market Value" value={propForm.market_value || ""} onChange={(v) => setPropField("market_value", v)} />
                <Field label="Profit %" value={propForm.profit_pct || ""} onChange={(v) => setPropField("profit_pct", v)} />
                <Field label="ROI Est." value={propForm.roi || ""} onChange={(v) => setPropField("roi", v)} />
                <Field label="Beds" value={String(propForm.beds ?? 0)} onChange={(v) => setPropField("beds", Number(v))} type="number" />
                <Field label="Baths" value={String(propForm.baths ?? 0)} onChange={(v) => setPropField("baths", Number(v))} type="number" />
                <div className="sm:col-span-2">
                  <Field label="Investment Research PDF URL" value={propForm.pdf_url || ""} onChange={(v) => setPropField("pdf_url", v)} placeholder="https://example.com/research.pdf" />
                </div>
                
                {/* Image Upload Section */}
                <div className="sm:col-span-2 space-y-3">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Property Showcase Images</label>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {propForm.images?.map((url, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden group border border-border">
                        <img src={url} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} />
                        </button>
                        {propForm.image_url === url && (
                          <div className="absolute bottom-0 inset-x-0 bg-gold text-[8px] font-bold text-center py-0.5 text-foreground uppercase">Cover</div>
                        )}
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-border hover:border-gold transition-colors cursor-pointer bg-muted/30">
                      {uploading ? <Loader2 size={16} className="animate-spin text-gold" /> : <Plus size={16} className="text-muted-foreground" />}
                      <span className="text-[8px] font-bold text-muted-foreground uppercase mt-1">Upload</span>
                      <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-gold/5 border border-gold/20">
                    <ImageIcon size={14} className="text-gold" />
                    <p className="text-[10px] text-muted-foreground italic">Tip: The first image uploaded will automatically become your main cover image.</p>
                  </div>
                </div>

                {/* Features Section */}
                <div className="sm:col-span-2 space-y-3">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Features & Amenities</label>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-xl border border-border bg-muted/20 p-4">
                    {commonFeatures.map((f) => (
                      <label key={f} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={(propForm.features || []).includes(f)}
                          onChange={(e) => {
                            const current = propForm.features || [];
                            const next = e.target.checked 
                              ? [...current, f]
                              : current.filter(x => x !== f);
                            setPropField("features", next);
                          }}
                          className="h-4 w-4 rounded border-border text-gold focus:ring-gold"
                        />
                        <span className="text-xs text-foreground group-hover:text-gold transition-colors">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 sm:col-span-2 mt-4">
                  <button type="button" onClick={closeForm} className="px-6 py-2.5 rounded-md border border-border text-sm font-bold">Cancel</button>
                  <button type="submit" className="px-8 py-2.5 rounded-md bg-gold text-foreground text-sm font-bold">
                    {editingId ? "Update Property" : "Create Property"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleArticleSubmit} className="flex flex-col gap-4">
                <Field label="Title" value={articleForm.title!} onChange={(v) => setArticleField("title", v)} required />
                <Field label="Excerpt" value={articleForm.excerpt!} onChange={(v) => setArticleField("excerpt", v)} required />
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Content (Rich Text Editor)</label>
                    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-md border border-border">
                        {[
                            { icon: 'B', label: 'Bold', cmd: 'bold' },
                            { icon: 'I', label: 'Italic', cmd: 'italic' },
                            { icon: 'H', label: 'H3', cmd: 'formatBlock', val: 'H3' },
                            { icon: 'L', label: 'List', cmd: 'insertUnorderedList' },
                        ].map(tool => (
                            <button 
                                key={tool.label}
                                type="button"
                                onClick={() => {
                                    document.execCommand(tool.cmd, false, tool.val || "");
                                    const editor = document.getElementById('article-editor');
                                    if (editor) setArticleField("content", editor.innerHTML);
                                }}
                                className="w-7 h-7 flex items-center justify-center text-[10px] font-black hover:bg-gold hover:text-foreground rounded transition-colors border border-transparent"
                            >
                                {tool.icon}
                            </button>
                        ))}
                    </div>
                  </div>
                  <div
                    id="article-editor"
                    contentEditable
                    onInput={(e) => setArticleField("content", e.currentTarget.innerHTML)}
                    onPaste={(e) => {
                        // Let the default paste handle it to preserve GDocs formatting
                        // But we trigger a state save right after
                        setTimeout(() => {
                           setArticleField("content", e.currentTarget.innerHTML);
                        }, 0);
                    }}
                    dangerouslySetInnerHTML={{ __html: articleForm.content || "" }}
                    className="w-full min-h-[400px] rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold overflow-y-auto prose prose-invert prose-gold max-w-none"
                    style={{ whiteSpace: 'normal' }}
                  />
                  <p className="text-[10px] text-muted-foreground mt-2 italic px-1">Tip: You can paste content directly from Google Docs / Word with formatting preserved.</p>
                </div>
                <Field label="Image URL" value={articleForm.image_url || ""} onChange={(v) => setArticleField("image_url", v)} />
                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={closeForm} className="px-6 py-2.5 rounded-md border border-border text-sm font-bold">Cancel</button>
                  <button type="submit" className="px-8 py-2.5 rounded-md bg-gold text-foreground text-sm font-bold shadow-lg shadow-gold/10">
                    {editingId ? "Update Article" : "Create Article"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PropertyTable({ data, onEdit, onDelete, onToggle }: { data: Property[], onEdit: (p: any) => void, onDelete: (id: string) => void, onToggle: (id: string, cur: boolean) => void }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="px-4 py-4 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Property</th>
            <th className="px-4 py-4 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Location</th>
            <th className="px-4 py-4 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Price</th>
            <th className="px-4 py-3 text-center font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Status</th>
            <th className="px-4 py-3 text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((p) => (
            <tr key={p.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-4 font-bold text-foreground">{p.title}</td>
              <td className="px-4 py-4 text-muted-foreground">{p.location}</td>
              <td className="px-4 py-4 text-foreground font-semibold">{p.price}</td>
              <td className="px-4 py-4 text-center">
                <button onClick={() => onToggle(p.id, p.is_published)} className="inline-flex items-center gap-1">
                  {p.is_published ? <Eye size={16} className="text-gold" /> : <EyeOff size={16} className="text-muted-foreground" />}
                </button>
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => onEdit(p)} className="p-2 hover:bg-muted rounded-full transition-colors"><Pencil size={15} className="text-muted-foreground" /></button>
                  <button onClick={() => onDelete(p.id)} className="p-2 hover:bg-destructive/10 rounded-full transition-colors text-destructive"><Trash2 size={15} /></button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">Belum ada properti.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ArticleTable({ data, onEdit, onDelete, onToggle }: { data: Article[], onEdit: (a: any) => void, onDelete: (id: string) => void, onToggle: (id: string, cur: string) => void }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="px-4 py-4 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Article Title</th>
            <th className="px-4 py-4 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Date</th>
            <th className="px-4 py-3 text-center font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Status</th>
            <th className="px-4 py-3 text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((a) => (
            <tr key={a.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-4 font-bold text-foreground">{a.title}</td>
              <td className="px-4 py-4 text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-4 text-center">
                <button onClick={() => onToggle(a.id, a.status)} className="inline-flex items-center gap-1">
                  {a.status === 'published' ? <Eye size={16} className="text-gold" /> : <EyeOff size={16} className="text-muted-foreground" />}
                </button>
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => onEdit(a)} className="p-2 hover:bg-muted rounded-full transition-colors"><Pencil size={15} className="text-muted-foreground" /></button>
                  <button onClick={() => onDelete(a.id)} className="p-2 hover:bg-destructive/10 rounded-full transition-colors text-destructive"><Trash2 size={15} /></button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">Belum ada artikel.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ConsultationTable({ data, onDelete }: { data: Consultation[], onDelete: (id: string) => void }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="px-4 py-4 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Client</th>
            <th className="px-4 py-4 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Objective & Type</th>
            <th className="px-4 py-4 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Budget & Location</th>
            <th className="px-4 py-4 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Date</th>
            <th className="px-4 py-3 text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((c) => (
            <tr key={c.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                    <User size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground">{c.email} • {c.phone}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <p className="text-xs font-semibold text-foreground line-clamp-1">{c.objective}</p>
                <p className="text-[10px] text-gold-dark font-medium uppercase mt-0.5">{c.property_type}</p>
              </td>
              <td className="px-4 py-4">
                <p className="text-xs font-bold text-foreground">{c.budget}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{c.preferred_location}</p>
              </td>
              <td className="px-4 py-4 text-[10px] text-muted-foreground">
                {new Date(c.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-right">
                <button 
                  onClick={() => onDelete(c.id)}
                  className="p-2 hover:bg-destructive/10 rounded-full transition-colors text-destructive"
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">No leads yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string; }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}
