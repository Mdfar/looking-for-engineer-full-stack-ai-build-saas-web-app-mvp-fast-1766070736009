"use client";

import { useState } from "react"; import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() { const [prompt, setPrompt] = useState(""); const [result, setResult] = useState(""); const [loading, setLoading] = useState(false);

const onGenerate = async () => { try { setLoading(true); const response = await fetch("/api/generate", { method: "POST", body: JSON.stringify({ prompt }), }); const data = await response.json(); setResult(data.result); } catch (error) { console.error(error); } finally { setLoading(false); } };

return ( <div className="p-8"> <div className="flex justify-between items-center mb-8"> <h1 className="text-2xl font-bold">AI SaaS Dashboard</h1> <UserButton afterSignOutUrl="/" /> </div>

  <div className="space-y-4 max-w-2xl">
    <textarea
      className="w-full p-4 border rounded-lg text-black"
      placeholder="Enter your prompt here..."
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      rows={4}
    />
    <button
      onClick={onGenerate}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
    >
      {loading ? "Generating..." : "Generate AI Insight"}
    </button>

    {result && (
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">Result:</h2>
        <p className="whitespace-pre-wrap text-gray-800">{result}</p>
      </div>
    )}
  </div>
</div>


); }