// HeroWorkflowAnimation.tsx
// Reusable component that displays ONLY the animated workflow window
// (no left-side text column). Designed to be dropped into a landing page
// hero section.

import React, { useEffect, useState } from "react";
import {
  FiGitBranch,
  FiCode,
  FiBarChart2,
  FiLayout,
  FiDatabase,
  FiTag,
  FiCloud,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

// --- Impact map / graph helper types --------------------------------------

type ImpactNodeType =
  | "flow"
  | "apex"
  | "report"
  | "layout"
  | "field"
  | "object"
  | "app"
  | "importApp";

type ImpactNodeConfig = {
  label: string;
  type: ImpactNodeType;
};

function ImpactNode({
  node,
  highlight,
}: {
  node: ImpactNodeConfig;
  highlight?: boolean;
}) {
  let bg = "rgba(255,255,255,0.02)";
  let border = "1px solid rgba(255,255,255,0.15)";
  let iconBg = "rgba(255,255,255,0.12)";
  let iconColor = "#fff";
  let icon: React.ReactNode = null;

  switch (node.type) {
    case "flow":
      bg = "rgba(33,150,243,0.16)";
      border = "1px solid rgba(33,150,243,0.6)";
      iconBg = "rgba(33,150,243,1)";
      icon = <FiGitBranch />;
      break;
    case "apex":
      bg = "rgba(156,39,176,0.16)";
      border = "1px solid rgba(156,39,176,0.6)";
      iconBg = "rgba(156,39,176,1)";
      icon = <FiCode />;
      break;
    case "report":
      bg = "rgba(76,175,80,0.16)";
      border = "1px solid rgba(76,175,80,0.6)";
      iconBg = "rgba(76,175,80,1)";
      icon = <FiBarChart2 />;
      break;
    case "layout":
      bg = "rgba(0,188,212,0.16)";
      border = "1px solid rgba(0,188,212,0.6)";
      iconBg = "rgba(0,188,212,1)";
      icon = <FiLayout />;
      break;
    case "object":
      bg = "rgba(255,152,0,0.16)";
      border = "1px solid rgba(255,152,0,0.7)";
      iconBg = "rgba(255,152,0,1)";
      icon = <FiDatabase />;
      break;
    case "app":
      bg = "rgba(25,118,210,0.16)";
      border = "1px solid rgba(25,118,210,0.7)";
      iconBg = "rgba(25,118,210,1)";
      icon = <FaGithub />;
      break;
    case "importApp":
      bg = "rgba(121,85,72,0.16)";
      border = "1px solid rgba(121,85,72,0.7)";
      iconBg = "rgba(121,85,72,1)";
      icon = <FiCloud />;
      break;
    case "field":
    default:
      bg = "rgba(255,255,255,0.06)";
      border = "1px solid rgba(255,255,255,0.7)";
      iconBg = "rgba(255,255,255,1)";
      iconColor = "#111";
      icon = <FiTag />;
      break;
  }

  const size = node.type === "field" || node.type === "object" ? 56 : 44; // slightly larger for core nodes

  const effectiveBorder = highlight
    ? "1px solid rgba(129,212,250,0.95)"
    : border;
  const effectiveBg = highlight ? "rgba(2,136,209,0.3)" : bg;
  const shadow = highlight
    ? "0 0 0 1px rgba(129,212,250,0.6), 0 0 14px rgba(129,212,250,0.9)"
    : "none";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "20px",
          border: effectiveBorder,
          background: effectiveBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: shadow,
        }}
      >
        <span
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "999px",
            background: iconBg,
            color: iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
          }}
        >
          {icon}
        </span>
      </div>
      <span
        style={{
          fontSize: "10px",
          opacity: 0.85,
          textAlign: "center",
          maxWidth: "80px",
        }}
      >
        {node.label}
      </span>
    </div>
  );
}

// --- Right-panel UI mockups -----------------------------------------------

type StepScreenProps = {
  index: number;
  highlightLegacyRow?: boolean;
  highlightLegacyNode?: boolean;
  repoShowAppPanel?: boolean;
  queueHasLegacy?: boolean;
  queueHighlightNewItem?: boolean;
  planCompletedCount?: number;
};

