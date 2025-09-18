// src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, message:"" }; }
  static getDerivedStateFromError(err){ return { hasError:true, message:String(err?.message || err) }; }
  componentDidCatch(err, info){ console.error("UI crashed:", err, info); }
  render(){
    if (this.state.hasError){
      return (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          <div className="font-semibold">Something went wrong.</div>
          <div className="text-sm mt-1">{this.state.message}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
