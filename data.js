// Key Termly Ceremonies - Meeting Data
const CEREMONIES_DATA = {
  // ============================================================
  // TERM CONFIGURATION — edit this each term
  // ------------------------------------------------------------
  // 1. hasExtraSprint6: set to true ONLY for the long term (once
  //    a year) that has an extra 2-week Sprint 6 before I&A.
  //    Leave as false for normal terms (5 sprints + I&A).
  // 2. sprintStartDates: the Monday each sprint begins, written as
  //    "YYYY-MM-DD" (year-month-day). Used for Outlook reminders.
  //    Update these 7 dates at the start of each term.
  // ============================================================
  termConfig: {
    hasExtraSprint6: false,
    sprintStartDates: {
      "sprint-1":    "2026-10-19",
      "sprint-2":    "2026-11-02",
      "sprint-3":    "2026-11-16",
      "sprint-4":    "2026-11-30",
      "sprint-5":    "2026-12-14",
      "sprint-6":    "2026-12-28",
      "sprint-6-ia": "2027-01-04"
    }
  },

  personas: [
    { id: "pdm", name: "Portfolio Delivery Manager", shortName: "PDM", active: true },
    { id: "adm", name: "Agile Delivery Manager", shortName: "ADM", active: true },
    { id: "ppo", name: "Product & Platform Owner", shortName: "PPO", active: true },
    { id: "pl", name: "Portfolio Lead", shortName: "PL", active: true },
    { id: "po", name: "Portfolio Owner", shortName: "PO", active: true }
  ],

  // Note: "sprint-6" is the OPTIONAL extra sprint (only shown when
  // termConfig.hasExtraSprint6 is true). "sprint-6-ia" is always the
  // final Innovation & Adapt sprint.
  sprints: [
    { id: "sprint-1", name: "Sprint 1", shortName: "Sprint 1", position: 1, optional: false },
    { id: "sprint-2", name: "Sprint 2", shortName: "Sprint 2", position: 2, optional: false },
    { id: "sprint-3", name: "Sprint 3", shortName: "Sprint 3", position: 3, optional: false },
    { id: "sprint-4", name: "Sprint 4", shortName: "Sprint 4", position: 4, optional: false },
    { id: "sprint-5", name: "Sprint 5", shortName: "Sprint 5", position: 5, optional: false },
    { id: "sprint-6", name: "Sprint 6", shortName: "Sprint 6", position: 6, optional: true },
    { id: "sprint-6-ia", name: "Sprint I&P", shortName: "I&P", position: 7, optional: false }
  ],

  categories: [
    { id: "ti-planning", name: "TI Planning", color: "#500778", icon: "📋" },
    { id: "delivery", name: "Delivery", color: "#0097A9", icon: "🚀" },
    { id: "finances", name: "Finances", color: "#E87722", icon: "💰" },
    { id: "community", name: "Community", color: "#00847C", icon: "🤝" },
    { id: "lbcs-ddtc", name: "LBCs & DDTC", color: "#8C1515", icon: "📊" }
  ],

  // Artefacts that meetings link to
  artefacts: [
    {
      id: "cio-lt-playback-deck",
      name: "CIO LT Playback Deck",
      description: "The PDM gathers all committed outcomes, highlights the key risks and resource challenges in the CIO LT Playback Deck.",
      outcome: "The CIO LT Playback Deck is updated.",
      preparedBy: "Change Portfolio Manager",
      screenshots: ["Images/cio-lt-playback-deck.png.png"]
    },
    {
      id: "ti-planning-risks-dependencies",
      name: "TI Planning Risks & Dependencies",
      description: "A cross-portfolio view of key risks, dependencies, and planned initiatives identified during TI Planning. Enables portfolios to share a high-level view of work and ensures interdependencies are incorporated into planning activities.",
      outcome: "All risks and cross-portfolio dependencies are outlined.",
      preparedBy: "Portfolio Delivery Manager",
      screenshots: ["Images/ti-planning-risks-dependencies.png.png"]
    },
    {
      id: "ti-planning-management-review-deck",
      name: "TI Planning Management Review Deck",
      description: "Slides capturing confirmed planned outcomes, remaining delivery risks, dependencies and delivery confidence ahead of the TI start.",
      outcome: "Confirmed alignment across portfolios, agreed key priorities and dependency resolutions, and actions to address outstanding risks.",
      preparedBy: "PDMs",
      screenshots: ["Images/ti-planning-management-review-deck.png.png"]
    },
    {
      id: "portfolio-vision-slide-deck",
      name: "Portfolio Vision Slide Deck",
      description: "A set of prepared slides capturing strategic inputs, priorities, and insights that the portfolio updates ahead of the session to support defining the future vision.",
      outcome: "Portfolio Vision slides are updated with aligned strategic direction, key priorities, and a clearly articulated future state for the portfolio.",
      preparedBy: "Change Portfolio Chair, Product Management, Platform and Product team representatives",
      screenshots: ["Images/portfolio-vision-slide-deck-1.png.png", "Images/portfolio-vision-slide-deck-2.png.png"]
    },
    {
      id: "extended-delivery-report",
      name: "Extended Delivery Report",
      description: "Updated Extended Delivery slides capturing progress against termly outcomes, key risks, dependencies, and required interventions.",
      outcome: "Clear, shared visibility of progress against termly outcomes, with risks, dependencies, and interventions identified and aligned.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: ["Images/extended-delivery-report-1.png.png", "Images/extended-delivery-report-2.png.png"]
    },
    {
      id: "itppd-staff-log",
      name: "ITPPD Staff Log",
      description: "A record of resource assignments, vacancies, subcontractor contract dates, and budgets used to review workforce capacity.",
      outcome: "Clear view of resource allocation and capacity across portfolios.",
      preparedBy: "Staff Operations Manager",
      screenshots: []
    },
    {
      id: "finance-plan",
      name: "Finance Plan",
      description: "A monthly update of portfolio financial plans with actual spend provided by the Lean Portfolio Group, reviewed by the PDM to validate forecasts and ensure alignment within allocated budgets.",
      outcome: "Accurate and aligned financial plans, with forecasts validated and managed within budget.",
      preparedBy: "Change Portfolio Manager, Lean Portfolio Group Rep",
      screenshots: []
    },
    {
      id: "portfolio-status-update",
      name: "Portfolio Status Update",
      description: "Updated portfolio performance slides with delivery status, financials, risks, and progress information.",
      outcome: "Clear visibility of portfolio health and progress for governance review.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: ["Images/portfolio-status-update.png.png"]
    },
    {
      id: "portfolio-delivery-updates",
      name: "Portfolio Delivery Updates",
      description: "Slides capturing delivery progress, achievements, and any blockers or changes since the last reporting period.",
      outcome: "Stakeholders have a clear picture of delivery performance across portfolios.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: ["Images/portfolio-delivery-updates.png.png"]
    },
    {
      id: "portfolio-roadmap",
      name: "Portfolio Roadmap",
      description: "A visual representation of planned delivery across Now/Next/Future horizons, categorised by Strategic Change, Enhance, and Maintain.",
      outcome: "Clear visibility of planned work and strategic direction for the portfolio.",
      preparedBy: "Product Owners, Portfolio Delivery Manager",
      screenshots: ["Images/portfolio-roadmap.png.png"]
    },
    {
      id: "lean-business-case",
      name: "Lean Business Case",
      description: "A structured document for each investment request, capturing objectives, benefits, costs, risks, and delivery approach for DDTC approval.",
      outcome: "Approved investment decisions with clear alignment on priorities and risks.",
      preparedBy: "Product and Platform Owners",
      screenshots: ["Images/lean-business-case.png.png"]
    },
    {
      id: "committed-outcomes",
      name: "Committed Outcomes",
      description: "The agreed set of outcomes that each portfolio and product team has committed to deliver during the term.",
      outcome: "Clear visibility of what each team has committed to delivering.",
      preparedBy: "Product Teams, ADMs",
      screenshots: ["Images/committed-outcomes.png.png"]
    },
    {
      id: "risk-issues-dependencies",
      name: "Risks, Issues & Dependencies",
      description: "A log of identified risks, active issues, and cross-team or cross-portfolio dependencies that require coordination.",
      outcome: "All risks and dependencies are tracked, visible, and actively managed.",
      preparedBy: "PDM, ADMs",
      screenshots: ["Images/risk-issues-dependencies.png.png"]
    },
    {
      id: "jira-backlog",
      name: "JIRA Backlog",
      description: "The prioritised product backlog in JIRA containing user stories, bugs, and tasks ready for sprint planning.",
      outcome: "A refined and prioritised backlog ready for team commitment.",
      preparedBy: "Product Owner",
      screenshots: ["Images/jira-backlog.png.png"]
    },
    {
      id: "sprint-updates",
      name: "Sprint Updates",
      description: "Updates on sprint progress, completed work, and any changes to scope or commitments during the sprint.",
      outcome: "Transparency on sprint progress and any impediments.",
      preparedBy: "ADM, Product Team",
      screenshots: ["Images/sprint-updates.png.png"]
    },
    {
      id: "inspect-adapt-slides",
      name: "Inspect & Adapt Slides",
      description: "A consolidated summary of progress, metrics, insights, and key improvement areas captured from the term review.",
      outcome: "Portfolio Inspect & Adapt slides are updated with portfolio progress against term outcomes, including metrics and key insights.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: []
    },
    {
      id: "vision-of-visions-slides",
      name: "Vision of Visions Slides",
      description: "Updated Vision of Vision slides and a dependency tracking spreadsheet capturing cross-portfolio dependencies, priorities, and alignment inputs.",
      outcome: "Clear cross-portfolio visibility, aligned priorities, and readiness for coordinated TI planning.",
      preparedBy: "Change Portfolio Delivery Manager",
      screenshots: []
    }
  ],

  // Meetings only (each has a "personas" array: which roles see it)
  meetings: [
    {
      id: "cio-lt-commitments",
      name: "CIO LT – TI Commitments",
      category: "delivery",
      personas: ["pdm", "po"],
      activityGroup: "CIO",
      sprints: ["sprint-1"],
      presenter: "PDMs",
      why: "Playback key planned Outcomes, key risks, and highlight practice and resource challenges.",
      outcome: "Ensures CIO LT is aligned on planned term outcomes, key risks, dependencies, resource constraints and financial implications, and provides a forum for leaders to resolve issues, remove barriers and support successful delivery.",
      content: ["cio-lt-playback-deck"],
      whoAttends: "CIO LT, PDMs and LPG"
    },
    {
      id: "ti-planning-meeting",
      name: "TI Planning",
      category: "ti-planning",
      personas: ["pdm", "adm", "ppo", "pl"],
      activityGroup: "TIP",
      sprints: ["sprint-6-ia"],
      presenter: "Various",
      why: "A quarterly, collaborative event that serves as the heartbeat of agile working at UCL, aligning all the teams to a shared mission and vision. This event includes stakeholders from outside ISD, ISD Leadership and all Product/Platform Team members and occurs within the Innovation and Planning (IP) Iteration.",
      outcome: "Aligned iteration plans and objectives across all teams, with clear priorities, dependencies identified, and commitment to delivering the Termly Increment goals.",
      content: [],
      whoAttends: "Product and Platform Teams, Product and Platform Owners, Change Portfolio Leadership Teams, Lean Portfolio Group, Centre of Excellence, ISD Leadership, Relevant key stakeholders external to ISD",
      keyResponsibilities: "Coordinates and facilitates the Change Portfolio TI event\nEnsures the Change Portfolio Programme board is updated\nEnsures plans are realistic / dependencies are tracked and resolved\nRisks are ROAMed"
    },
    {
      id: "day-1-management-review",
      name: "Day 1 Management Review",
      category: "ti-planning",
      personas: ["pdm", "pl"],
      activityGroup: "TIP",
      sprints: ["sprint-6-ia"],
      presenter: "PDMs",
      why: "To review alignment across all portfolios, assess open and emerging risks & dependencies.",
      outcome: "Outstanding risks and dependencies are understood, decisions are made where required, and actions are agreed to minimise delivery impacts.",
      content: ["ti-planning-risks-dependencies"],
      whoAttends: "CIO, Director of Delivery, Director of Strategic Change, Portfolio Leadership Groups (PDMs, Portfolio Owners, Portfolio Leads, Portfolio BAs, Portfolio Architects) and Capability Leads"
    },
    {
      id: "day-2-management-review",
      name: "Day 2 Management Review",
      category: "ti-planning",
      personas: ["pdm", "pl"],
      activityGroup: "TIP",
      sprints: ["sprint-6-ia"],
      presenter: "PDMs",
      why: "Play back confirmed planned Outcomes for the term including any remaining delivery risks, dependencies and delivery confidence ahead of the start of the TI.",
      outcome: "Confirmed alignment across the portfolios, communicate agreed key priorities and dependency resolutions, and identified actions required to address outstanding risks.",
      content: ["ti-planning-risks-dependencies"],
      whoAttends: "CIO, Director of Delivery, Director of Strategic Change, Portfolio Leadership Groups (PDMs, Portfolio Owners, Portfolio Leads, Portfolio BAs, Portfolio Architects) and Capability Leads"
    },
    {
      id: "ti-playback",
      name: "TI Playback",
      category: "ti-planning",
      personas: ["pdm", "adm", "ppo", "pl"],
      activityGroup: "TIP",
      sprints: ["sprint-6-ia"],
      presenter: "Various",
      why: "To demonstrate what has been delivered during the Planning Increment and review any outstanding challenge.",
      outcome: "Stakeholders have confidence in delivery outcomes and understand any remaining risks, carry-over work and implications for the next Termly Increment.",
      content: ["portfolio-vision-slide-deck"],
      whoAttends: "Portfolio Owner, Portfolio Lead, PDM, Product & Platform Owners, Relevant Platform and Product team representatives, LPG Rep for Change Portfolio"
    },
    {
      id: "portfolio-vision",
      name: "Portfolio Vision",
      category: "ti-planning",
      personas: ["pdm", "adm", "ppo", "pl"],
      activityGroup: "PV",
      sprints: ["sprint-6-ia"],
      presenter: "Various",
      why: "A session to define a clear, shared future vision for the portfolio that aligns strategy, guides investment decisions, and motivates teams.",
      outcome: "A well-defined and aligned portfolio vision that provides strategic direction and clarity for teams and stakeholders.",
      content: ["portfolio-vision-slide-deck"],
      whoAttends: "Portfolio Owner, Portfolio Lead, PDM, Product & Platform Owners, Relevant Platform and Product team representatives, LPG Rep for Change Portfolio",
      keyResponsibilities: "Create a new vision slides\nReview the slide format with the Portfolio Leadership team\nMake sure slides are shared with their teams ahead of the session to allow enough time for teams to update\nMake sure the content is provided by their teams and it aligns with the portfolio roadmap"
    },
    {
      id: "extended-delivery-sync",
      name: "Extended Delivery Sync",
      category: "delivery",
      personas: ["pdm"],
      activityGroup: "EDS",
      sprints: ["sprint-1", "sprint-2", "sprint-3", "sprint-4", "sprint-5", "sprint-6", "sprint-6-ia"],
      presenter: "PDMs",
      why: "Sprintly playback of progress against agreed termly Outcomes to Director of Delivery.",
      outcome: "The Director of Delivery and PDMs share visibility of progress against termly outcomes, addressing risks, dependencies, and any required interventions.",
      content: ["extended-delivery-report"],
      whoAttends: "Director of Delivery, PDMs, Head of Portfolio Operations"
    },
    {
      id: "delivery-health-portfolio-review",
      name: "Delivery Health & Portfolio Review",
      category: "delivery",
      personas: ["pdm"],
      activityGroup: "DHPR",
      sprints: ["sprint-2", "sprint-4"],
      presenter: "PDMs",
      why: "Review updates and progress against committed Outcomes, highlight outstanding or emerging risks and issues and review Financial position for each Change Portfolio.",
      outcome: "Provides clear visibility and opportunity for scrutiny of delivery confidence, dependencies, risks, and financial position across portfolios, enabling escalation of issues and risks, and informed decisions and resolutions.",
      content: ["extended-delivery-report"],
      whoAttends: "Director of Delivery, PDMs, Head of Portfolio Operations"
    },
    {
      id: "resource-meeting",
      name: "Resource Meeting ITPPD (Delivery and Dev & Test)",
      category: "delivery",
      personas: ["pdm"],
      activityGroup: "RM",
      sprints: ["sprint-2", "sprint-4"],
      presenter: "Various",
      why: "A monthly session to review resource allocation, vacancies, contracts, and budgets, while identifying workforce risks and cross-portfolio development opportunities.",
      outcome: "A clear, aligned view of resource capacity and actions to optimise utilisation and support staff development.",
      content: ["itppd-staff-log"],
      whoAttends: "ITPPD Director, Staff Operations Manager, Head of LPG, Portfolio Delivery Managers, Dev & Test Representatives"
    },
    {
      id: "jamboree",
      name: "Jamboree",
      category: "community",
      personas: ["pdm", "adm"],
      activityGroup: "JAM",
      sprints: ["sprint-5"],
      presenter: "Various",
      why: "A quarterly session to share insights, strengthen connections, and improve collaboration across teams.",
      outcome: "Shared understanding, stronger cross-team collaboration, and key insights that support effective delivery.",
      content: [],
      whoAttends: "ITTPD Director, Change Portfolio Delivery Manager, Agile Delivery Manager, IT Delivery Support Officer, Lean Portfolio Group",
      keyResponsibilities: "Ensure that ADMs and Support Officers are aware of the event and attend as required"
    },
    {
      id: "showcase-demo",
      name: "ISD & ARC Showcase Demo",
      category: "delivery",
      personas: ["pdm", "adm", "ppo", "pl"],
      activityGroup: "SD",
      sprints: ["sprint-3", "sprint-4"],
      presenter: "Various",
      why: "To showcase progress and demonstrate delivered value across the digital change portfolios, enabling visibility, engagement, and shared learning.",
      outcome: "Stakeholders gain visibility of recent delivery achievements, provide feedback.",
      content: [],
      whoAttends: "ISD, and various institutional stakeholders",
      keyResponsibilities: "Identify and coordinate representation from their respective Change Portfolios for the Showcase Demo"
    },
    {
      id: "retro",
      name: "Retro",
      category: "delivery",
      personas: ["pdm", "adm", "ppo"],
      activityGroup: "",
      sprints: ["sprint-1", "sprint-2", "sprint-3", "sprint-4", "sprint-5", "sprint-6", "sprint-6-ia"],
      presenter: "ADM",
      why: "To reflect on the completed sprint, identify improvements, and enhance team effectiveness and delivery outcomes.",
      outcome: "Continuous improvement actions are identified and owned, driving increased delivery maturity and team performance.",
      content: [],
      whoAttends: "Product Owner, Product Team, ADM"
    },
    {
      id: "team-stand-up",
      name: "Team Stand Up",
      category: "delivery",
      personas: ["adm", "ppo"],
      activityGroup: "",
      sprints: ["sprint-1", "sprint-2", "sprint-3", "sprint-4", "sprint-5", "sprint-6", "sprint-6-ia"],
      presenter: "Various",
      why: "To inspect the Sprint plan, discuss any impediments/blockers, adapt the sprint plan, improve collaboration.",
      outcome: "The team stays aligned on progress, blockers are surfaced early, and the sprint plan is adapted to stay on track.",
      content: [],
      whoAttends: "Product Owner, Agile Delivery Manager, Developers"
    },
    {
      id: "monthly-forecast-review",
      name: "Monthly Product Team Forecast Review",
      category: "finances",
      personas: ["adm"],
      activityGroup: "MFKT",
      sprints: ["sprint-1", "sprint-3", "sprint-5"],
      presenter: "ADM",
      why: "A monthly meeting to review product team financial performance, including spend, forecasts, delivery progress, and financial risks against approved budgets.",
      outcome: "Clear alignment on portfolio financial position, with risks identified and actions agreed to maintain budget and delivery performance.",
      content: ["finance-plan"],
      whoAttends: "Agile Delivery Manager, Change Portfolio Manager, Change Portfolio Lead",
      keyResponsibilities: "Reviewing monthly actual spend against forecast and budget with the Portfolio Leadership Team\nIdentifying variances, risks, and potential financial impacts\nDiscussing delivery delays or scope changes that may affect financial plans\nConfirming that future costs and resource requirements are reflected in forecasts\nAgreeing on any corrective actions or escalation items required"
    },
    {
      id: "ddtc-meeting",
      name: "Digital Delivery and Transformation Committee (DDTC)",
      category: "lbcs-ddtc",
      personas: ["pdm", "po", "ppo", "pl"],
      activityGroup: "DDTC",
      sprints: ["sprint-6-ia"],
      presenter: "Various",
      why: "To maintain a single portfolio of investment in digital delivery and transformation and ensure continued alignment with the University's overarching strategy and digital strategy.",
      outcome: "Approved investment decisions and Lean Business Cases sign-off, with clear alignment on priorities, risks, and progress against portfolio outcomes.",
      content: ["portfolio-status-update", "portfolio-delivery-updates", "portfolio-roadmap", "lean-business-case"],
      whoAttends: "CIO, Director of Delivery, Portfolio Owners"
    },
    {
      id: "scrum-of-scrums",
      name: "Scrum of Scrums",
      category: "delivery",
      personas: ["pdm", "adm"],
      activityGroup: "",
      sprints: ["sprint-1", "sprint-2", "sprint-3", "sprint-4", "sprint-5", "sprint-6", "sprint-6-ia"],
      presenter: "PDMs",
      why: "To coordinate dependencies, manage cross-team risks and impediments, and ensure alignment across all Product Teams within the portfolio.",
      outcome: "Cross-team dependencies, risks and blockers are actively managed, enabling coordinated delivery of portfolio outcomes.",
      content: ["committed-outcomes", "risk-issues-dependencies"],
      whoAttends: "PDM and ADMs"
    },
    {
      id: "sprint-planning",
      name: "Sprint Planning",
      category: "delivery",
      personas: ["pdm", "adm", "ppo"],
      activityGroup: "",
      sprints: ["sprint-1", "sprint-2", "sprint-3", "sprint-4", "sprint-5", "sprint-6", "sprint-6-ia"],
      presenter: "Product Owner (priorities) and ADM (facilitation)",
      why: "To agree the work that will be delivered in the sprint and establish a realistic plan based on priorities, dependencies and team capacity.",
      outcome: "Sprint objectives, scope and delivery commitments are agreed and aligned to product and portfolio priorities.",
      content: ["jira-backlog", "sprint-updates"],
      whoAttends: "Product Owner, Product Team, ADM"
    }
  ],

  // Prep reminders - shown as banners in the prep sprint before a meeting.
  // Tailored per persona: each entry has its own "personas", "message"
  // and "checklist". Multi-sprint reminders are split into one entry
  // per prep sprint.
  prepReminders: [
    // ---- CIO LT – TI Commitments ----
    {
      id: "prep-cio-lt-pdm",
      meetingId: "cio-lt-commitments",
      meetingName: "CIO LT – TI Commitments",
      personas: ["pdm"],
      prepSprint: "sprint-6-ia",
      meetingSprint: "sprint-1",
      message: "Start preparing Delivery Health slides — update RAG status, risks, issues, dependencies and financial position.",
      checklist: ["RAG Status updated", "Delivery Confidence section updated", "Financial position provided"]
    },
    {
      id: "prep-cio-lt-po",
      meetingId: "cio-lt-commitments",
      meetingName: "CIO LT – TI Commitments",
      personas: ["po"],
      prepSprint: "sprint-6-ia",
      meetingSprint: "sprint-1",
      message: "Ensure the Delivery Health slides are accurate and up to date ahead of the meeting.",
      checklist: ["RAG Status updated", "Delivery Confidence section updated", "Financial position provided"]
    },

    // ---- TI Playback ----
    {
      id: "prep-ti-playback-pdm",
      meetingId: "ti-playback",
      meetingName: "TI Playback",
      personas: ["pdm"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-6-ia",
      message: "Ensure the new I&P slide decks are ready for the teams to populate ahead of the meeting.",
      checklist: ["I&P slides deck populated"]
    },
    {
      id: "prep-ti-playback-adm",
      meetingId: "ti-playback",
      meetingName: "TI Playback",
      personas: ["adm"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-6-ia",
      message: "Start updating I&P slides.",
      checklist: ["I&P slides updated"]
    },
    {
      id: "prep-ti-playback-ppo",
      meetingId: "ti-playback",
      meetingName: "TI Playback",
      personas: ["ppo"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-6-ia",
      message: "Ensure the new I&P slide decks are updated by the ADM.",
      checklist: ["Term Outcomes status updated", "Business Value updated", "Team Velocity prepared", "Term narrative prepared, summarising how the term went"]
    },

    // ---- Portfolio Vision ----
    {
      id: "prep-portfolio-vision-pdm",
      meetingId: "portfolio-vision",
      meetingName: "Portfolio Vision",
      personas: ["pdm"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-6-ia",
      message: "Ensure the new Vision slide decks are ready for the teams to populate ahead of the meeting.",
      checklist: ["Vision slides deck populated"]
    },
    {
      id: "prep-portfolio-vision-adm",
      meetingId: "portfolio-vision",
      meetingName: "Portfolio Vision",
      personas: ["adm"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-6-ia",
      message: "Start updating Vision slides.",
      checklist: ["Vision slides updated"]
    },
    {
      id: "prep-portfolio-vision-ppo",
      meetingId: "portfolio-vision",
      meetingName: "Portfolio Vision",
      personas: ["ppo"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-6-ia",
      message: "Ensure the new Vision slide decks are updated by the ADM.",
      checklist: ["Team Mission updated if needed", "Term Outcomes updated", "Dependencies reviewed and updated", "Risks identified and captured"]
    },

    // ---- DDTC Meeting ----
    {
      id: "prep-ddtc-ppo",
      meetingId: "ddtc-meeting",
      meetingName: "Digital Delivery and Transformation Committee (DDTC)",
      personas: ["ppo"],
      prepSprint: "sprint-3",
      meetingSprint: "sprint-6-ia",
      message: "Begin drafting LBC above £500k.",
      checklist: ["LBC template confirmed with LPG representative", "Lean Business Case draft prepared", "Relevant capabilities engaged for input", "Implementation costs captured"]
    },
    {
      id: "prep-ddtc-pl",
      meetingId: "ddtc-meeting",
      meetingName: "Digital Delivery and Transformation Committee (DDTC)",
      personas: ["pl"],
      prepSprint: "sprint-3",
      meetingSprint: "sprint-6-ia",
      message: "Ensure Product and Platform Owner start drafting an LBC.",
      checklist: []
    },
    {
      id: "prep-ddtc-pdm",
      meetingId: "ddtc-meeting",
      meetingName: "Digital Delivery and Transformation Committee (DDTC)",
      personas: ["pdm"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-6-ia",
      message: "Ensure DDTC Performance slides are updated.",
      checklist: ["RAG Status updated", "Delivery Confidence section updated", "Financial position provided"]
    },
    {
      id: "prep-ddtc-po",
      meetingId: "ddtc-meeting",
      meetingName: "Digital Delivery and Transformation Committee (DDTC)",
      personas: ["po"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-6-ia",
      message: "Ensure DDTC Performance slides are updated by the PDM ahead of meeting.",
      checklist: ["RAG Status updated", "Delivery Confidence section updated", "Financial position provided"]
    },

    // ---- TI Planning (PDM: Sprint 5) ----
    {
      id: "prep-ti-planning-pdm",
      meetingId: "ti-planning-meeting",
      meetingName: "TI Planning",
      personas: ["pdm"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-6-ia",
      message: "Ensure agenda, floor plan and keynote are shared with teams ahead of TI Planning.",
      checklist: ["TI planning agenda updated", "Floor Plan and keynote shared"]
    },

    // ---- ISD & ARC Showcase Demo (PDM & ADM: Sprint 2 & 3) ----
    {
      id: "prep-showcase-pdm-s2",
      meetingId: "showcase-demo",
      meetingName: "ISD & ARC Showcase Demo",
      personas: ["pdm"],
      prepSprint: "sprint-2",
      meetingSprint: "sprint-3",
      message: "Confirm with the team which demo they are planning to present.",
      checklist: ["Demo content confirmed with the team"]
    },
    {
      id: "prep-showcase-pdm-s3",
      meetingId: "showcase-demo",
      meetingName: "ISD & ARC Showcase Demo",
      personas: ["pdm"],
      prepSprint: "sprint-3",
      meetingSprint: "sprint-4",
      message: "Confirm with the team which demo they are planning to present.",
      checklist: ["Demo content confirmed with the team"]
    },
    {
      id: "prep-showcase-adm-s2",
      meetingId: "showcase-demo",
      meetingName: "ISD & ARC Showcase Demo",
      personas: ["adm"],
      prepSprint: "sprint-2",
      meetingSprint: "sprint-3",
      message: "Ensure the demo presentation is prepared and ready for delivery.",
      checklist: ["Demo presentation prepared and ready", "Key highlights and outcomes identified", "Demo tested and ready for presentation"]
    },
    {
      id: "prep-showcase-adm-s3",
      meetingId: "showcase-demo",
      meetingName: "ISD & ARC Showcase Demo",
      personas: ["adm"],
      prepSprint: "sprint-3",
      meetingSprint: "sprint-4",
      message: "Ensure the demo presentation is prepared and ready for delivery.",
      checklist: ["Demo presentation prepared and ready", "Key highlights and outcomes identified", "Demo tested and ready for presentation"]
    },

    // ---- Sprint Planning (ADM: every sprint) ----
    {
      id: "prep-sprint-planning-s1",
      meetingId: "sprint-planning",
      meetingName: "Sprint Planning",
      personas: ["adm"],
      prepSprint: "sprint-1",
      meetingSprint: "sprint-1",
      message: "Ensure Sprint status and supporting narratives are provided for Term Outcomes.",
      checklist: []
    },
    {
      id: "prep-sprint-planning-s2",
      meetingId: "sprint-planning",
      meetingName: "Sprint Planning",
      personas: ["adm"],
      prepSprint: "sprint-2",
      meetingSprint: "sprint-2",
      message: "Ensure Sprint status and supporting narratives are provided for Term Outcomes.",
      checklist: []
    },
    {
      id: "prep-sprint-planning-s3",
      meetingId: "sprint-planning",
      meetingName: "Sprint Planning",
      personas: ["adm"],
      prepSprint: "sprint-3",
      meetingSprint: "sprint-3",
      message: "Ensure Sprint status and supporting narratives are provided for Term Outcomes.",
      checklist: []
    },
    {
      id: "prep-sprint-planning-s4",
      meetingId: "sprint-planning",
      meetingName: "Sprint Planning",
      personas: ["adm"],
      prepSprint: "sprint-4",
      meetingSprint: "sprint-4",
      message: "Ensure Sprint status and supporting narratives are provided for Term Outcomes.",
      checklist: []
    },
    {
      id: "prep-sprint-planning-s5",
      meetingId: "sprint-planning",
      meetingName: "Sprint Planning",
      personas: ["adm"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-5",
      message: "Ensure Sprint status and supporting narratives are provided for Term Outcomes.",
      checklist: []
    },
    {
      id: "prep-sprint-planning-s6ia",
      meetingId: "sprint-planning",
      meetingName: "Sprint Planning",
      personas: ["adm"],
      prepSprint: "sprint-6-ia",
      meetingSprint: "sprint-6-ia",
      message: "Ensure Sprint status and supporting narratives are provided for Term Outcomes.",
      checklist: []
    },

    // ---- Monthly Product Team Forecast Review (ADM: Sprint 1, 3, 5) ----
    {
      id: "prep-forecast-s1",
      meetingId: "monthly-forecast-review",
      meetingName: "Monthly Product Team Forecast Review",
      personas: ["adm"],
      prepSprint: "sprint-1",
      meetingSprint: "sprint-1",
      message: "Ensure team forecast is up to date.",
      checklist: []
    },
    {
      id: "prep-forecast-s3",
      meetingId: "monthly-forecast-review",
      meetingName: "Monthly Product Team Forecast Review",
      personas: ["adm"],
      prepSprint: "sprint-3",
      meetingSprint: "sprint-3",
      message: "Ensure team forecast is up to date.",
      checklist: []
    },
    {
      id: "prep-forecast-s5",
      meetingId: "monthly-forecast-review",
      meetingName: "Monthly Product Team Forecast Review",
      personas: ["adm"],
      prepSprint: "sprint-5",
      meetingSprint: "sprint-5",
      message: "Ensure team forecast is up to date.",
      checklist: []
    }
  ]
};