function StepScreen({
  index,
  highlightLegacyRow,
  highlightLegacyNode,
  repoShowAppPanel,
  queueHasLegacy,
  queueHighlightNewItem,
  planCompletedCount,
}: StepScreenProps) {
  switch (index) {
    case 0:
      // Step 1 — metadata scoring table (all labels shortened)
      return (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto auto 1fr",
            rowGap: "12px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "4px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  opacity: 0.9,
                }}
              >
                Md
              </div>
              <div style={{ fontSize: "13px", opacity: 0.85 }}>
                Org Metadata Scanner
              </div>
            </div>

            <div
              style={{
                fontSize: "11px",
                padding: "0 8px",
                borderRadius: "999px",
                background: "rgba(76, 175, 80, 0.2)",
                border: "1px solid rgba(76, 175, 80, 0.6)",
                color: "#9be7a5",
                height: "24px",
                minWidth: "110px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              128 items
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(80px,auto))",
              gap: "6px",
            }}
          >
            {["High risk", "Low usage", "Old fields"].map((chip) => (
              <div
                key={chip}
                style={{
                  fontSize: "11px",
                  padding: "0 8px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  height: "24px",
                  minWidth: "110px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    background:
                      chip === "High risk"
                        ? "rgba(244,67,54,0.9)"
                        : chip === "Low usage"
                        ? "rgba(255,193,7,0.9)"
                        : "rgba(158,158,158,0.9)",
                  }}
                />
                <span>{chip}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              display: "grid",
              gridTemplateRows: "auto 1fr",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
                padding: "6px 10px",
                fontSize: "11px",
                background: "rgba(255,255,255,0.02)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span>Field</span>
              <span>Type</span>
              <span>Usage</span>
              <span>Risk</span>
            </div>
            <div
              style={{
                display: "grid",
                gridAutoRows: "minmax(0,auto)",
              }}
            >
              {[
                { field: "Legacy score", type: "Number", usage: "0.4%", risk: "High" },
                { field: "Onboarding flag", type: "Checkbox", usage: "1.2%", risk: "Med" },
                { field: "Temp notes", type: "Text", usage: "0%", risk: "High" },
              ].map((row, i) => {
                const baseBg =
                  i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent";
                const isHighlighted = !!highlightLegacyRow && i === 0;
                return (
                  <div
                    key={row.field}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
                      padding: "6px 10px",
                      fontSize: "11px",
                      background: isHighlighted
                        ? "rgba(2,136,209,0.18)"
                        : baseBg,
                      borderRadius: isHighlighted ? "6px" : undefined,
                      border: isHighlighted
                        ? "1px solid rgba(129,212,250,0.9)"
                        : "1px solid rgba(255,255,255,0.02)",
                      boxShadow: isHighlighted
                        ? "0 0 0 1px rgba(129,212,250,0.5), 0 0 12px rgba(129,212,250,0.7)"
                        : "none",
                    }}
                  >
                    <span>{row.field}</span>
                    <span
                      style={{
                        opacity: 0.8,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "2px",
                          border: "1px solid rgba(255,255,255,0.5)",
                          opacity: 0.8,
                        }}
                      />
                      {row.type}
                    </span>
                    <span style={{ opacity: 0.8 }}>{row.usage}</span>
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "0 8px",
                        borderRadius: "999px",
                        justifySelf: "flex-start",
                        background:
                          row.risk === "High"
                            ? "rgba(244, 67, 54, 0.2)"
                            : "rgba(255, 152, 0, 0.15)",
                        border:
                          row.risk === "High"
                            ? "1px solid rgba(244,67,54,0.7)"
                            : "1px solid rgba(255,152,0,0.7)",
                        height: "24px",
                        minWidth: "110px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {row.risk}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case 1:
      // Step 2 — impact map as a graph of rounded-square nodes with icon library + arrows
      return (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            rowGap: "10px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              opacity: 0.9,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.5)",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(33,150,243,0.9)",
                    top: "2px",
                    left: "2px",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(156,39,176,0.9)",
                    bottom: "2px",
                    left: "5px",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(76,175,80,0.9)",
                    bottom: "2px",
                    right: "2px",
                  }}
                />
              </span>
              <span>Impact map</span>
            </span>
            <span style={{ opacity: 0.7 }}>Opportunity</span>
          </div>

          <div
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "10px",
              display: "grid",
              gridTemplateRows: "auto 1fr",
              rowGap: "4px",
              overflow: "hidden", // ensure the graph never overflows the window
            }}
          >
            <div style={{ fontSize: "11px", opacity: 0.75 }}>
              Impact around "Legacy score"
            </div>
            <div
              style={{
                position: "relative",
                height: "100%",
              }}
            >
              {/* Arrows between nodes (coords roughly aligned to node grid) */}
              <svg
                viewBox="0 0 100 100"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.6,
                }}
              >
                <defs>
                  <marker
                    id="arrow-head"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path
                      d="M0,0 L6,3 L0,6 z"
                      fill="rgba(255,255,255,0.7)"
                    />
                  </marker>
                </defs>
                {/* Center field to Lead flow (second row, left) */}
                <line
                  x1="50"
                  y1="20"
                  x2="20"
                  y2="50"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow-head)"
                />
                {/* Center field to Renewal flow (second row, middle) */}
                <line
                  x1="50"
                  y1="20"
                  x2="50"
                  y2="50"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow-head)"
                />
                {/* Center field to CleanupBatch (second row, right) */}
                <line
                  x1="50"
                  y1="20"
                  x2="80"
                  y2="50"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow-head)"
                />
                {/* Center field to Pipeline report (third row, left) */}
                <line
                  x1="50"
                  y1="20"
                  x2="20"
                  y2="80"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow-head)"
                />
              </svg>

              <div
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  columnGap: "4px",
                  rowGap: "4px",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                {/* First row: center field */}
                <div />
                <ImpactNode
                  node={{ label: "Legacy score", type: "field" }}
                  highlight={!!highlightLegacyNode}
                />
                <div />

                {/* Surrounding nodes (flows, apex, report, layout) */}
                {[
                  { label: "Lead flow", type: "flow" as ImpactNodeType },
                  { label: "Renewal flow", type: "flow" as ImpactNodeType },
                  { label: "CleanupBatch", type: "apex" as ImpactNodeType },
                  { label: "Pipeline report", type: "report" as ImpactNodeType },
                  { label: "Sales console", type: "layout" as ImpactNodeType },
                ].map((n) => (
                  <ImpactNode key={n.label} node={n} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ fontSize: "11px", opacity: 0.75 }}>
            Nodes and arrows show dependencies.
          </div>
        </div>
      );

    case 2:
      // Step 3 — repo scan as external dependency graph
      return (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            rowGap: "10px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#181717",
                  border: "1px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                }}
              >
                <FaGithub />
              </span>
              <span>Repo scan</span>
            </span>
            <span style={{ opacity: 0.7 }}>GitHub</span>
          </div>

          <div
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "10px",
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              rowGap: "4px",
              overflow: "hidden",
            }}
          >
            <div style={{ fontSize: "11px", opacity: 0.75 }}>
              External dependencies on Lead
            </div>
            <div
              style={{
                position: "relative",
                height: "100%",
              }}
            >
              {/* Arrows: Web form → Lead, Lead → Marketing app, Import app → Subscription obj, Sync job → Lead */}
              <svg
                viewBox="0 0 100 100"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.6,
                }}
              >
                <defs>
                  <marker
                    id="arrow-head-2"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path
                      d="M0,0 L6,3 L0,6 z"
                      fill="rgba(255,255,255,0.7)"
                    />
                  </marker>
                </defs>
                {/* Web form app → Lead object */}
                <line
                  x1="20"
                  y1="30"
                  x2="45"
                  y2="30"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow-head-2)"
                />
                {/* Lead object → Marketing app */}
                <line
                  x1="55"
                  y1="30"
                  x2="80"
                  y2="30"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow-head-2)"
                />
                {/* Import app → Subscription object */}
                <line
                  x1="20"
                  y1="70"
                  x2="45"
                  y2="70"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow-head-2)"
                />
                {/* Sync job → Lead object */}
                <line
                  x1="80"
                  y1="70"
                  x2="55"
                  y2="35"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow-head-2)"
                />
              </svg>

              <div
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  columnGap: "4px",
                  rowGap: "4px",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                {/* Row 1 */}
                <ImpactNode node={{ label: "Web form app", type: "app" }} />
                <ImpactNode node={{ label: "Lead (custom obj)", type: "object" }} />
                <ImpactNode node={{ label: "Marketing app", type: "app" }} />
                {/* Row 2 */}
                <ImpactNode node={{ label: "Import app", type: "importApp" }} />
                <ImpactNode node={{ label: "Subscription obj", type: "object" }} />
                <ImpactNode node={{ label: "Sync job", type: "apex" }} />
              </div>

              {repoShowAppPanel && (
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    width: "170px",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(10,15,25,0.96)",
                    fontSize: "10px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      marginBottom: "4px",
                      opacity: 0.9,
                    }}
                  >
                    Web form app
                  </div>
                  <div>Field refs: 3</div>
                  <div>Populates: Lead, Subscription</div>
                  <div>Fields: Legacy score, Source, Opt-in</div>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "2px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(244, 81, 30, 0.9)",
                  border: "1px solid rgba(255, 138, 101, 1)",
                  color: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                  cursor: "default",
                }}
              >
                Add to deletion queue
              </div>
            </div>
          </div>

          <div style={{ fontSize: "11px", opacity: 0.75 }}>
            Shows how external apps and jobs touch your Lead data.
          </div>
        </div>
      );

    case 3:
      // Step 4 — deletion queue as a list of metadata to remove
      return (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            rowGap: "10px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              opacity: 0.9,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "2px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                }}
              >
                ✔
              </span>
              <span>Deletion queue</span>
            </span>
            <span style={{ opacity: 0.7 }}>Legacy score</span>
          </div>

          <div
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "10px",
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              rowGap: "6px",
            }}
          >
            <div style={{ fontSize: "11px", opacity: 0.75 }}>
              Items queued for deletion
            </div>
            <div
              style={{
                display: "grid",
                gridAutoRows: "minmax(0,auto)",
                rowGap: "4px",
              }}
            >
              {(() => {
                const baseItems = [
                  {
                    name: "Old status field",
                    object: "Account",
                    type: "Field",
                    risk: "Medium",
                    isNew: false,
                  },
                  {
                    name: "Unused workflow rule",
                    object: "Opportunity",
                    type: "Workflow",
                    risk: "Medium",
                    isNew: false,
                  },
                  {
                    name: "Archive__c object",
                    object: "Archive__c",
                    type: "Custom object",
                    risk: "Low",
                    isNew: false,
                  },
                ];
                const items = queueHasLegacy
                  ? [
                      {
                        name: "Legacy score field",
                        object: "Lead",
                        type: "Field",
                        risk: "High",
                        isNew: true,
                      },
                      ...baseItems,
                    ]
                  : baseItems;

                return items.map((item) => {
                  const isNew = queueHighlightNewItem && item.isNew;
                  const riskBg =
                    item.risk === "High"
                      ? "rgba(244,67,54,0.18)"
                      : item.risk === "Medium"
                      ? "rgba(255,152,0,0.16)"
                      : "rgba(158,158,158,0.18)";
                  const riskBorder =
                    item.risk === "High"
                      ? "rgba(244,67,54,0.9)"
                      : item.risk === "Medium"
                      ? "rgba(255,152,0,0.9)"
                      : "rgba(189,189,189,0.9)";

                  return (
                    <div
                      key={item.name}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.6fr 0.9fr 0.8fr 0.7fr",
                        fontSize: "11px",
                        padding: "6px 8px",
                        borderRadius: "8px",
                        background: isNew
                          ? "rgba(2,136,209,0.16)"
                          : "rgba(255,255,255,0.02)",
                        border: isNew
                          ? "1px solid rgba(129,212,250,0.9)"
                          : "1px solid rgba(255,255,255,0.06)",
                        boxShadow: isNew
                          ? "0 0 0 1px rgba(129,212,250,0.55), 0 0 14px rgba(129,212,250,0.85)"
                          : "none",
                      }}
                    >
                      <span>{item.name}</span>
                      <span style={{ opacity: 0.8 }}>{item.object}</span>
                      <span style={{ opacity: 0.8 }}>{item.type}</span>
                      <span
                        style={{
                          fontSize: "10px",
                          justifySelf: "flex-start",
                          padding: "0 6px",
                          borderRadius: "999px",
                          background: riskBg,
                          border: `1px solid ${riskBorder}`,
                          display: "flex",
                          alignItems: "center",
                          height: "20px",
                        }}
                      >
                        {item.risk}
                      </span>
                    </div>
                  );
                });
              })()}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: "rgba(76,175,80,0.9)",
                  border: "1px solid rgba(129,199,132,1)",
                  color: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                  cursor: "default",
                }}
              >
                Generate deletion plan
              </div>
            </div>
          </div>

          <div style={{ fontSize: "11px", opacity: 0.75 }}>
            New items added automatically from scans and impact maps. Click "Generate deletion plan" to create detailed action plan.
          </div>
        </div>
      );

    case 4:
    default:
      // Step 5 — smart deletion plan (runbook of actions)
      return (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            rowGap: "10px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "2px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                }}
              >
                ▶
              </span>
              <span>Smart deletion plan</span>
            </span>
            <span style={{ opacity: 0.7 }}>Simulated run</span>
          </div>

          <div
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "10px",
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              rowGap: "6px",
            }}
          >
            {(() => {
              const allSteps = [
                "Edit Apex class CleanupBatch to drop Legacy score",
                "Refactor Lead scoring flow to remove field",
                "Remove Legacy score from layouts & reports",
                "Update permission sets / profiles",
              ];
              const completed = planCompletedCount ?? 0;
              const visible = allSteps.slice(completed);

              return (
                <>
                  <div style={{ fontSize: "11px", opacity: 0.75 }}>
                    OrgLookup generated safe, detailed action plan for {allSteps.length} items
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridAutoRows: "minmax(0,auto)",
                      rowGap: "4px",
                    }}
                  >
                    {visible.map((text) => (
                      <div
                        key={text}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr",
                          alignItems: "center",
                          fontSize: "11px",
                          gap: "8px",
                          padding: "5px 8px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "999px",
                            background: "rgba(76,175,80,0.9)",
                          }}
                        />
                        <span>{text}</span>
                      </div>
                    ))}
                    {visible.length === 0 && (
                      <div style={{ fontSize: "11px", opacity: 0.85 }}>
                        Plan complete. Ready to deploy.
                      </div>
                    )}
                  </div>
                </>
              );
            })()}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(15,15,20,0.85)",
                  color: "#eee",
                  cursor: "default",
                }}
              >
                Refuse
              </div>
              <div
                style={{
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  border: "1px solid rgba(76,175,80,0.9)",
                  background: "rgba(76,175,80,0.9)",
                  color: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                  cursor: "default",
                }}
              >
                Accept
              </div>
            </div>
          </div>

          <div style={{ fontSize: "11px", opacity: 0.75 }}>
            OrgLookup generates safe, detailed action plan. Accept to run steps, or export to your deployment pipeline.
          </div>
        </div>
      );
  }
}

