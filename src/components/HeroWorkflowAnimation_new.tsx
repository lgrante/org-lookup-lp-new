import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaDatabase,
  FaCode,
  FaStream,
  FaChartBar,
  FaBolt,
  FaSearch,
} from "react-icons/fa";

// --- Palette & helpers ------------------------------------------------------

const COLORS = {
  bg: "#faf9f7",
  primary: "#4f46e5",
  primarySoft: "#eef2ff",
  primaryBorderSoft: "#c7d2fe",
  accent: "#22c55e",
  danger: "#DC2626",
  orange: "#fb923c",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2933",
  white: "#ffffff",
};

// Rayon des nœuds circulaires (44px de diamètre)
const NODE_RADIUS = 22;

// Timeline décrivant la séquence d'animation du curseur et des highlights.
const TIMELINE = [
  // STEP 0 – Instant Obsolete Detection
  { step: 0, highlight: "legacyRow", cursor: { x: 68, y: 48 }, duration: 700 },
  { step: 0, highlight: "legacyRow", cursor: { x: 68, y: 48, click: true }, duration: 700 },

  // STEP 1 – Visual Impact Analysis
  { step: 1, highlight: "legacyNode", cursor: { x: 45, y: 45 }, duration: 600 },
  { step: 1, highlight: "leadFlowNode", cursor: { x: 68, y: 33 }, duration: 600 },
  { step: 1, highlight: "leadFlowNode", cursor: { x: 68, y: 33, click: true }, duration: 600 },

  // STEP 2 – External Code Scanning
  { step: 2, highlight: "webFormApp", cursor: { x: 30, y: 40 }, duration: 650 },
  { step: 2, highlight: "webFormApp", cursor: { x: 30, y: 40, click: true }, duration: 650 },
  { step: 2, highlight: "leadCustomObj", cursor: { x: 55, y: 55 }, duration: 650 },
  { step: 2, highlight: "leadCustomObj", cursor: { x: 55, y: 55, click: true }, duration: 650 },

  // STEP 3 – Create Deletion Queue
  { step: 3, highlight: "queueLegacyRow", cursor: { x: 32, y: 47 }, duration: 650 },
  { step: 3, highlight: "queueLegacyRow", cursor: { x: 32, y: 47, click: true }, duration: 650 },
  { step: 3, highlight: "queueLegacyRow", cursor: { x: 72, y: 76 }, duration: 650 },
  { step: 3, highlight: "queueLegacyRow", cursor: { x: 72, y: 76, click: true }, duration: 650 },

  // STEP 4 – Automated Safe Execution
  { step: 4, highlight: null, cursor: { x: 32, y: 35 }, duration: 550 },
  { step: 4, highlight: null, cursor: { x: 32, y: 45 }, duration: 550 },
  { step: 4, highlight: "acceptButton", cursor: { x: 74, y: 78 }, duration: 700 },
  { step: 4, highlight: "acceptButton", cursor: { x: 74, y: 78, click: true }, duration: 900 },
];

// Calcule les coordonnées de départ / arrivée pour que la ligne parte de la
// surface du disque source et arrive sur la surface du disque destination.
function computeArrowPositions(from, to, radius = NODE_RADIUS) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  return {
    x1: from.x + ux * radius,
    y1: from.y + uy * radius,
    x2: to.x - ux * radius,
    y2: to.y - uy * radius,
  };
}

// --- Composant principal ----------------------------------------------------

