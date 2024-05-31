import "@/styles/loading.css";

export default function LoadingComponent() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <p className="text-4xl font-extrabold tracking-tight">
        Mermaid <span className="text-[hsl(280,100%,70%)]">Mind</span>
      </p>
      <div className="loading-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}