// --- Cursor animation scenes ----------------------------------------------

type Scene = {
  step: number; // 0..4
  cursorX: number; // 0..1 (relative to window width)
  cursorY: number; // 0..1 (relative to window height)
  click?: boolean;
  highlightLegacyRow?: boolean;
  highlightLegacyNode?: boolean;
  repoShowAppPanel?: boolean;
  queueHasLegacy?: boolean;
  queueHighlightNewItem?: boolean;
  planCompletedCount?: number;
  duration: number; // ms
};

const SCENES: Scene[] = [
  // Step 1 — idle
  {
    step: 0,
    cursorX: 0.9,
    cursorY: 0.18,
    duration: 700,
  },
  // Step 1 — move to first row (Legacy score)
  {
    step: 0,
    cursorX: 0.75,
    cursorY: 0.6,
    highlightLegacyRow: true,
    duration: 900,
  },
  // Step 1 — click Legacy score
  {
    step: 0,
    cursorX: 0.75,
    cursorY: 0.6,
    highlightLegacyRow: true,
    click: true,
    duration: 450,
  },
  // Step 2 — impact map, highlight Legacy score node
  {
    step: 1,
    cursorX: 0.5,
    cursorY: 0.32,
    highlightLegacyNode: true,
    duration: 1000,
  },
  // Step 2 — move to another node in the graph (Lead flow)
  {
    step: 1,
    cursorX: 0.3,
    cursorY: 0.68,
    highlightLegacyNode: true,
    duration: 900,
  },
  // Step 2 — click graph node
  {
    step: 1,
    cursorX: 0.3,
    cursorY: 0.68,
    highlightLegacyNode: true,
    click: true,
    duration: 450,
  },
  // Step 3 — move to external app (Web form app)
  {
    step: 2,
    cursorX: 0.22,
    cursorY: 0.4,
    duration: 700,
  },
  // Step 3 — click app, show info panel
  {
    step: 2,
    cursorX: 0.22,
    cursorY: 0.4,
    click: true,
    repoShowAppPanel: true,
    duration: 950,
  },
  // Step 3 — move to Salesforce metadata node (Lead custom object)
  {
    step: 2,
    cursorX: 0.5,
    cursorY: 0.4,
    repoShowAppPanel: true,
    duration: 850,
  },
  // Step 3 — click metadata node
  {
    step: 2,
    cursorX: 0.5,
    cursorY: 0.4,
    repoShowAppPanel: true,
    click: true,
    duration: 450,
  },
  // Step 3 — move to "Add to deletion queue" button
  {
    step: 2,
    cursorX: 0.85,
    cursorY: 0.9,
    repoShowAppPanel: true,
    duration: 800,
  },
  // Step 3 — click "Add to deletion queue"
  {
    step: 2,
    cursorX: 0.85,
    cursorY: 0.9,
    repoShowAppPanel: true,
    click: true,
    queueHasLegacy: true,
    duration: 500,
  },
  // Step 4 — show deletion queue with new Legacy score entry highlighted
  {
    step: 3,
    cursorX: 0.4,
    cursorY: 0.45,
    queueHasLegacy: true,
    queueHighlightNewItem: true,
    duration: 1000,
  },
  // Step 4 — move to "Generate deletion plan" button
  {
    step: 3,
    cursorX: 0.85,
    cursorY: 0.9,
    queueHasLegacy: true,
    queueHighlightNewItem: true,
    duration: 850,
  },
  // Step 4 — click "Generate deletion plan"
  {
    step: 3,
    cursorX: 0.85,
    cursorY: 0.9,
    queueHasLegacy: true,
    queueHighlightNewItem: true,
    click: true,
    duration: 500,
  },
  // Step 5 — show full smart deletion plan
  {
    step: 4,
    cursorX: 0.4,
    cursorY: 0.45,
    planCompletedCount: 0,
    duration: 1000,
  },
  // Step 5 — move to "Accept" button
  {
    step: 4,
    cursorX: 0.82,
    cursorY: 0.9,
    planCompletedCount: 0,
    duration: 800,
  },
  // Step 5 — click "Accept"
  {
    step: 4,
    cursorX: 0.82,
    cursorY: 0.9,
    planCompletedCount: 0,
    click: true,
    duration: 450,
  },
  // Step 5 — first action completes
  {
    step: 4,
    cursorX: 0.82,
    cursorY: 0.9,
    planCompletedCount: 1,
    duration: 650,
  },
  // Step 5 — second action completes
  {
    step: 4,
    cursorX: 0.82,
    cursorY: 0.9,
    planCompletedCount: 2,
    duration: 650,
  },
  // Step 5 — third action completes (only one left)
  {
    step: 4,
    cursorX: 0.82,
    cursorY: 0.9,
    planCompletedCount: 3,
    duration: 650,
  },
];