export function HeroWorkflowAnimation() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const current = TIMELINE[frameIndex];
    const timer = window.setTimeout(() => {
      setFrameIndex((prev) => (prev + 1) % TIMELINE.length);
    }, current.duration);

    return () => window.clearTimeout(timer);
  }, [frameIndex]);

  const frame = TIMELINE[frameIndex];

  return (
    <div
      style={{
        width: '70%',
        backgroundColor: COLORS.bg,
        borderRadius: 24,
        padding: 0,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0px 14px 20px 0px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 20,
          backgroundColor: COLORS.white,
          border: `1px solid ${COLORS.gray200}`,
          padding: 20,
          minHeight: 340,
          overflow: "hidden",
        }}
      >
        {/* Conteneur animé pour les 5 écrans (sans AnimatePresence pour éviter les problèmes de version) */}
        <motion.div
          key={frame.step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {frame.step === 0 && <Step0InstantDetection highlight={frame.highlight} />}
          {frame.step === 1 && <Step1ImpactMap highlight={frame.highlight} />}
          {frame.step === 2 && <Step2ExternalScan highlight={frame.highlight} />}
          {frame.step === 3 && <Step3DeletionQueue highlight={frame.highlight} />}
          {frame.step === 4 && <Step4SmartPlan highlight={frame.highlight} />}
        </motion.div>

        {/* Curseur animé global */}
        {/*<AnimatedCursor cursor={frame.cursor} />*/}
      </div>
    </div>
  );
}

export default HeroWorkflowAnimation;

// --- Curseur animé ----------------------------------------------------------

function AnimatedCursor({ cursor }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        width: 22,
        height: 22,
        borderRadius: 999,
        border: `2px solid ${COLORS.gray800}`,
        backgroundColor: "rgba(255,255,255,0.9)",
        boxShadow: "0 4px 12px rgba(15,23,42,0.25)",
        top: 0,
        left: 0,
        transform: "translate(-50%, -50%)",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      animate={{
        x: `${cursor.x}%`,
        y: `${cursor.y}%`,
        scale: cursor.click ? [1, 0.88, 1] : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26,
        mass: 0.9,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "999px",
          backgroundColor: COLORS.gray800,
        }}
      />
    </motion.div>
  );
}

// --- STEP 0 : Instant Obsolete Detection ------------------------------------

