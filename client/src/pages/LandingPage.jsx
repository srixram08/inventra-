import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Truck,
  Layers,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Database,
  Server,
  DollarSign,
  AlertTriangle,
  PlayCircle,
  HelpCircle,
  ChevronRight,
  Boxes,
  Check,
  RefreshCw,
  ExternalLink,
  ArrowUpRight,
  Activity,
  Cpu,
  Box,
  Compass,
  Lock,
  Workflow,
  ArrowDown,
  MessageSquareCode,
  Shield
} from "lucide-react";
import { InventraIcon } from "../components/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3.5 transition-all bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          
          {/* Official Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-black shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <InventraIcon size={26} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 font-display flex items-center gap-1.5">
                INVENTRA <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">ERP</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 -mt-1">
                Intelligent ERP Platform
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#ai-copilot" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              AI Copilot
            </a>
            <a href="#dashboard" className="hover:text-blue-600 transition-colors">Dashboard</a>
            <a href="#workflow" className="hover:text-blue-600 transition-colors">Workflow</a>
            <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
            <a href="#tech" className="hover:text-blue-600 transition-colors">Technology</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:inline-block"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="btn-liquid-caramel px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 active:scale-95 shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-20 px-6 sm:px-10 max-w-[1400px] mx-auto text-center">
        
        {/* Emblem Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 mb-8 shadow-xs">
          <div className="p-1 rounded-md bg-black flex items-center justify-center">
            <InventraIcon size={16} />
          </div>
          <span>INVENTRA • Intelligent Inventory. Smarter Business.</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] font-display max-w-5xl mx-auto mb-6">
          The AI-Powered ERP Platform Built to Simplify{" "}
          <span className="text-gradient-caramel">Inventory, Sales &amp; Purchasing</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal mb-10">
          Manage your products, suppliers, customers, purchases, sales, and stock from a single powerful platform.
          With <strong>Inventra AI Copilot</strong>, turn your business data into actionable insights and make faster, smarter decisions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/login"
            className="w-full sm:w-auto btn-liquid-caramel px-8 py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-3 shadow-xl"
          >
            <span>Get Started</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-slate-200 hover:border-blue-600 bg-white text-sm font-semibold text-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <BarChart3 size={16} className="text-blue-600" />
            <span>Explore Dashboard</span>
          </Link>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs">
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200">
            <span className="font-bold text-blue-600 block text-sm">Real-Time Sync</span>
            <span className="text-slate-500">Zero Stock Drift</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200">
            <span className="font-bold text-blue-600 block text-sm">POS Billing</span>
            <span className="text-slate-500">Automated Invoicing</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200">
            <span className="font-bold text-blue-600 block text-sm">AI Copilot</span>
            <span className="text-slate-500">Natural Language BI</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200">
            <span className="font-bold text-blue-600 block text-sm">PostgreSQL</span>
            <span className="text-slate-500">Relational Integrity</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. YOUR BUSINESS, CONNECTED */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-20 px-6 sm:px-10 bg-slate-50/60 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto text-center">
          
          <span className="pill-bright-brown px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Connected Ecosystem
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display mb-4">
            Your Business, Connected.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-10">
            Inventra connects every important part of your business into one intelligent workflow.
          </p>

          {/* Workflow Chain */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 px-4 rounded-3xl bg-white border border-slate-200 shadow-xs max-w-5xl mx-auto mb-10 font-semibold text-xs sm:text-sm">
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">Suppliers</span>
            <ArrowRight size={16} className="text-blue-500" />
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">Purchases</span>
            <ArrowRight size={16} className="text-blue-500" />
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">Inventory</span>
            <ArrowRight size={16} className="text-blue-500" />
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">Sales</span>
            <ArrowRight size={16} className="text-blue-500" />
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">Customers</span>
            <ArrowRight size={16} className="text-blue-500" />
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">Analytics</span>
            <ArrowRight size={16} className="text-blue-500" />
            <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">AI Insights</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              ✦ No disconnected spreadsheets.
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              ✦ No manual stock calculations.
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              ✦ No scattered business data.
            </div>
          </div>

          <p className="text-sm font-bold text-slate-900 mt-6">
            Just one centralized ERP built around your business.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EVERYTHING YOU NEED TO RUN YOUR BUSINESS */}
      {/* ========================================================================= */}
      <section id="features" className="relative z-10 py-24 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="pill-bright-brown px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Core Modules
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display">
            Everything You Need to Run Your Business
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Streamline core operations across products, procurement, POS billing, and relationship directories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Module 1: Smart Inventory Management */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-500 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Package size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Smart Inventory Management</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Know exactly what is in stock, what is moving, and what needs attention.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Real-time stock tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Stock-in and stock-out management
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Low-stock visibility
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Product and category organization
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Automated inventory updates
              </li>
            </ul>
          </div>

          {/* Module 2: Powerful Purchase Management */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-500 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Truck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Powerful Purchase Management</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Keep your procurement process organized from supplier to inventory.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Create purchase transactions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Manage purchase items
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Track quantities and costs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Automatically update inventory
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Maintain purchase history
              </li>
            </ul>
          </div>

          {/* Module 3: Simplified Sales Management */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-500 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <ShoppingCart size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Simplified Sales Management</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage sales while keeping inventory synchronized automatically.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Create sales transactions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Manage customer purchases
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Track sales history
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Automatic stock deduction
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" /> Revenue tracking
              </li>
            </ul>
          </div>

          {/* Module 4: Customers & Suppliers */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-500 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Customers &amp; Suppliers</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Keep every important business relationship organized.
            </p>
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">Customers:</strong>
                <span className="text-slate-600">Manage customer profiles, contact information, and transaction history.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">Suppliers:</strong>
                <span className="text-slate-600">Maintain supplier records and connect suppliers with your purchasing workflow.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MEET YOUR AI COPILOT */}
      {/* ========================================================================= */}
      <section id="ai-copilot" className="relative z-10 py-24 px-6 sm:px-10 bg-[#0f172a] text-white overflow-hidden border-y border-slate-800">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold uppercase tracking-wider inline-block">
              MEET YOUR AI COPILOT
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display">
              Your Business Data. Your AI Assistant.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              <strong>Inventra AI Copilot</strong> brings intelligence directly into your ERP.
              Instead of searching through dashboards and reports manually, simply ask your business questions.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-center text-xs uppercase tracking-widest text-slate-400 mb-6 font-semibold">
              ✦ Ask questions like:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto text-xs">
              {[
                "Which products are running low?",
                "What are my best-selling products?",
                "How much revenue did we generate?",
                "Which products should I reorder?",
                "Show me my recent sales.",
                "What are my inventory trends?"
              ].map((q, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-200 flex items-center gap-3 font-medium">
                  <MessageSquareCode size={16} className="text-sky-400 shrink-0" />
                  <span>"{q}"</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-4">
            <p className="text-sm text-slate-300">
              The AI Copilot analyzes the information available in Inventra and turns it into <strong>simple, actionable business insights</strong>.
            </p>
            <div className="inline-block px-6 py-2 rounded-full bg-blue-600/30 border border-blue-400/40 text-sm font-bold text-white">
              Ask. Analyze. Act.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FROM DATA TO DECISIONS */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-20 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="pill-bright-brown px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Intelligent Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display">
            From Data to Decisions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Traditional ERP systems show you data. <strong>Inventra helps you understand it.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="text-xs font-bold uppercase text-slate-500">
              Traditional Workflow
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-700">
              Data → Reports → Manual Analysis → Decision
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Requires manual spreadsheet crunching, delayed reporting, and fragmented data interpretation.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-blue-50/50 border-2 border-blue-500 shadow-md space-y-4">
            <div className="text-xs font-bold uppercase text-blue-700">
              Inventra Workflow
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-sm">
              Data → AI Copilot → Insight → Decision
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              Your ERP becomes more than a database — it becomes an intelligent business assistant.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ONE DASHBOARD. COMPLETE VISIBILITY */}
      {/* ========================================================================= */}
      <section id="dashboard" className="relative z-10 py-20 px-6 sm:px-10 bg-slate-50/60 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="pill-bright-brown px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Real-Time Overview
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display">
              One Dashboard. Complete Visibility.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Get a real-time overview of your business from a single dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900 mb-1 font-display">Products</h4>
              <p className="text-xs text-slate-600">Monitor your complete product catalog.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900 mb-1 font-display">Inventory</h4>
              <p className="text-xs text-slate-600">Understand your current stock position.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900 mb-1 font-display">Customers</h4>
              <p className="text-xs text-slate-600">Keep track of your customer base.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900 mb-1 font-display">Suppliers</h4>
              <p className="text-xs text-slate-600">Manage your supplier network.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900 mb-1 font-display">Sales</h4>
              <p className="text-xs text-slate-600">Monitor transactions and revenue.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900 mb-1 font-display">Purchases</h4>
              <p className="text-xs text-slate-600">Track procurement and inventory inflow.</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center max-w-3xl mx-auto shadow-xs">
            <h4 className="font-bold text-base text-slate-900 font-display mb-2">Visual Analytics</h4>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Interactive charts transform raw business data into easy-to-understand insights.
            </p>
            <div className="text-xs font-bold text-blue-700 flex flex-wrap items-center justify-center gap-3">
              <span>Revenue Trends</span>
              <span>|</span>
              <span>Sales Analytics</span>
              <span>|</span>
              <span>Inventory Overview</span>
              <span>|</span>
              <span>Business Performance</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. BUILT FOR REAL BUSINESS OPERATIONS */}
      {/* ========================================================================= */}
      <section id="workflow" className="relative z-10 py-24 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="pill-bright-brown px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Step-by-Step Lifecycle
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display">
            Built for Real Business Operations
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Inventra is designed around how businesses actually operate.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 text-xs font-medium">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="font-bold text-blue-600 text-sm mb-1">1. Purchase</div>
            <div className="text-slate-600">A business purchases products from a supplier.</div>
          </div>

          <div className="flex justify-center text-blue-500"><ArrowDown size={18} /></div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="font-bold text-blue-600 text-sm mb-1">2. Inventory</div>
            <div className="text-slate-600">Stock is automatically added to inventory.</div>
          </div>

          <div className="flex justify-center text-blue-500"><ArrowDown size={18} /></div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="font-bold text-blue-600 text-sm mb-1">3. Sale</div>
            <div className="text-slate-600">Products are sold to customers.</div>
          </div>

          <div className="flex justify-center text-blue-500"><ArrowDown size={18} /></div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="font-bold text-blue-600 text-sm mb-1">4. Stock Update</div>
            <div className="text-slate-600">Inventory automatically reflects the sale.</div>
          </div>

          <div className="flex justify-center text-blue-500"><ArrowDown size={18} /></div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="font-bold text-blue-600 text-sm mb-1">5. Analytics</div>
            <div className="text-slate-600">Business performance is updated.</div>
          </div>

          <div className="flex justify-center text-blue-500"><ArrowDown size={18} /></div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
            <div className="font-bold text-white text-sm mb-1">6. AI Copilot</div>
            <div className="text-blue-100">AI analyzes the available data and helps the user understand what is happening.</div>
          </div>
        </div>

        <div className="text-center font-bold text-sm text-slate-900 mt-10">
          One connected ecosystem. Zero disconnected workflows.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. SECURE BY DESIGN */}
      {/* ========================================================================= */}
      <section id="security" className="relative z-10 py-20 px-6 sm:px-10 bg-slate-50/60 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto text-center">
          
          <span className="pill-bright-brown px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Enterprise Security
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display mb-4">
            Secure by Design
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-12">
            Your business data needs protection. Inventra incorporates modern security practices including:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto text-xs mb-10">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-left flex items-start gap-3">
              <Lock size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">JWT Authentication</strong>
                <span className="text-slate-500">Stateless cryptographically signed tokens.</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-left flex items-start gap-3">
              <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Password Hashing</strong>
                <span className="text-slate-500">Bcrypt salting algorithm.</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-left flex items-start gap-3">
              <Shield size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Protected API Routes</strong>
                <span className="text-slate-500">Strict middleware barriers.</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-left flex items-start gap-3">
              <Users size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Role-Based Authorization</strong>
                <span className="text-slate-500">Owner/Admin &amp; Staff access boundaries.</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-left flex items-start gap-3">
              <Server size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Secure Backend Architecture</strong>
                <span className="text-slate-500">Input validation &amp; CORS protections.</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-left flex items-start gap-3">
              <Database size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">PostgreSQL Relational DB</strong>
                <span className="text-slate-500">ACID compliance &amp; Prisma ORM.</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Your users get access to the information and operations they are authorized to use.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. BUILT WITH MODERN TECHNOLOGY */}
      {/* ========================================================================= */}
      <section id="tech" className="relative z-10 py-24 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="pill-bright-brown px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display">
            Built with Modern Technology
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Inventra is powered by a modern full-stack architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 text-xs">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="font-bold text-blue-700 uppercase text-[10px] block mb-2">[ Frontend ]</span>
            <p className="text-slate-900 font-semibold leading-relaxed">
              React • Vite • Tailwind CSS • Axios • React Router • Recharts
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="font-bold text-blue-700 uppercase text-[10px] block mb-2">[ Backend ]</span>
            <p className="text-slate-900 font-semibold leading-relaxed">
              Node.js • Express.js • REST APIs • JWT • bcrypt
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="font-bold text-blue-700 uppercase text-[10px] block mb-2">[ Database ]</span>
            <p className="text-slate-900 font-semibold leading-relaxed">
              PostgreSQL • Prisma ORM • pgAdmin
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="font-bold text-blue-700 uppercase text-[10px] block mb-2">[ Development ]</span>
            <p className="text-slate-900 font-semibold leading-relaxed">
              Git • GitHub • Postman
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <span className="font-bold text-sky-200 uppercase text-[10px] block mb-2">[ Intelligence ]</span>
            <p className="text-white font-bold leading-relaxed">
              AI Copilot Natural Language Engine
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. WHY INVENTRA? */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-20 px-6 sm:px-10 bg-slate-50/60 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="pill-bright-brown px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Advantages
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-display">
              Why Inventra?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 font-display">
                <Zap size={16} className="text-blue-600" />
                <span>Faster Operations</span>
              </h4>
              <p className="text-xs text-slate-600">
                Reduce repetitive manual work and manage everyday operations from one platform.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 font-display">
                <BarChart3 size={16} className="text-blue-600" />
                <span>Better Visibility</span>
              </h4>
              <p className="text-xs text-slate-600">
                See your inventory, sales, purchases, customers, and suppliers in one place.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 font-display">
                <Sparkles size={16} className="text-blue-600" />
                <span>AI-Powered Insights</span>
              </h4>
              <p className="text-xs text-slate-600">
                Ask questions naturally and get meaningful insights from your business data.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 font-display">
                <RefreshCw size={16} className="text-blue-600" />
                <span>Automated Inventory Flow</span>
              </h4>
              <p className="text-xs text-slate-600">
                Purchases and sales automatically affect inventory.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 font-display">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span>Smarter Decisions</span>
              </h4>
              <p className="text-xs text-slate-600">
                Turn business data into information you can actually act on.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 font-display">
                <ShieldCheck size={16} className="text-blue-600" />
                <span>Secure Architecture</span>
              </h4>
              <p className="text-xs text-slate-600">
                Built with authentication, authorization, and secure backend practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 px-6 sm:px-10 max-w-[1400px] mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-black shadow-lg mb-2">
            <InventraIcon size={40} />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 font-display">
            Stop Managing Data. Start Managing Your Business.
          </h2>
          
          <div className="space-y-1 text-sm sm:text-base text-slate-600">
            <p>Your inventory is constantly changing.</p>
            <p>Your sales are constantly changing.</p>
            <p>Your customers are constantly changing.</p>
            <p className="font-bold text-slate-900 pt-2">Your ERP should keep up.</p>
          </div>

          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Inventra brings your operations, analytics, and AI into one intelligent platform.
          </p>

          <div className="pt-4">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-display block mb-1">
              INVENTRA
            </span>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-8">
              Manage. Analyze. Decide. Grow.
            </span>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto btn-liquid-caramel px-8 py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-3 shadow-xl"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-slate-200 hover:border-blue-600 bg-white text-sm font-semibold text-slate-900 transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Explore Inventra</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 py-12 px-6 sm:px-10 border-t border-slate-200 bg-white text-xs text-slate-500">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-black flex items-center justify-center">
              <InventraIcon size={20} />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Inventra</span>
              <span className="text-[10px] text-slate-400">AI-Powered Inventory &amp; Sales ERP</span>
            </div>
          </div>

          <div className="text-center md:text-left text-slate-600 text-[11px]">
            <strong>Platform:</strong> Dashboard • Inventory • Products • Purchases • Sales • Customers • Suppliers • AI Copilot
          </div>

          <div className="text-slate-400 text-[11px]">
            © 2026 Inventra. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
