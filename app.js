// Key Termly Ceremonies - Application Logic
(function() {
    'use strict';

    // ========== STATE ==========
    let currentSprint = 'sprint-1';
    let currentCategory = 'all';
    let currentPersona = 'pdm';
    let currentView = 'tiles'; // tiles | swimlane | timeline
    let viewAll = false;

    // ========== DOM ELEMENTS ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const meetingsGrid = document.getElementById('meetingsGrid');
    const sprintTitle = document.getElementById('sprintTitle');
    const sprintCount = document.getElementById('sprintCount');
    const detailOverlay = document.getElementById('detailOverlay');
    const detailClose = document.getElementById('detailClose');
    const viewAllBtn = document.getElementById('viewAllBtn');
    const personaBadges = document.querySelectorAll('.persona-badge');
    const timelineCardsContainer = document.getElementById('timelineCards');
    const swimlaneView = document.getElementById('swimlaneView');
    const timelineGanttView = document.getElementById('timelineGanttView');
    const viewBtns = document.querySelectorAll('.view-btn');
    const sprintHeader = document.getElementById('sprintHeader');
    // timelineNodes is populated after the timeline is rendered
    let timelineNodes = [];

    // ========== HELPERS ==========
    function getSprintName(sprintId) {
        const sprint = CEREMONIES_DATA.sprints.find(s => s.id === sprintId);
        return sprint ? sprint.name : sprintId;
    }

    // Return the sprints that should be shown this term (hides the
    // optional Sprint 6 unless termConfig.hasExtraSprint6 is true).
    function getVisibleSprints() {
        const hasExtra = CEREMONIES_DATA.termConfig && CEREMONIES_DATA.termConfig.hasExtraSprint6;
        return CEREMONIES_DATA.sprints.filter(s => !s.optional || hasExtra);
    }

    // Render the timeline cards based on visible sprints
    function renderTimeline() {
        const sprints = getVisibleSprints();
        timelineCardsContainer.innerHTML = sprints.map((sprint, index) => {
            const isActive = sprint.id === currentSprint;
            return `
                <button class="sprint-card ${isActive ? 'active' : ''}" data-sprint="${sprint.id}" aria-label="${sprint.name}${isActive ? ', currently selected' : ''}" aria-pressed="${isActive ? 'true' : 'false'}">
                    <span class="sprint-card-name">${sprint.name}</span>
                    <span class="sprint-card-count" data-sprint-count="${sprint.id}"></span>
                </button>
            `;
        }).join('');

        // Re-bind timeline node references and click handlers
        timelineNodes = timelineCardsContainer.querySelectorAll('.sprint-card');
        timelineNodes.forEach(node => {
            node.addEventListener('click', () => {
                currentSprint = node.getAttribute('data-sprint');
                viewAll = false;
                viewAllBtn.classList.remove('active');
                viewAllBtn.setAttribute('aria-pressed', 'false');
                updateTimelineActive();
                updateSprintTitle();
                renderMeetings();
            });
        });
    }

    function getCategoryInfo(categoryId) {
        return CEREMONIES_DATA.categories.find(c => c.id === categoryId);
    }

    function getMeetingById(id) {
        return CEREMONIES_DATA.meetings.find(m => m.id === id);
    }

    function getArtefactById(id) {
        return CEREMONIES_DATA.artefacts.find(a => a.id === id);
    }

    function getFilteredMeetings() {
        // Filter by persona first
        let meetings = CEREMONIES_DATA.meetings.filter(m => m.personas && m.personas.includes(currentPersona));

        // Filter by sprint
        if (!viewAll) {
            meetings = meetings.filter(m => m.sprints.includes(currentSprint));
        }

        // Filter by category
        if (currentCategory !== 'all') {
            meetings = meetings.filter(m => m.category === currentCategory);
        }

        // Sort alphabetically by name
        meetings.sort((a, b) => a.name.localeCompare(b.name));

        return meetings;
    }

    function getFilteredPrepReminders() {
        if (!CEREMONIES_DATA.prepReminders) return [];
        
        // Filter by persona first
        let reminders = CEREMONIES_DATA.prepReminders.filter(r => r.personas && r.personas.includes(currentPersona));

        // Filter by sprint
        if (!viewAll) {
            reminders = reminders.filter(r => r.prepSprint === currentSprint);
        }

        // Filter by category (match the linked meeting's category)
        if (currentCategory !== 'all') {
            reminders = reminders.filter(r => {
                const meeting = getMeetingById(r.meetingId);
                return meeting && meeting.category === currentCategory;
            });
        }

        return reminders;
    }

    // ========== CALENDAR (.ics) GENERATION ==========
    // Build and download an .ics calendar file for a prep reminder.
    // Opens in Outlook / Google Calendar / Apple Calendar.
    function downloadReminderIcs(reminderId) {
        const reminder = (CEREMONIES_DATA.prepReminders || []).find(r => r.id === reminderId);
        if (!reminder) return;

        const dateStr = CEREMONIES_DATA.termConfig.sprintStartDates[reminder.prepSprint];
        if (!dateStr) return;

        // Format date as YYYYMMDD for an all-day event
        const start = dateStr.replace(/-/g, ''); // e.g. 20260302
        // End date = next day (all-day events are exclusive of end)
        const endDate = new Date(dateStr + 'T00:00:00');
        endDate.setDate(endDate.getDate() + 1);
        const end = endDate.getFullYear().toString()
            + String(endDate.getMonth() + 1).padStart(2, '0')
            + String(endDate.getDate()).padStart(2, '0');

        const title = 'Prep: ' + reminder.meetingName;
        const meetingSprintName = getSprintName(reminder.meetingSprint);
        let description = reminder.message;
        if (reminder.checklist && reminder.checklist.length > 0) {
            description += '\\n\\nChecklist:\\n' + reminder.checklist.map(i => '- ' + i).join('\\n');
        }
        description += '\\n\\nThis is a preparation reminder. The meeting itself takes place in ' + meetingSprintName + '.';

        // Unique id + timestamp for the event
        const uid = reminderId + '-' + start + '@key-termly-ceremonies';
        const now = new Date();
        const stamp = now.getUTCFullYear().toString()
            + String(now.getUTCMonth() + 1).padStart(2, '0')
            + String(now.getUTCDate()).padStart(2, '0') + 'T'
            + String(now.getUTCHours()).padStart(2, '0')
            + String(now.getUTCMinutes()).padStart(2, '0')
            + String(now.getUTCSeconds()).padStart(2, '0') + 'Z';

        const icsLines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//UCL ISD//Key Termly Ceremonies//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            'UID:' + uid,
            'DTSTAMP:' + stamp,
            'DTSTART;VALUE=DATE:' + start,
            'DTEND;VALUE=DATE:' + end,
            'SUMMARY:' + title,
            'DESCRIPTION:' + description,
            'BEGIN:VALARM',
            'TRIGGER:-PT0M',
            'ACTION:DISPLAY',
            'DESCRIPTION:' + title,
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ];
        const icsContent = icsLines.join('\r\n');

        // Trigger download
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'prep-' + reminder.meetingId + '.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // ========== RENDER DISPATCHER ==========
    function renderMeetings() {
        // Toggle container visibility based on current view
        meetingsGrid.hidden = (currentView !== 'tiles');
        swimlaneView.hidden = (currentView !== 'swimlane');
        timelineGanttView.hidden = (currentView !== 'timeline');

        // The timeline (Gantt) view shows the whole term, so hide the
        // sprint selector + sprint header when it is active.
        if (currentView === 'timeline') {
            sprintHeader.style.display = 'none';
        } else {
            sprintHeader.style.display = '';
        }

        if (currentView === 'tiles') {
            renderTilesView();
        } else if (currentView === 'swimlane') {
            renderSwimlaneView();
        } else if (currentView === 'timeline') {
            renderTimelineGanttView();
        }
    }

    // ========== TILES VIEW ==========
    function renderTilesView() {
        const meetings = getFilteredMeetings();
        const prepReminders = getFilteredPrepReminders();

        if (meetings.length === 0 && prepReminders.length === 0) {
            meetingsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p class="empty-state-text">No ceremonies found for this selection</p>
                </div>
            `;
            sprintCount.textContent = '0 meetings';
            return;
        }

        const countText = [];
        if (meetings.length > 0) countText.push(`${meetings.length} meeting${meetings.length !== 1 ? 's' : ''}`);
        if (prepReminders.length > 0) countText.push(`${prepReminders.length} prep reminder${prepReminders.length !== 1 ? 's' : ''}`);
        sprintCount.textContent = countText.join(' · ');

        // Render prep reminders first, then meetings
        let gridHTML = '';

        // Prep reminder cards
        gridHTML += prepReminders.map(reminder => {
            const meeting = getMeetingById(reminder.meetingId);
            const category = meeting ? getCategoryInfo(meeting.category) : null;
            const meetingSprintName = getSprintName(reminder.meetingSprint);

            // Only show the Outlook button if we have a start date for the prep sprint
            const prepDate = CEREMONIES_DATA.termConfig
                && CEREMONIES_DATA.termConfig.sprintStartDates
                && CEREMONIES_DATA.termConfig.sprintStartDates[reminder.prepSprint];
            const outlookBtn = prepDate
                ? `<button class="outlook-btn" data-reminder-id="${reminder.id}" aria-label="Add ${reminder.meetingName} prep reminder to your calendar">📅 Add reminder to Outlook</button>`
                : '';

            // Checklist (if any)
            const checklistHtml = (reminder.checklist && reminder.checklist.length > 0)
                ? `<div class="prep-reminder-checklist">
                       <span class="prep-checklist-label">Checklist:</span>
                       <ul>${reminder.checklist.map(item => `<li>${item}</li>`).join('')}</ul>
                   </div>`
                : '';

            return `
                <div class="prep-reminder-card" data-reminder-id="${reminder.id}" data-meeting-id="${reminder.meetingId}" role="button" tabindex="0" aria-label="Prep reminder: ${reminder.meetingName}. Click for what to do and checklist.">
                    <div class="prep-reminder-header">
                        <span class="prep-reminder-badge">⏰ Prep Reminder</span>
                        ${category ? `<span class="card-category" data-category="${meeting.category}">${category.icon} ${category.name}</span>` : ''}
                    </div>
                    <h3 class="prep-reminder-title">Prepare for: ${reminder.meetingName}</h3>
                    <p class="prep-reminder-message">${reminder.message}</p>
                    ${checklistHtml}
                    <div class="prep-reminder-footer">
                        <span class="prep-reminder-meeting-sprint">📅 Meeting in: <strong>${meetingSprintName}</strong></span>
                        <span class="prep-reminder-action">Click to view →</span>
                    </div>
                    ${outlookBtn ? `<div class="prep-reminder-calendar">${outlookBtn}</div>` : ''}
                </div>
            `;
        }).join('');

        // Meeting cards
        gridHTML += meetings.map(meeting => {
            const category = getCategoryInfo(meeting.category);
            
            // Content/artefact pills
            const contentPills = meeting.content.map(contentId => {
                const artefact = getArtefactById(contentId);
                return artefact ? `<span class="card-content-pill">${artefact.name}</span>` : '';
            }).join('');

            // Truncate why text for card
            const whyShort = meeting.why.length > 120 ? meeting.why.substring(0, 120) + '...' : meeting.why;

            return `
                <div class="meeting-card" data-id="${meeting.id}" data-category="${meeting.category}" role="button" tabindex="0" aria-label="${meeting.name} - ${category.name} meeting. Presenter: ${meeting.presenter}. ${meeting.content.length} artefacts available.">
                    <div class="card-top">
                        <span class="card-category" data-category="${meeting.category}">${category.icon} ${category.name}</span>
                        <span class="card-presenter">🎤 ${meeting.presenter}</span>
                    </div>
                    <h3 class="card-title">${meeting.name}</h3>
                    <p class="card-why">${whyShort}</p>
                    ${meeting.content.length > 0 ? `<div class="card-content-row"><span class="card-content-label">📎 Content:</span> ${contentPills}</div>` : ''}
                    <div class="card-footer">
                        <span class="card-who">👥 ${meeting.whoAttends.split(',').slice(0, 2).join(', ').trim()}${meeting.whoAttends.split(',').length > 2 ? '...' : ''}</span>
                    </div>
                </div>
            `;
        }).join('');

        meetingsGrid.innerHTML = gridHTML;

        // Add click handlers to meeting cards
        document.querySelectorAll('.meeting-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                openMeetingDetail(id);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const id = card.getAttribute('data-id');
                    openMeetingDetail(id);
                }
            });
        });

        // Add click handlers to prep reminder cards (open the reminder detail)
        document.querySelectorAll('.prep-reminder-card').forEach(card => {
            card.addEventListener('click', () => {
                const reminderId = card.getAttribute('data-reminder-id');
                openReminderDetail(reminderId);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const reminderId = card.getAttribute('data-reminder-id');
                    openReminderDetail(reminderId);
                }
            });
        });

        // Add click handlers to "Add to Outlook" buttons
        document.querySelectorAll('.outlook-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // don't open the meeting detail
                const reminderId = btn.getAttribute('data-reminder-id');
                downloadReminderIcs(reminderId);
            });
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                }
            });
        });
    }

    // ========== SWIMLANE VIEW ==========
    // Shows meetings + prep reminders grouped into category lanes,
    // for the currently selected sprint (or all sprints).
    function renderSwimlaneView() {
        const meetings = getFilteredMeetings();
        const prepReminders = getFilteredPrepReminders();

        const totalItems = meetings.length + prepReminders.length;
        const countText = [];
        if (meetings.length > 0) countText.push(`${meetings.length} meeting${meetings.length !== 1 ? 's' : ''}`);
        if (prepReminders.length > 0) countText.push(`${prepReminders.length} prep reminder${prepReminders.length !== 1 ? 's' : ''}`);
        sprintCount.textContent = countText.join(' · ') || '0 meetings';

        if (totalItems === 0) {
            swimlaneView.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p class="empty-state-text">No ceremonies found for this selection</p>
                </div>`;
            return;
        }

        // Build lanes per category (only categories that have items)
        let html = '';
        CEREMONIES_DATA.categories.forEach(category => {
            const laneMeetings = meetings.filter(m => m.category === category.id);
            const laneReminders = prepReminders.filter(r => {
                const m = getMeetingById(r.meetingId);
                return m && m.category === category.id;
            });
            if (laneMeetings.length === 0 && laneReminders.length === 0) return;

            let chips = '';
            // Meeting chips
            chips += laneMeetings.map(m =>
                `<button class="swim-chip meeting" data-id="${m.id}" aria-label="${m.name} meeting">
                    <span class="swim-chip-title">${m.name}</span>
                    <span class="swim-chip-meta">🎤 ${m.presenter}</span>
                 </button>`
            ).join('');
            // Reminder chips (amber, distinct)
            chips += laneReminders.map(r =>
                `<button class="swim-chip reminder" data-reminder-id="${r.id}" aria-label="Prep reminder for ${r.meetingName}. Click for what to do and checklist.">
                    <span class="swim-chip-title">⏰ Prep: ${r.meetingName}</span>
                    <span class="swim-chip-meta">Prep in ${getSprintName(r.prepSprint)}</span>
                 </button>`
            ).join('');

            html += `
                <div class="swimlane" style="--lane-color: ${category.color};">
                    <div class="swimlane-header">
                        <span class="swimlane-icon" aria-hidden="true">${category.icon}</span>
                        <span class="swimlane-name">${category.name}</span>
                    </div>
                    <div class="swimlane-items">${chips}</div>
                </div>`;
        });

        swimlaneView.innerHTML = html;

        // Wire up clicks
        swimlaneView.querySelectorAll('.swim-chip.meeting').forEach(chip => {
            chip.addEventListener('click', () => openMeetingDetail(chip.getAttribute('data-id')));
        });
        swimlaneView.querySelectorAll('.swim-chip.reminder').forEach(chip => {
            chip.addEventListener('click', () => openReminderDetail(chip.getAttribute('data-reminder-id')));
        });
    }

    // ========== TIMELINE / GANTT VIEW ==========
    // Shows all meetings + reminders for the selected persona as rows,
    // with a cell per sprint across the whole term.
    function renderTimelineGanttView() {
        const sprints = getVisibleSprints();

        // All meetings for the current persona (ignore sprint selection)
        let meetings = CEREMONIES_DATA.meetings.filter(m => m.personas && m.personas.includes(currentPersona));
        if (currentCategory !== 'all') {
            meetings = meetings.filter(m => m.category === currentCategory);
        }
        meetings.sort((a, b) => a.name.localeCompare(b.name));

        // Reminders for current persona, grouped by meeting -> set of prep sprints
        let reminders = (CEREMONIES_DATA.prepReminders || []).filter(r => r.personas && r.personas.includes(currentPersona));
        if (currentCategory !== 'all') {
            reminders = reminders.filter(r => {
                const m = getMeetingById(r.meetingId);
                return m && m.category === currentCategory;
            });
        }
        // Map: meetingId -> { prepSprintId: reminderId }
        const prepByMeeting = {};
        reminders.forEach(r => {
            if (!prepByMeeting[r.meetingId]) prepByMeeting[r.meetingId] = {};
            prepByMeeting[r.meetingId][r.prepSprint] = r.id;
        });

        sprintCount.textContent = `${meetings.length} meeting${meetings.length !== 1 ? 's' : ''} across the term`;

        if (meetings.length === 0) {
            timelineGanttView.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p class="empty-state-text">No ceremonies found for this persona</p>
                </div>`;
            return;
        }

        // Header row — set column count so the grid matches visible sprints
        const colStyle = `style="--sprint-cols: ${sprints.length};"`;
        let html = `<div class="gantt-table" role="table" ${colStyle}>`;
        html += `<div class="gantt-row gantt-head" role="row" ${colStyle}>`;
        html += '<div class="gantt-cell gantt-rowlabel" role="columnheader">Meeting</div>';
        sprints.forEach(s => {
            html += `<div class="gantt-cell gantt-colhead" role="columnheader">${s.shortName}</div>`;
        });
        html += '</div>';

        // One row per meeting
        meetings.forEach(meeting => {
            const category = getCategoryInfo(meeting.category);
            html += `<div class="gantt-row" role="row" ${colStyle}>`;
            html += `<button class="gantt-cell gantt-rowlabel gantt-meeting-label" data-id="${meeting.id}" role="rowheader" style="--row-color:${category.color};" aria-label="${meeting.name}, open details">
                        <span class="gantt-dot" style="background:${category.color};"></span>${meeting.name}
                     </button>`;
            const preps = prepByMeeting[meeting.id] || {};
            sprints.forEach(s => {
                const hasMeeting = meeting.sprints.includes(s.id);
                const reminderId = preps[s.id]; // reminder id if a prep falls in this sprint
                const hasPrep = !!reminderId;
                // Make a cell clickable if it has a meeting or prep in this sprint.
                // If it has a prep reminder, clicking opens the reminder detail;
                // otherwise it opens the meeting detail.
                const clickable = hasMeeting || hasPrep;
                const dataAttrs = hasPrep
                    ? `data-reminder-id="${reminderId}"`
                    : `data-meeting-id="${meeting.id}"`;
                let cell = clickable
                    ? `<button class="gantt-cell gantt-cell-clickable" role="cell" ${dataAttrs} aria-label="${meeting.name} in ${s.name}${hasPrep ? ', prep reminder — click for the checklist' : ' — click for details'}.">`
                    : '<div class="gantt-cell" role="cell">';
                if (hasMeeting) {
                    cell += `<span class="gantt-bar meeting" style="background:${category.color};" title="${meeting.name} in ${s.name}"></span>`;
                }
                if (hasPrep) {
                    cell += `<span class="gantt-bar prep" title="Prep reminder in ${s.name}">⏰</span>`;
                }
                cell += clickable ? '</button>' : '</div>';
                html += cell;
            });
            html += '</div>';
        });
        html += '</div>';

        // Legend
        html += `<div class="gantt-legend">
            <span class="gantt-legend-item"><span class="gantt-legend-bar"></span> Meeting</span>
            <span class="gantt-legend-item"><span class="gantt-legend-prep">⏰</span> Prep reminder</span>
        </div>`;

        timelineGanttView.innerHTML = html;

        // Wire up meeting label clicks (open meeting detail)
        timelineGanttView.querySelectorAll('.gantt-meeting-label').forEach(btn => {
            btn.addEventListener('click', () => openMeetingDetail(btn.getAttribute('data-id')));
        });

        // Wire up cell clicks — reminder cells open the reminder detail,
        // meeting cells open the meeting detail.
        timelineGanttView.querySelectorAll('.gantt-cell-clickable').forEach(cell => {
            cell.addEventListener('click', () => {
                const reminderId = cell.getAttribute('data-reminder-id');
                const meetingId = cell.getAttribute('data-meeting-id');
                if (reminderId) {
                    openReminderDetail(reminderId);
                } else if (meetingId) {
                    openMeetingDetail(meetingId);
                }
            });
        });
    }

    // ========== REMINDER DETAIL POPUP ==========
    let currentReminderId = null;

    function openReminderDetail(reminderId) {
        const reminder = (CEREMONIES_DATA.prepReminders || []).find(r => r.id === reminderId);
        if (!reminder) return;
        currentReminderId = reminderId;

        const reminderOverlay = document.getElementById('reminderOverlay');
        const prepSprintName = getSprintName(reminder.prepSprint);
        const meetingSprintName = getSprintName(reminder.meetingSprint);

        // Sprint badge
        document.getElementById('reminderSprintBadge').textContent = '🗓️ Prep in ' + prepSprintName;

        // Title
        document.getElementById('reminderTitle').textContent = 'Prepare for: ' + reminder.meetingName;

        // Message
        document.getElementById('reminderMessage').textContent = reminder.message;

        // Checklist
        const checklistSection = document.getElementById('reminderChecklistSection');
        const checklistList = document.getElementById('reminderChecklist');
        if (reminder.checklist && reminder.checklist.length > 0) {
            checklistSection.style.display = 'block';
            checklistList.innerHTML = reminder.checklist.map(item => `<li>${item}</li>`).join('');
        } else {
            checklistSection.style.display = 'none';
        }

        // When
        document.getElementById('reminderWhen').textContent =
            'This prep happens in ' + prepSprintName + '. The meeting itself takes place in ' + meetingSprintName + '.';

        // Outlook button — only if we have a date for the prep sprint
        const outlookBtn = document.getElementById('reminderOutlookBtn');
        const prepDate = CEREMONIES_DATA.termConfig
            && CEREMONIES_DATA.termConfig.sprintStartDates
            && CEREMONIES_DATA.termConfig.sprintStartDates[reminder.prepSprint];
        if (prepDate) {
            outlookBtn.style.display = '';
            outlookBtn.onclick = function() { downloadReminderIcs(reminderId); };
        } else {
            outlookBtn.style.display = 'none';
        }

        // View meeting button
        document.getElementById('reminderViewMeetingBtn').onclick = function() {
            closeReminderDetail();
            openMeetingDetail(reminder.meetingId);
        };

        reminderOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
        document.getElementById('reminderClose').focus();
    }

    function closeReminderDetail() {
        document.getElementById('reminderOverlay').classList.remove('visible');
        document.body.style.overflow = '';
    }

    function openMeetingDetail(meetingId) {
        const meeting = getMeetingById(meetingId);
        if (!meeting) return;

        const category = getCategoryInfo(meeting.category);

        // Category badge
        const categoryBadge = document.getElementById('detailCategoryBadge');
        categoryBadge.textContent = `${category.icon} ${category.name}`;
        categoryBadge.style.background = `${category.color}15`;
        categoryBadge.style.color = category.color;

        // Sprint badge
        const sprintBadge = document.getElementById('detailSprintBadge');
        const sprintNames = meeting.sprints.map(s => getSprintName(s)).join(', ');
        sprintBadge.textContent = `🗓️ ${sprintNames}`;

        // Title
        document.getElementById('detailTitle').textContent = meeting.name;

        // Presenter
        document.getElementById('detailPresenter').textContent = meeting.presenter;

        // Why
        document.getElementById('detailWhy').textContent = meeting.why;

        // Outcome
        document.getElementById('detailOutcome').textContent = meeting.outcome;

        // Content (artefacts as clickable links + inline preview)
        const contentSection = document.getElementById('contentSection');
        const contentContainer = document.getElementById('detailContent');
        const contentPreview = document.getElementById('contentPreview');
        
        if (meeting.content.length > 0) {
            contentSection.style.display = 'block';
            
            // Render artefact links
            contentContainer.innerHTML = meeting.content.map(contentId => {
                const artefact = getArtefactById(contentId);
                if (!artefact) return '';
                const hasImages = artefact.screenshots && artefact.screenshots.length > 0;
                return `<a class="content-link ${hasImages ? 'has-images' : ''}" data-artefact-id="${artefact.id}" role="button" tabindex="0" aria-expanded="false" aria-label="${artefact.name}${hasImages ? ' - has example screenshot' : ''}">📄 ${artefact.name} ${hasImages ? '🖼️' : ''}</a>`;
            }).join('');

            // Clear preview initially
            contentPreview.innerHTML = '';

            // Add click handlers to content links
            contentContainer.querySelectorAll('.content-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const artefactId = link.getAttribute('data-artefact-id');
                    toggleArtefactPreview(artefactId, link);
                });
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        const artefactId = link.getAttribute('data-artefact-id');
                        toggleArtefactPreview(artefactId, link);
                    }
                });
            });
        } else {
            contentSection.style.display = 'none';
        }

        // Who attends
        const attendeesContainer = document.getElementById('detailAttendees');
        const attendees = meeting.whoAttends.split(',').map(a => a.trim()).filter(a => a);
        attendeesContainer.innerHTML = `
            <div class="attendees-list">
                ${attendees.map(a => `<span class="attendee-tag">${a}</span>`).join('')}
            </div>
        `;

        // Key Responsibilities
        const responsibilitiesSection = document.getElementById('responsibilitiesSection');
        const responsibilitiesList = document.getElementById('detailResponsibilities');
        if (meeting.keyResponsibilities && meeting.keyResponsibilities.trim()) {
            responsibilitiesSection.style.display = 'block';
            const items = meeting.keyResponsibilities.split('\n').map(r => r.trim()).filter(r => r);
            responsibilitiesList.innerHTML = items.map(r => `<li>${r}</li>`).join('');
        } else {
            responsibilitiesSection.style.display = 'none';
        }

        // Show overlay
        detailOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
        // Move focus to close button for keyboard users
        document.getElementById('detailClose').focus();
    }

    function toggleArtefactPreview(artefactId, clickedLink) {
        const artefact = getArtefactById(artefactId);
        if (!artefact) return;

        const contentPreview = document.getElementById('contentPreview');
        
        // Toggle: if already showing this artefact, hide it
        if (contentPreview.getAttribute('data-showing') === artefactId) {
            contentPreview.innerHTML = '';
            contentPreview.setAttribute('data-showing', '');
            clickedLink.classList.remove('expanded');
            clickedLink.setAttribute('aria-expanded', 'false');
            return;
        }

        // Mark all links as not expanded, then expand this one
        document.querySelectorAll('.content-link').forEach(l => {
            l.classList.remove('expanded');
            l.setAttribute('aria-expanded', 'false');
        });
        clickedLink.classList.add('expanded');
        clickedLink.setAttribute('aria-expanded', 'true');
        contentPreview.setAttribute('data-showing', artefactId);

        // Build preview content
        let previewHTML = `<div class="artefact-inline-preview">`;
        previewHTML += `<h4 class="preview-title">${artefact.name}</h4>`;
        previewHTML += `<p class="preview-description">${artefact.description}</p>`;
        
        // Screenshots
        if (artefact.screenshots && artefact.screenshots.length > 0) {
            previewHTML += `<div class="preview-screenshots">`;
            artefact.screenshots.forEach((src, index) => {
                previewHTML += `<div class="preview-screenshot-item" data-src="${src}">
                    <img src="${src}" alt="${artefact.name} - example ${index + 1}" class="preview-screenshot-img" />
                </div>`;
            });
            previewHTML += `<p class="screenshot-hint">Click image to enlarge</p>`;
            previewHTML += `</div>`;
        }

        previewHTML += `</div>`;
        contentPreview.innerHTML = previewHTML;

        // Add lightbox click handlers to screenshots
        contentPreview.querySelectorAll('.preview-screenshot-item').forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                openLightbox(src);
            });
        });

        // Scroll preview into view
        contentPreview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function openLightbox(imageSrc) {
        const lightboxOverlay = document.getElementById('lightboxOverlay');
        const lightboxImage = document.getElementById('lightboxImage');
        lightboxImage.src = imageSrc;
        lightboxImage.alt = 'Enlarged artefact example screenshot';
        lightboxOverlay.classList.add('visible');
        // Move focus to close button for keyboard users
        document.getElementById('lightboxClose').focus();
    }

    function closeLightbox() {
        const lightboxOverlay = document.getElementById('lightboxOverlay');
        lightboxOverlay.classList.remove('visible');
    }

    function closeMeetingDetail() {
        detailOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    function updateTimelineActive() {
        timelineNodes.forEach(node => {
            const sprint = node.getAttribute('data-sprint');
            if (viewAll) {
                node.classList.remove('active');
                node.setAttribute('aria-pressed', 'false');
            } else {
                const isActive = sprint === currentSprint;
                node.classList.toggle('active', isActive);
                node.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            }
        });
    }

    function updateSprintCounts() {
        CEREMONIES_DATA.sprints.forEach(sprint => {
            const meetingCount = CEREMONIES_DATA.meetings.filter(m => 
                m.personas && m.personas.includes(currentPersona) && m.sprints.includes(sprint.id)
            ).length;
            const prepCount = (CEREMONIES_DATA.prepReminders || []).filter(r => 
                r.personas && r.personas.includes(currentPersona) && r.prepSprint === sprint.id
            ).length;
            const badge = document.querySelector(`[data-sprint-count="${sprint.id}"]`);
            if (badge) {
                const parts = [];
                if (meetingCount > 0) parts.push(meetingCount + ' mtg');
                if (prepCount > 0) parts.push(prepCount + ' prep');
                badge.textContent = parts.join(' · ');
            }
        });
    }

    function switchPersona(personaId) {
        currentPersona = personaId;
        // Update active state on badges
        personaBadges.forEach(badge => {
            const p = badge.getAttribute('data-persona');
            const isActive = p === personaId;
            badge.classList.toggle('active', isActive);
            badge.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        // Reset category filter to All when switching persona
        currentCategory = 'all';
        updateFilterActive();
        updateSprintCounts();
        renderMeetings();
    }

    function updateSprintTitle() {
        if (viewAll) {
            sprintTitle.textContent = 'All Sprints';
        } else {
            sprintTitle.textContent = getSprintName(currentSprint);
        }
    }

    function updateFilterActive() {
        filterBtns.forEach(btn => {
            const cat = btn.getAttribute('data-category');
            const isActive = cat === currentCategory;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    // ========== EVENT LISTENERS ==========

    // (Timeline node click handlers are bound in renderTimeline)

    // View All button
    viewAllBtn.addEventListener('click', () => {
        viewAll = !viewAll;
        viewAllBtn.classList.toggle('active', viewAll);
        updateTimelineActive();
        updateSprintTitle();
        renderMeetings();
    });

    // Persona switcher
    personaBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            if (badge.classList.contains('disabled')) return;
            const personaId = badge.getAttribute('data-persona');
            switchPersona(personaId);
        });
    });

    // View switcher (Tiles / Swimlane / Timeline)
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentView = btn.getAttribute('data-view');
            viewBtns.forEach(b => {
                const isActive = b === btn;
                b.classList.toggle('active', isActive);
                b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
            renderMeetings();
        });
    });

    // Category filter clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.getAttribute('data-category');
            updateFilterActive();
            renderMeetings();
        });
    });

    // Close meeting detail panel
    detailClose.addEventListener('click', closeMeetingDetail);
    detailOverlay.addEventListener('click', (e) => {
        if (e.target === detailOverlay) {
            closeMeetingDetail();
        }
    });

    // Lightbox close
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightboxOverlay') || e.target === document.getElementById('lightboxImage')) {
            closeLightbox();
        }
    });

    // Reminder detail close handlers
    document.getElementById('reminderClose').addEventListener('click', closeReminderDetail);
    document.getElementById('reminderOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('reminderOverlay')) {
            closeReminderDetail();
        }
    });

    // Keyboard escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const lightboxOverlay = document.getElementById('lightboxOverlay');
            const reminderOverlay = document.getElementById('reminderOverlay');
            if (lightboxOverlay.classList.contains('visible')) {
                closeLightbox();
            } else if (reminderOverlay.classList.contains('visible')) {
                closeReminderDetail();
            } else if (detailOverlay.classList.contains('visible')) {
                closeMeetingDetail();
            }
        }
    });

    // ========== INIT ==========
    function init() {
        renderTimeline();
        updateTimelineActive();
        updateSprintCounts();
        updateSprintTitle();
        updateFilterActive();
        renderMeetings();
    }

    init();
})();