// --- HeroWorkflowAnimation (window-only) ----------------------------------

export default function HeroWorkflowAnimation() {
  const [sceneIndex, setSceneIndex] = useState<number>(0);

  useEffect(() => {
    const current = SCENES[sceneIndex];
    const timeout = window.setTimeout(() => {
      setSceneIndex((prev) => (prev + 1) % SCENES.length);
    }, current.duration);

    return () => window.clearTimeout(timeout);
  }, [sceneIndex]);

  const scene = SCENES[sceneIndex];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        height: "400px",
        border: "1px solid #333",
        borderRadius: "16px",
        background: "rgba(15,15,20,0.9)",
        color: "#fff",
        padding: "16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <StepScreen
        index={scene.step}
        highlightLegacyRow={scene.highlightLegacyRow}
        highlightLegacyNode={scene.highlightLegacyNode}
        repoShowAppPanel={scene.repoShowAppPanel}
        queueHasLegacy={scene.queueHasLegacy}
        queueHighlightNewItem={scene.queueHighlightNewItem}
        planCompletedCount={scene.planCompletedCount}
      />

      {/* Animated cursor overlay */}
      <div
        style={{
          position: "absolute",
          left: `${scene.cursorX * 100}%`,
          top: `${scene.cursorY * 100}%`,
          transform: scene.click
            ? "translate(-20%, -10%) scale(0.9)"
            : "translate(-20%, -10%) scale(1)",
          transition:
            "left 0.6s ease, top 0.6s ease, transform 0.15s ease",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "8px solid透明",
            borderRight: "2px solid transparent",
            borderBottom: "14px solid #ffffff",
            filter: "drop-shadow(0 0 4px rgba(0,0,0,0.6))",
          }}
        />
      </div>
    </div>
  );
}
