export interface ProjectEditorialData {
  id: string;
  chapter: string;
  kanjiSeal: string;
  kanjiSealSub: string;
  plateNumber: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  problem: string;
  keyFeatures: { label: string; detail: string }[];
  stack: string[];
  architecture: { step: string; title: string; desc: string }[];
  implementation: string;
  results: { metric: string; label: string }[];
  githubUrl: string;
  liveUrl?: string;
}

export const projectEditorialCatalog: Record<number, ProjectEditorialData> = {
  // 0: SONARIQ
  0: {
    id: "sonariq",
    chapter: "CHAPTER 01 // ARCHIVE SPEC",
    kanjiSeal: "検証済",
    kanjiSealSub: "VERIFIED",
    plateNumber: "PLATE NO. 01 // FOCAL CORE",
    title: "SONARIQ",
    subtitle: "AI Startup Feasibility & Risk Intelligence Engine",
    shortDesc:
      "Autonomous multi-agent diligence platform synthesizing empirical market validation, competitor moats, and investor risk dossiers in real time.",
    problem:
      "Founders and VCs waste weeks on fragmented diligence, static TAM spreadsheets, and subjective hunches with zero empirical market signals.",
    keyFeatures: [
      {
        label: "COMPETITOR RADAR",
        detail: "Real-time landscape scraping and moat vulnerability index scoring.",
      },
      {
        label: "MONTE CARLO TAM",
        detail: "Dynamic probabilistic market sizing across 3 scenario bands.",
      },
      {
        label: "RISK SYNTHESIS",
        detail: "Multi-agent stress-testing across unit economics and architecture.",
      },
      {
        label: "DOSSIER EXPORT",
        detail: "Instant investor-grade PDF and raw telemetry export pipeline.",
      },
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "FastAPI",
      "Claude 3.5",
      "pgvector",
      "Tailwind CSS",
    ],
    architecture: [
      {
        step: "01",
        title: "INGESTION",
        desc: "Parallel scrapers across patent & market registries",
      },
      {
        step: "02",
        title: "HYBRID VECTORS",
        desc: "Sub-second dense-sparse embeddings on pgvector",
      },
      {
        step: "03",
        title: "SYNTHESIS AGENT",
        desc: "Multi-agent confidence scoring & risk curves",
      },
      {
        step: "04",
        title: "STREAMING EDGE",
        desc: "Speculative token streaming to WebGL canvases",
      },
    ],
    implementation:
      "Engineered an async streaming engine delivering sub-420ms telemetry updates while tokenizing complex financial models in parallel.",
    results: [
      { metric: "8.4x", label: "Research Cycle Speedup" },
      { metric: "120K+", label: "Patents & Entities Indexed" },
      { metric: "<420ms", label: "Median Query Response" },
    ],
    githubUrl: "https://github.com/granthx/SonarIQ",
    liveUrl: "https://sonar-iq-gc.vercel.app/",
  },

  // 1: SCOUT
  1: {
    id: "scout",
    chapter: "CHAPTER 02 // ARCHIVE SPEC",
    kanjiSeal: "探査機",
    kanjiSealSub: "SCOUT",
    plateNumber: "PLATE NO. 02 // FOCAL CORE",
    title: "SCOUT",
    subtitle: "India-First Federated Multi-Platform Discovery Engine",
    shortDesc:
      "High-throughput unified search and intelligence engine indexing real-time catalogs, prices, and stock across 18+ Indian commerce ecosystems.",
    problem:
      "India's hyper-fragmented quick-commerce and marketplace landscape traps consumers in walled gardens with zero unified price or stock discovery.",
    keyFeatures: [
      {
        label: "FEDERATED CRAWL",
        detail: "Instant parallel query dispatch across 18+ marketplace endpoints.",
      },
      {
        label: "SOUNDEX HINGLISH",
        detail: "Phonetic transliteration parsing vernacular and slang search terms.",
      },
      {
        label: "PRICE DELTA",
        detail: "Historical volatility graphs with instant drop notification hooks.",
      },
      {
        label: "UNBIASED RANK",
        detail: "Pure algorithmic relevance scoring with zero paid-ad distortion.",
      },
    ],
    stack: [
      "Rust / Actix",
      "React 18",
      "Meilisearch",
      "Playwright Fleet",
      "Redis",
      "Tailwind",
    ],
    architecture: [
      {
        step: "01",
        title: "DISPATCH",
        desc: "Low-overhead async worker pool querying endpoints",
      },
      {
        step: "02",
        title: "NORMALIZATION",
        desc: "Unified schema standardizing disparate SKU catalogs",
      },
      {
        step: "03",
        title: "INVERTED INDEX",
        desc: "Sub-50ms typo-tolerant Meilisearch ranking",
      },
      {
        step: "04",
        title: "WEBSOCKET STREAM",
        desc: "Full-duplex reactive state update to clients",
      },
    ],
    implementation:
      "Authored a custom Rust crawler middleware with connection pooling and jittered backoff, sustaining 4,000 req/sec with minimal memory footprint.",
    results: [
      { metric: "45ms", label: "p99 Mean Query Latency" },
      { metric: "18+", label: "Commerce Platforms Synced" },
      { metric: "400K+", label: "Active SKUs Monitored" },
    ],
    githubUrl: "https://github.com/granthx/SCOUT",
    liveUrl: "https://scout-server.pages.dev/",
  },

  // 2: DILLI JALNAV EDGE
  2: {
    id: "delhijalnav-edge",
    chapter: "CHAPTER 03 // ARCHIVE SPEC",
    kanjiSeal: "水路図",
    kanjiSealSub: "NAV-EDGE",
    plateNumber: "PLATE NO. 03 // FOCAL CORE",
    title: "DILLI JALNAV EDGE",
    subtitle: "Real-Time Monsoon Flood & Emergency Route Navigation",
    shortDesc:
      "Decentralized edge navigation system routing ambulances and commuters around submerged underpasses and flash-flooded transit corridors.",
    problem:
      "Annual monsoon flash floods paralyze Delhi. Standard GPS apps lack road water depth telemetry, stranding emergency vehicles in hazardous flooded underpasses.",
    keyFeatures: [
      {
        label: "WATER DEPTH HEATMAP",
        detail: "Live road navigability tiers color-coded by verified submersion depth.",
      },
      {
        label: "AMBULANCE BYPASS",
        detail: "Dynamic emergency corridors bypassing acute flood chokepoints.",
      },
      {
        label: "OFFLINE-FIRST EDGE",
        detail: "Local SQLite & vector tile caching for severed network zones.",
      },
      {
        label: "GEO-FENCED VERIFY",
        detail: "Anti-spam telemetry verification using hardware GPS lock filters.",
      },
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Node.js",
      "PostGIS",
      "Mapbox GL",
      "Cloudflare Workers",
    ],
    architecture: [
      {
        step: "01",
        title: "TELEMETRY",
        desc: "Crowdsourced & IoT depth sensor ingestion via MQTT",
      },
      {
        step: "02",
        title: "POSTGIS ISOCHRONE",
        desc: "Elevation-factored spatial impedance routing",
      },
      {
        step: "03",
        title: "EDGE REPLICATION",
        desc: "Delta tile updates pushed to client local DBs",
      },
      {
        step: "04",
        title: "ACTIVE RE-PATH",
        desc: "Dynamic rerouting penalizing flooded nodes exponentially",
      },
    ],
    implementation:
      "Designed an isochrone routing penalty matrix that dynamically scales edge impedance according to vehicle axle clearance and live water depth telemetry.",
    results: [
      { metric: "42%", label: "Detour Delay Reduction" },
      { metric: "180+", label: "Hotspots Tracked Live" },
      { metric: "<80ms", label: "Offline Recalculation" },
    ],
    githubUrl: "https://github.com/granthx/MargSetu",
    liveUrl: "https://d3vchw4bg3abh4.cloudfront.net/",
  },

  // 3: SATQUERY AI
  3: {
    id: "satquery",
    chapter: "CHAPTER 04 // ARCHIVE SPEC",
    kanjiSeal: "衛星観",
    kanjiSealSub: "SAT-AI",
    plateNumber: "PLATE NO. 04 // FOCAL CORE",
    title: "SATQUERY AI",
    subtitle: "Conversational Earth Observation & Satellite Analytics",
    shortDesc:
      "Translates natural language prompts into multispectral satellite processing pipelines, mapping flood boundaries and crop damage dynamically.",
    problem:
      "Earth observation workflows require specialized GIS software, band-math algebra, and downloading multi-GB SAR rasters, throttling emergency disaster response.",
    keyFeatures: [
      {
        label: "NATURAL LANGUAGE GIS",
        detail: "Query satellite records using conversational English phrases.",
      },
      {
        label: "SAR & OPTICAL FUSION",
        detail: "Fuses Sentinel-1 cloud-penetrating radar with Sentinel-2 RGB.",
      },
      {
        label: "NDWI FLOOD MASKS",
        detail: "Sub-hectare pixel segmentation of standing water boundaries.",
      },
      {
        label: "VECTOR GEOJSON",
        detail: "Instant GeoJSON polygon export formatted for first-responder teams.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Earth Engine API",
      "PyTorch / UNet",
      "React",
      "Deck.gl",
    ],
    architecture: [
      {
        step: "01",
        title: "NLP PARSER",
        desc: "Intent extraction of temporal spans, coords & bands",
      },
      {
        step: "02",
        title: "GEE PIPELINE",
        desc: "Cloud raster algebra & NDWI water band calculation",
      },
      {
        step: "03",
        title: "TILE STREAMER",
        desc: "Dynamic downsampling proxy delivering Slippy Map tiles",
      },
      {
        step: "04",
        title: "GPU SHADER",
        desc: "Deck.gl WebGL raster layer with elevation hillshade",
      },
    ],
    implementation:
      "Engineered an async tile-server proxy that downsamples multispectral TIFF rasters on the fly, streaming 4K geospatial overlays directly to browser canvases.",
    results: [
      { metric: "93.8%", label: "Flood IoU Precision" },
      { metric: "10x", label: "Relief Dilemma Speedup" },
      { metric: "1.2M", label: "Sq Km Processed" },
    ],
    githubUrl: "https://github.com/granthx/SatQuery-AI",
  },

  // 4: KIRANAMATE
  4: {
    id: "kiranamate",
    chapter: "CHAPTER 05 // ARCHIVE SPEC",
    kanjiSeal: "店舗網",
    kanjiSealSub: "SWARM",
    plateNumber: "PLATE NO. 05 // FOCAL CORE",
    title: "KIRANAMATE",
    subtitle: "Autonomous Retail & WhatsApp Voice Commerce Swarm",
    shortDesc:
      "Multi-agent retail intelligence swarm enabling traditional Kirana merchants to run automated stock, voice bookkeeping, and replenishment over WhatsApp.",
    problem:
      "India's 12M+ neighborhood Kiranas face acute pressure from quick-commerce giants but cannot adopt complex POS systems due to vernacular language and friction.",
    keyFeatures: [
      {
        label: "VOICE KHATA",
        detail: "Converts colloquial Hindi voice notes into structured credit ledgers.",
      },
      {
        label: "DEPLETION PREDICTOR",
        detail: "Predictive reordering curves triggering automatic supplier orders.",
      },
      {
        label: "WHATSAPP STORE",
        detail: "Instant interactive catalog with one-tap UPI payment deep links.",
      },
      {
        label: "ZERO INSTALL",
        detail: "Operates 100% natively through familiar WhatsApp chat threads.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "WhatsApp Cloud API",
      "Whisper ASR",
      "Supabase",
      "React Admin",
    ],
    architecture: [
      {
        step: "01",
        title: "WEBHOOK",
        desc: "Bi-directional WhatsApp event listener for voice/text",
      },
      {
        step: "02",
        title: "WHISPER ASR",
        desc: "Acoustic model tuned for noisy street Hindi accents",
      },
      {
        step: "03",
        title: "LLM PARSER",
        desc: "Entity extraction mapping colloquial product slang",
      },
      {
        step: "04",
        title: "ATOMIC LEDGER",
        desc: "PostgreSQL transaction sync & UPI payment trigger",
      },
    ],
    implementation:
      "Built a specialized audio preprocessing and noise-reduction pipeline tailored for chaotic market environments, reaching 96% transcription fidelity on trade slang.",
    results: [
      { metric: "3,400+", label: "Weekly Orders Processed" },
      { metric: "94%", label: "Merchant Retention" },
      { metric: "0", label: "App Installs Needed" },
    ],
    githubUrl: "https://github.com/granthx/KiranaMate",
  },

  // 5: MEDIAPIPE ASL
  5: {
    id: "asl-sign",
    chapter: "CHAPTER 06 // ARCHIVE SPEC",
    kanjiSeal: "手話解",
    kanjiSealSub: "CV-ASL",
    plateNumber: "PLATE NO. 06 // FOCAL CORE",
    title: "MEDIAPIPE ASL",
    subtitle: "Real-Time Client-Side ASL Gesture Translation System",
    shortDesc:
      "Zero-latency browser gesture interpreter tracking 21 3D hand keypoints directly on device with bi-directional voice feedback.",
    problem:
      "Digital video communications lack native accessibility for Deaf communities, while cloud-based video translation models incur high latency and privacy risks.",
    keyFeatures: [
      {
        label: "60 FPS CLIENT CV",
        detail: "Runs entirely in WebAssembly & WebGL without uploading video frames.",
      },
      {
        label: "21-KEYPOINT SKELETON",
        detail: "3D joint tracking invariant to lighting shifts and diverse skin tones.",
      },
      {
        label: "KALMAN SMOOTHING",
        detail: "Suppresses camera noise jitter to ensure steady phrase detection.",
      },
      {
        label: "SPEECH SYNTHESIS",
        detail: "Bi-directional audio speech output via browser Web Speech API.",
      },
    ],
    stack: [
      "TensorFlow.js",
      "MediaPipe Hands",
      "TypeScript",
      "Next.js",
      "Web Speech API",
    ],
    architecture: [
      {
        step: "01",
        title: "WEBCAM CAPTURE",
        desc: "60 FPS video frames polled in requestVideoFrameCallback",
      },
      {
        step: "02",
        title: "WASM KERNEL",
        desc: "MediaPipe landmark calculations executed on CPU/GPU",
      },
      {
        step: "03",
        title: "LSTM CLASSIFIER",
        desc: "Temporal gesture matching over spatial coordinate vectors",
      },
      {
        step: "04",
        title: "VOICE OUTPUT",
        desc: "Native synthesis articulating translated sentences",
      },
    ],
    implementation:
      "Quantized the spatio-temporal gesture network down to 4.2MB, preserving 60 FPS performance on mid-tier hardware with negligible battery drain.",
    results: [
      { metric: "60 FPS", label: "Client Edge Frame Rate" },
      { metric: "98.1%", label: "Gesture Accuracy Rate" },
      { metric: "0ms", label: "Server Cloud Latency" },
    ],
    githubUrl: "https://github.com/granthx/real-time-sign-language-recognition",
  },

  // 6: THE SIGNAL
  6: {
    id: "the-signal",
    chapter: "CHAPTER 07 // ARCHIVE SPEC",
    kanjiSeal: "公式記",
    kanjiSealSub: "OFFICIAL",
    plateNumber: "PLATE NO. 07 // FOCAL CORE",
    title: "THE SIGNAL",
    subtitle: "Manga Brutalist Tech & Strategic Intelligence Publication",
    shortDesc:
      "Brutalist editorial publication engine engineered for high-density investigative tech essays, marginalia telemetry, and cognitive immersion.",
    problem:
      "Modern digital publishing is overwhelmed by algorithmic clickbait, intrusive popups, and layout reflow that destroy cognitive immersion and reading flow.",
    keyFeatures: [
      {
        label: "ASYMMETRIC MARGINALIA",
        detail: "Floating footnotes and interactive telemetry pinned alongside paragraphs.",
      },
      {
        label: "CUSTOM TYPE ENGINE",
        detail: "High-contrast serif display paired with monospace spec blocks.",
      },
      {
        label: "READING CADENCE HUD",
        detail: "Tactile progress indicator tracking real-time cognitive dwell time.",
      },
      {
        label: "DISTRACTION-FREE",
        detail: "Pure typography layout with zero popups, ads, or tracking pixels.",
      },
    ],
    stack: [
      "Next.js 14",
      "Tailwind CSS",
      "MDX Bundler",
      "GSAP",
      "Framer Motion",
      "Vercel Edge",
    ],
    architecture: [
      {
        step: "01",
        title: "MDX PARSER",
        desc: "Custom AST parser compiling marginalia and charts",
      },
      {
        step: "02",
        title: "EDGE SSR",
        desc: "Sub-20ms edge static delivery with instant font hydration",
      },
      {
        step: "03",
        title: "VIEWPORT HUD",
        desc: "IntersectionObserver syncing sidebars to reading position",
      },
      {
        step: "04",
        title: "OFFLINE PWA",
        desc: "Service worker caching long-form essays for offline reading",
      },
    ],
    implementation:
      "Engineered an asymmetric CSS Grid layout system that automatically balances dense mathematical annotations and citations without causing vertical reflow.",
    results: [
      { metric: "99/100", label: "Lighthouse Performance" },
      { metric: "4.2m", label: "Average Reading Dwell" },
      { metric: "<55KB", label: "Initial Bundle Size" },
    ],
    githubUrl: "https://github.com/granthx/TheSignal",
    liveUrl: "https://thesignal-9vy.pages.dev/",
  },
};
