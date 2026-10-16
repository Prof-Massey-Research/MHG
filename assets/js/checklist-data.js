/* ==========================================================================
   Checklist content — the implementation steps, one list per guideline.

   These are the SAME steps, in the same order, as the "Implementation
   protocol" on each guideline page. That page is the source of truth; this
   file mirrors it so the portal and the public pages cannot say different
   things. If a step changes on the page, change it here too.

   The previous version of this file forced every guideline into five named
   stages (Foundational / Developing / Established / Advanced / Sustained).
   The guidelines do not divide that way — they have between two and six steps
   each — so the stages were invented structure. Progress is now simply how
   many of a guideline's steps are done. The previous file is kept at
   archive/checklist-data-5stage-REMOVED.js.

   To edit: change the text below. Item `id` values are the storage keys —
   changing an id orphans that item for anyone who has already saved progress,
   so add new ids rather than renaming old ones.
   ========================================================================== */
window.MHG_CHECKLIST = [
  {
    id: 'g1',
    number: '01',
    title: 'Safeguarding & Abuse Prevention',
    statement: 'Youth sport programs comply with best practices in safeguarding and abuse prevention.',
    href: 'guidelines/safeguarding.html',
    steps: [
      { id: 'g1s1',
        text: 'Complete background checks',
        note: 'Background checks are the foundational screening tool to prevent individuals with histories of abuse or misconduct from accessing youth.'
      },
      { id: 'g1s2',
        text: 'Require SafeSport or equivalent abuse prevention training',
        note: 'Training equips staff with the knowledge to recognize warning signs of abuse, understand grooming behaviors, respond appropriately to disclosures, and fulfill their legal reporting obligations.'
      },
      { id: 'g1s3',
        text: 'Conduct annual safeguarding audits using a self-assessment tool',
        note: 'Moving from compliance to culture requires regular evaluation and continuous improvement. An annual audit helps organizations identify gaps in their safeguarding practices, measure progress over time, and demonstrate commitment to ongoing d…',
        tools: [{ label: 'Safeguarding Audit Checklist', resource: 'safeguarding-audit' }]
      },
      { id: 'g1s4',
        text: 'Establish clear codes of conduct with specific behavioral standards',
        note: 'Vague policies leave too much to interpretation and make it difficult to address boundary violations early.',
        tools: [{ label: 'Code of Conduct', resource: 'code-of-conduct' }]
      },
      { id: 'g1s5',
        text: 'Centralize communication on a single documented platform',
        note: 'Grooming depends on private, unobserved contact, and a phone is the easiest unobserved space in a program.',
        tools: [{ label: 'Code of Conduct', resource: 'code-of-conduct' }]
      },
      { id: 'g1s6',
        text: 'Implement bystander intervention protocols',
        note: 'Culture change happens when everyone in the organization feels empowered and equipped to speak up when they witness concerning behavior. Bystander intervention moves safeguarding from an individual responsibility to a collective one.',
        tools: [{ label: 'Bystander Intervention Protocols', href: 'toolbox/bystander-intervention.html' }, { label: 'Pocket Reference Guide', href: 'toolbox/pocket-guide.html' }]
      }
    ]
  },
  {
    id: 'g2',
    number: '02',
    title: 'Alignment with Long-Term Athlete Development',
    statement: 'Youth sport programs are aligned to long-term athlete development models.',
    href: 'guidelines/ltad.html',
    steps: [
      { id: 'g2s1',
        text: 'Communicate program goals, values and developmental focus clearly to all stakeholders',
        note: 'Stakeholder misalignment is consistently identified in LTAD implementation research as the primary barrier to adoption. Programs need clear, written statements of developmental philosophy, shared proactively before the season begins.',
        tools: [{ label: 'Developmental Commitment Pledge', href: 'toolbox/commitment-pledge.html' }, { label: 'Youth Sport Developmental Charter', href: 'toolbox/developmental-charter.html' }]
      },
      { id: 'g2s2',
        text: 'Align time commitments, travel and competition with developmental stage',
        note: 'To ensure consistency across the organization — and that individual coaches stay aligned to the model — programs need written scheduling policies specifying maximum weekly training hours, rest days and competition loads by developmental sta…',
        tools: [{ label: 'State High School Athletic Rules', href: 'toolbox/hs-athletic-rules.html' }]
      },
      { id: 'g2s3',
        text: 'Conduct parent/guardian orientations that explain age-appropriate outcomes and reframe success',
        note: 'Parent/guardian pressure for immediate competitive results is a major threat to developmental programming.',
        tools: [{ label: 'Parent/Guardian Orientation', href: 'toolbox/parent-orientation.html' }]
      },
      { id: 'g2s4',
        text: 'Evaluate the program annually, not only its coaches',
        note: 'Programs that do not evaluate themselves annually against developmental standards create structural drift: coaches revert to performance-focused habits and athletes receive uneven developmental experiences.',
        tools: [{ label: 'End-of-Season Experience Survey', href: 'toolbox/season-survey.html' }]
      }
    ]
  },
  {
    id: 'g3',
    number: '03',
    title: 'Coach Development for Supportive Coaching',
    statement: 'Youth sport programs require and support their coaches to engage in ongoing coach development in methods that promote safe and supportive coaching.',
    href: 'guidelines/coach-development.html',
    steps: [
      { id: 'g3s1',
        text: 'Require comprehensive coach development training',
        note: 'Coaches spend the most direct time with athletes and shape the daily environment. Training must address not only what coaches know but how they behave — integrating evidence-based practices for supporting autonomy, building competence, fost…'
      },
      { id: 'g3s2',
        text: 'Build reflection and feedback into the season',
        note: 'One-time training does not change behavior. Coaches need structured chances to see what they are actually doing — their own read of it, and someone else’s — and a conversation that follows from both.',
        tools: [{ label: 'Coach Self-Reflection Journal', href: 'toolbox/coach-journal.html' }, { label: 'Coaching Climate Observation Form', href: 'toolbox/coaching-observation.html' }]
      },
      { id: 'g3s3',
        text: 'Create structures for peer learning',
        note: 'Coaches learn most from other coaches working with the same athletes under the same constraints. Left to chance this does not happen; it has to be scheduled and staffed like anything else.'
      },
      { id: 'g3s4',
        text: 'Protect coach well-being',
        note: 'A depleted coach cannot create a need-supportive environment, whatever their training. Most youth sport coaching is done by volunteers around other work, and a program that ignores this gets the coaching that follows from it.'
      },
      { id: 'g3s5',
        text: 'Embed principles in program structures and evaluation',
        note: 'Sustainable culture change requires that these principles live in organizational systems, not individual initiative.'
      }
    ]
  },
  {
    id: 'g4',
    number: '04',
    title: 'Mental Health Literacy Training',
    statement: 'Youth sport programs require and support their key actors to engage in mental health literacy training.',
    href: 'guidelines/mental-health-literacy.html',
    steps: [
      { id: 'g4s1',
        text: 'Require mental health literacy training for coaches',
        note: 'Coaches spend the most time with athletes and are often first to notice changes in behavior, mood or performance.'
      },
      { id: 'g4s2',
        text: 'Designate a Mental Health Point Person',
        note: 'A designated point person creates organizational accountability, gives staff and athletes a clear resource, maintains continuity of knowledge about guidelines and referral options, and acts as a culture carrier.',
        tools: [{ label: 'Mental Health Point Person', href: 'toolbox/point-person.html' }]
      },
      { id: 'g4s3',
        text: 'Establish regular athlete well-being feedback mechanisms',
        note: 'Structured opportunities for athletes to give feedback ensure their voices are heard, surface team climate issues before they escalate, and provide data to guide programming.',
        tools: [{ label: 'End-of-Season Experience Survey', href: 'toolbox/season-survey.html' }]
      },
      { id: 'g4s4',
        text: 'Develop sport-specific mental health conversation skills',
        note: 'Knowledge alone is insufficient. Staff need practical skills to initiate supportive conversations in sport contexts — recognizing early warning signs in realistic situations such as performance slumps, injury recovery or team conflict, and…'
      }
    ]
  },
  {
    id: 'g5',
    number: '05',
    title: 'Mental Health Crisis Response Training',
    statement: 'Youth sport programs require and support mental health crisis response training for organizational leaders who work directly with young people.',
    href: 'guidelines/crisis-training.html',
    steps: [
      { id: 'g5s1',
        text: 'Require Mental Health First Aid certification for organizational leadership',
        note: 'Organizations working with youth athletes bear professional responsibility for their safety. Crises can occur without warning and require immediate, informed response.'
      },
      { id: 'g5s2',
        text: 'Clarify the boundaries between triage and treatment',
        note: 'A common failure mode after mental health training is role confusion — staff believing they should provide ongoing counseling or \'fix\' an athlete\'s mental health.',
        tools: [{ label: 'Triage vs. Therapy', href: 'toolbox/triage-vs-therapy.html' }]
      }
    ]
  },
  {
    id: 'g6',
    number: '06',
    title: 'Locating Resources & Services',
    statement: 'Youth sport programs document where mental health resources and services can be located.',
    href: 'guidelines/resources.html',
    steps: [
      { id: 'g6s1',
        text: 'Identify local mental health resources',
        note: 'Relationships with local providers, crisis centers and emergency services should exist before a crisis occurs — not be assembled during one.'
      },
      { id: 'g6s2',
        text: 'Make the information easily accessible to families and athletes',
        note: 'A directory that no one can find does no work. Resources need to be visible in the places athletes actually are, and available discreetly.',
        tools: [{ label: 'Bathroom Stall Poster', href: 'toolbox/bathroom-poster.html' }, { label: 'Website Get Help Widget', href: 'toolbox/get-help-widget.html' }]
      }
    ]
  },
  {
    id: 'g7',
    number: '07',
    title: 'Mental Health Emergency Action Planning',
    statement: 'Youth sport programs have an emergency action plan that includes mental health.',
    href: 'guidelines/emergency-action-plan.html',
    steps: [
      { id: 'g7s1',
        text: 'Establish a crisis response team',
        note: 'Someone has to coordinate the response. A named team removes the hesitation of "who handles this?" at the moment it matters most.',
        tools: [{ label: 'Mental Health Emergency Action Plan', resource: 'mheap' }]
      },
      { id: 'g7s2',
        text: 'Develop written emergency procedures for mental health emergencies',
        note: 'Under stress, people fall back on what is written down. Detailed procedures remove judgment calls from the worst possible moment to be making them.',
        tools: [{ label: 'Mental Health Emergency Action Plan', resource: 'mheap' }]
      },
      { id: 'g7s3',
        text: 'Develop written emergency procedures for collective traumatic events',
        note: 'With the rise in collective traumatic events — political and other violence, fires, hurricanes, earthquakes — organizations need to understand how they will respond and what the boundaries of their response will be.',
        tools: [{ label: 'Collective Trauma Response Protocol', resource: 'ctrp' }]
      },
      { id: 'g7s4',
        text: 'Practice de-escalation techniques',
        note: 'Staff need concrete, rehearsed behaviors that stabilize a situation until additional help arrives.'
      },
      { id: 'g7s5',
        text: 'Create post-crisis support protocols',
        note: 'The crisis ending is not the end of the response. Athletes, teammates and the staff who responded all need support afterward — and the program needs to learn from what happened.',
        tools: [{ label: 'Post-Crisis Re-Entry Protocol', href: 'toolbox/post-crisis-reentry.html' }]
      },
      { id: 'g7s6',
        text: 'Review and update the plan regularly',
        note: 'Contact lists go stale, staff change, and lessons from drills are lost unless they are written back into the plan.'
      }
    ]
  }
];