function Step0InstantDetection({ highlight }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              backgroundColor: COLORS.primarySoft,
              border: `1px solid ${COLORS.primaryBorderSoft}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.primary,
            }}
          >
            <FaSearch />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Org Metadata Scanner
            </div>
            <div style={{ fontSize: 12, color: COLORS.gray600 }}>
              Instant obsolete detection
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              padding: "2px 8px",
              borderRadius: 999,
              backgroundColor: COLORS.accent,
              color: COLORS.white,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            128 items
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div
        style={{
          display: "inline-flex",
          gap: 8,
          flexWrap: "wrap",
          fontSize: 11,
        }}
      >
        <FlatFilterChip label="High risk" bg={COLORS.danger} border="#f87171" />
        <FlatFilterChip label="Low usage" bg={COLORS.orange} border="#fed7aa" />
        <FlatFilterChip label="Old fields" bg={COLORS.gray400} border={COLORS.gray300} />
      </div>

      {/* Table métadonnées */}
      <div
        style={{
          borderRadius: 12,
          border: `1px solid ${COLORS.gray200}`,
          overflow: "hidden",
          fontSize: 12,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.2fr 1.1fr 1fr 0.9fr",
            backgroundColor: COLORS.gray50,
            borderBottom: `1px solid ${COLORS.gray200}`,
            padding: "6px 10px",
            color: COLORS.gray700,
            fontWeight: 500,
          }}
        >
          <div>Field</div>
          <div>Type</div>
          <div>Usage</div>
          <div>Risk</div>
        </div>

        <MetadataRow
          active={highlight === "legacyRow"}
          name="Legacy score"
          type="Number"
          usage="0.4%"
          badgeLabel="High"
          badgeColor={COLORS.danger}
        />
        <MetadataRow
          active={false}
          name="Onboarding flag"
          type="Checkbox"
          usage="1.2%"
          badgeLabel="Medium"
          badgeColor={COLORS.orange}
        />
        <MetadataRow
          active={false}
          name="Temp notes"
          type="Text"
          usage="0%"
          badgeLabel="High"
          badgeColor={COLORS.danger}
        />
      </div>
    </div>
  );
}

function FlatFilterChip({ label, bg, border }) {
  return (
    <div
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        backgroundColor: bg,
        color: COLORS.white,
        border: `1px solid ${border}`,
        fontWeight: 500,
      }}
    >
      {label}
    </div>
  );
}

function MetadataRow({ active, name, type, usage, badgeLabel, badgeColor }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2.2fr 1.1fr 1fr 0.9fr",
        padding: "7px 10px",
        alignItems: "center",
        backgroundColor: active ? COLORS.primarySoft : "transparent",
        borderBottom: `1px solid ${COLORS.gray100}`,
        transition: "background-color 160ms ease-out",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontWeight: active ? 600 : 500,
          color: COLORS.gray800,
        }}
      >
        {name}
      </div>
      <div style={{ color: COLORS.gray600 }}>{type}</div>
      <div style={{ color: COLORS.gray600 }}>{usage}</div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 600,
            backgroundColor: badgeColor,
            color: COLORS.white,
          }}
        >
          {badgeLabel}
        </span>
      </div>
    </div>
  );
}

// --- STEP 1 : Visual Impact Analysis ---------------------------------------

function Step1ImpactMap({ highlight }) {
  const isLegacy = highlight === "legacyNode";
  const isLeadFlow = highlight === "leadFlowNode";

  // Centres des nœuds dans le repère SVG (viewBox 0 0 320 180)
  const legacy = { x: 160, y: 99 };
  const leadFlow = { x: 230.4, y: 54 };
  const renewalFlow = { x: 249.6, y: 117 };
  const cleanupBatch = { x: 208, y: 147.6 };
  const pipelineReport = { x: 96, y: 57.6 };
  const salesConsole = { x: 76.8, y: 135 };

  const edges = [
    { id: "legacy-lead", from: legacy, to: leadFlow, color: COLORS.primary },
    { id: "legacy-renewal", from: legacy, to: renewalFlow, color: COLORS.primary },
    { id: "legacy-cleanup", from: legacy, to: cleanupBatch, color: "#a855f7" },
    { id: "legacy-pipeline", from: legacy, to: pipelineReport, color: COLORS.accent },
    { id: "legacy-console", from: legacy, to: salesConsole, color: "#0ea5e9" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 4 }}>
            <CircleDot color={COLORS.primary} />
            <CircleDot color="#a855f7" />
            <CircleDot color={COLORS.accent} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Impact map
            </div>
            <div style={{ fontSize: 12, color: COLORS.gray600 }}>Opportunity</div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: 12,
          border: `1px solid ${COLORS.gray200}`,
          backgroundColor: COLORS.white,
          padding: 14,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.gray800,
            marginBottom: 10,
          }}
        >
          Impact around 'Legacy score'
        </div>

        <div
          style={{
            position: "relative",
            height: 180,
          }}
        >
          {/* Nœuds (tous en cercle, même rayon) */}
          <ImpactNodeCircle
            label="Legacy score"
            kind="Field"
            x="50%"
            y="55%"
            color={COLORS.primary}
            active={isLegacy}
          />
          <ImpactNodeCircle
            label="Lead flow"
            kind="Flow"
            x="72%"
            y="30%"
            color={COLORS.primary}
            active={isLeadFlow}
          />
          <ImpactNodeCircle
            label="Renewal flow"
            kind="Flow"
            x="78%"
            y="65%"
            color={COLORS.primary}
            active={false}
          />
          <ImpactNodeCircle
            label="CleanupBatch"
            kind="Apex"
            x="65%"
            y="82%"
            color="#a855f7"
            active={false}
          />
          <ImpactNodeCircle
            label="Pipeline report"
            kind="Report"
            x="30%"
            y="32%"
            color={COLORS.accent}
            active={false}
          />
          <ImpactNodeCircle
            label="Sales console"
            kind="App"
            x="24%"
            y="75%"
            color="#0ea5e9"
            active={false}
          />

          {/* Flèches calculées pour partir / arriver à la surface des cercles */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 180"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <defs>
              <marker
                id="arrow"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L6,3 z" fill={COLORS.primary} />
              </marker>
            </defs>

            {edges.map((edge) => {
              const { x1, y1, x2, y2 } = computeArrowPositions(
                edge.from,
                edge.to,
                NODE_RADIUS,
              );
              return (
                <line
                  key={edge.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={edge.color}
                  strokeWidth={1.2}
                  markerEnd="url(#arrow)"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

function CircleDot({ color }) {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: 999,
        backgroundColor: color,
      }}
    />
  );
}

function ImpactNodeCircle({ label, kind, x, y, color, active }) {
  const renderIcon = () => {
    if (kind === "Flow") return <FaStream style={{ fontSize: 16 }} />;
    if (kind === "Apex") return <FaCode style={{ fontSize: 16 }} />;
    if (kind === "Report") return <FaChartBar style={{ fontSize: 16 }} />;
    if (kind === "App") return <FaBolt style={{ fontSize: 16 }} />;
    if (kind === "Field") return <FaDatabase style={{ fontSize: 16 }} />;
    return null;
  };

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
      }}
    >
      <div
        style={{
          width: NODE_RADIUS * 2,
          height: NODE_RADIUS * 2,
          borderRadius: 999,
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.white,
          fontWeight: 600,
          boxShadow: active ? "0 0 0 4px rgba(79,70,229,0.25)" : "none",
          transition: "box-shadow 160ms ease-out",
        }}
      >
        {renderIcon()}
      </div>
      <div
        style={{
          padding: "2px 6px",
          borderRadius: 999,
          backgroundColor: COLORS.gray50,
          border: `1px solid ${COLORS.gray200}`,
          color: COLORS.gray700,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// --- STEP 2 : External Code Scanning ---------------------------------------

function Step2ExternalScan({ highlight }) {
  // Centres des nœuds dans le repère SVG (viewBox 0 0 320 160)
  const webForm = { x: 70.4, y: 60.8 };
  const marketing = { x: 70.4, y: 115.2 };
  const lead = { x: 166.4, y: 83.2 };
  const subscription = { x: 249.6, y: 83.2 };
  const syncJob = { x: 224, y: 32 };

  const edges = [
    { id: "web-lead", from: webForm, to: lead, color: COLORS.primary },
    { id: "marketing-lead", from: marketing, to: lead, color: COLORS.primary },
    { id: "lead-sub", from: lead, to: subscription, color: COLORS.primary },
    { id: "lead-sync", from: lead, to: syncJob, color: "#a855f7" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              backgroundColor: COLORS.gray800,
              border: `1px solid ${COLORS.gray300}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.white,
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            <FaGithub />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Repo scan
            </div>
            <div style={{ fontSize: 12, color: COLORS.gray600 }}>GitHub</div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: 12,
          border: `1px solid ${COLORS.gray200}`,
          backgroundColor: COLORS.white,
          padding: 14,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.gray800,
            marginBottom: 10,
          }}
        >
          External dependencies on Lead
        </div>

        <div style={{ position: "relative", height: 160 }}>
          {/* Nœuds */}
          <GitCircle
            label="Web form app"
            x="22%"
            y="38%"
            active={highlight === "webFormApp"}
          />
          <GitCircle label="Marketing app" x="22%" y="72%" active={false} />

          <SfObjectNode
            label="Lead (custom obj)"
            x="52%"
            y="52%"
            active={highlight === "leadCustomObj"}
          />
          <SfObjectNode
            label="Subscription obj"
            x="78%"
            y="52%"
            active={false}
          />

          <ApexNode label="Sync job" x="70%" y="20%" />

          {/* Flèches entre nœuds, ajustées à la surface des cercles */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 160"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <defs>
              <marker
                id="arrow2"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L6,3 z" fill={COLORS.primary} />
              </marker>
            </defs>

            {edges.map((edge) => {
              const { x1, y1, x2, y2 } = computeArrowPositions(
                edge.from,
                edge.to,
                NODE_RADIUS,
              );
              return (
                <line
                  key={edge.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={edge.color}
                  strokeWidth={1.2}
                  markerEnd="url(#arrow2)"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Bouton d'action */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            borderRadius: 999,
            padding: "6px 16px",
            border: `1px solid #f87171`,
            backgroundColor: COLORS.danger,
            color: COLORS.white,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Add to deletion queue
        </button>
      </div>
    </div>
  );
}

function GitCircle({ label, x, y, active }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
      }}
    >
      <div
        style={{
          width: NODE_RADIUS * 2,
          height: NODE_RADIUS * 2,
          borderRadius: 999,
          backgroundColor: COLORS.gray800,
          border: `1px solid ${COLORS.gray300}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.white,
          fontWeight: 700,
          fontSize: 16,
          boxShadow: active ? "0 0 0 4px rgba(248, 250, 252, 0.65)" : "none",
          transition: "box-shadow 160ms ease-out",
        }}
      >
        <FaGithub />
      </div>
      <div
        style={{
          padding: "2px 6px",
          borderRadius: 999,
          backgroundColor: COLORS.gray50,
          border: `1px solid ${COLORS.gray200}`,
          color: COLORS.gray700,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function SfObjectNode({ label, x, y, active }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
      }}
    >
      <div
        style={{
          width: NODE_RADIUS * 2,
          height: NODE_RADIUS * 2,
          borderRadius: 999,
          backgroundColor: COLORS.orange,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.white,
          fontWeight: 600,
          boxShadow: active ? "0 0 0 4px rgba(251, 146, 60, 0.35)" : "none",
          transition: "box-shadow 160ms ease-out",
        }}
      >
        <FaDatabase style={{ fontSize: 16 }} />
      </div>
      <div
        style={{
          padding: "2px 6px",
          borderRadius: 999,
          backgroundColor: COLORS.gray50,
          border: `1px solid ${COLORS.gray200}`,
          color: COLORS.gray700,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function ApexNode({ label, x, y }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
      }}
    >
      <div
        style={{
          width: NODE_RADIUS * 2,
          height: NODE_RADIUS * 2,
          borderRadius: 999,
          backgroundColor: "#a855f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.white,
          fontWeight: 600,
        }}
      >
        <FaCode style={{ fontSize: 16 }} />
      </div>
      <div
        style={{
          padding: "2px 6px",
          borderRadius: 999,
          backgroundColor: COLORS.gray50,
          border: `1px solid ${COLORS.gray200}`,
          color: COLORS.gray700,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// --- STEP 3 : Create Deletion Queue ----------------------------------------

function Step3DeletionQueue({ highlight }) {
  const legacyActive = highlight === "queueLegacyRow";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              backgroundColor: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.white,
              fontWeight: 700,
            }}
          >
            ✓
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Deletion queue
            </div>
            <div style={{ fontSize: 12, color: COLORS.gray600 }}>Legacy score</div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: 12,
          border: `1px solid ${COLORS.gray200}`,
          backgroundColor: COLORS.white,
          padding: 14,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.gray800,
            marginBottom: 10,
          }}
        >
          Items queued for deletion
        </div>

        <div
          style={{
            borderRadius: 10,
            border: `1px solid ${COLORS.gray200}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.1fr 1.1fr 0.9fr",
              backgroundColor: COLORS.gray50,
              borderBottom: `1px solid ${COLORS.gray200}`,
              padding: "6px 10px",
              fontSize: 11,
              fontWeight: 500,
              color: COLORS.gray700,
            }}
          >
            <div>Name</div>
            <div>Object</div>
            <div>Type</div>
            <div>Risk</div>
          </div>

          <QueueRow
            name="Legacy score field"
            object="Lead"
            type="Field"
            badgeLabel="High"
            badgeColor={COLORS.danger}
            highlighted={legacyActive}
          />
          <QueueRow
            name="Old status field"
            object="Account"
            type="Field"
            badgeLabel="Medium"
            badgeColor={COLORS.orange}
          />
          <QueueRow
            name="Unused workflow rule"
            object="Opportunity"
            type="Workflow"
            badgeLabel="Medium"
            badgeColor={COLORS.orange}
          />
          <QueueRow
            name="Archive__c object"
            object="Archive__c"
            type="Custom object"
            badgeLabel="Low"
            badgeColor={COLORS.gray400}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            borderRadius: 999,
            padding: "6px 16px",
            border: `1px solid #4ade80`,
            backgroundColor: COLORS.accent,
            color: COLORS.white,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Generate deletion plan
        </button>
      </div>
    </div>
  );
}

function QueueRow({ name, object, type, badgeLabel, badgeColor, highlighted }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1.1fr 1.1fr 0.9fr",
        padding: "7px 10px",
        fontSize: 11,
        borderBottom: `1px solid ${COLORS.gray100}`,
        backgroundColor: highlighted ? COLORS.primarySoft : "transparent",
        transition: "background-color 160ms.ease-out",
      }}
    >
      <div style={{ color: COLORS.gray800, fontWeight: 500 }}>{name}</div>
      <div style={{ color: COLORS.gray600 }}>{object}</div>
      <div style={{ color: COLORS.gray600 }}>{type}</div>
      <div>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 999,
            backgroundColor: badgeColor,
            color: COLORS.white,
            fontWeight: 600,
          }}
        >
          {badgeLabel}
        </span>
      </div>
    </div>
  );
}

// --- STEP 4 : Automated Safe Execution -------------------------------------

function Step4SmartPlan({ highlight }) {
  const isAccept = highlight === "acceptButton";

  // On simule la complétion progressive des étapes en fonction du temps global
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, []);

  const base = Math.floor((now / 800) % 5); // 0..4 pour rythmer les check
  const completedCount = base;

  const steps = [
    "Edit Apex class CleanupBatch to drop Legacy score",
    "Refactor Lead scoring flow to remove field",
    "Remove Legacy score from layouts & reports",
    "Update permission sets / profiles",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              backgroundColor: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.white,
              fontWeight: 700,
            }}
          >
            ▶
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Smart deletion plan
            </div>
            <div style={{ fontSize: 12, color: COLORS.gray600 }}>Simulated run</div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: 12,
          border: `1px solid ${COLORS.gray200}`,
          backgroundColor: COLORS.white,
          padding: 14,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.gray800,
            marginBottom: 10,
          }}
        >
          OrgLookup generated safe, detailed action plan for 4 items
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {steps.map((step, index) => {
            const completed = index < completedCount;
            const fading = completedCount >= steps.length && index === completedCount - 1;

            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: completed ? 0.55 : 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  fontSize: 12,
                  color: COLORS.gray700,
                }}
              >
                <div
                  style={{
                    marginTop: 2,
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    backgroundColor: completed
                      ? COLORS.accent
                      : "rgba(34,197,94,0.35)",
                  }}
                />
                <div
                  style={{
                    textDecoration: completed ? "line-through" : "none",
                    transition: "text-decoration 160ms ease-out",
                    opacity: fading ? 0.4 : 1,
                  }}
                >
                  {step}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <button
          style={{
            borderRadius: 999,
            padding: "6px 14px",
            border: `1px solid ${COLORS.gray300}`,
            backgroundColor: COLORS.gray100,
            color: COLORS.gray600,
            fontSize: 12,
            fontWeight: 500,
            opacity: 0.7,
            cursor: "not-allowed",
          }}
        >
          Refuse
        </button>
        <button
          style={{
            borderRadius: 999,
            padding: "6px 16px",
            border: `1px solid #4ade80`,
            backgroundColor: COLORS.accent,
            color: COLORS.white,
            fontSize: 12,
            fontWeight: 600,
            boxShadow: isAccept ? "0 0 0 4px rgba(34,197,94,0.28)" : "none",
            transition: "box-shadow 160ms ease-out",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

// --- Notes d'utilisation ----------------------------------------------------

/**
 * Utilisation :
 *
 * 1. Installer framer-motion et react-icons si ce n'est pas déjà fait :
 *    npm install framer-motion react-icons
 *
 * 2. Importer le composant dans votre section Hero :
 *    import HeroWorkflowAnimation, { HeroWorkflowAnimation as NamedHeroWorkflowAnimation } from "./HeroWorkflowAnimation";
 *
 * 3. L'utiliser dans votre JSX :
 *    <HeroWorkflowAnimation />
 *
 * Le composant boucle tout seul sur les 5 étapes, avec un curseur animé,
 * des flèches qui relient précisément les nœuds (de bord à bord des cercles)
 * et des icônes Font Awesome pour illustrer les différents types d'éléments
 * (flows, reports, apps, code, etc.).
 */
