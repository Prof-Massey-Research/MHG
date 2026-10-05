/* ==========================================================================
   Checklist content — the five-stage implementation ladder.

   Stages and item text come verbatim from the Mental Health Guidelines
   overview document. The `note` under each item summarises what that stage
   involves, drawn from the implementation protocol for that guideline.

   To edit: change the text below. Item `id` values are the storage keys —
   changing an id resets that item for anyone who has already saved progress,
   so add new ids rather than renaming old ones.
   ========================================================================== */
window.MHG_CHECKLIST = [
  {
    id: 'g1',
    number: '01',
    title: 'Safeguarding & Abuse Prevention',
    statement: 'Youth sport programs comply with best practices in safeguarding and abuse prevention.',
    href: 'guidelines/safeguarding.html',
    stages: {
      foundational: [{ id: 'g1s1',
        text: 'Background checks on all staff; re-screen every 2–3 years.',
        note: 'Criminal history (state and national), sex offender registry and reference checks, completed before anyone works with young people. Clear disqualification criteria defined.' }],
      developing: [{ id: 'g1s2',
        text: 'SafeSport or equivalent training on warning signs and disclosures.',
        note: 'Evidence-based abuse prevention training before first contact with youth, covering grooming behaviors, responding to disclosures and mandated reporting. Refreshed every 1–2 years and tracked.' }],
      established: [{ id: 'g1s3',
        text: 'Annual safeguarding audits across screening, training, and reporting.',
        note: 'A named safeguarding lead runs the audit each year and documents both strengths and gaps.', tools: [{ label: 'Safeguarding Audit Checklist', resource: 'safeguarding-audit' }] }],
      advanced: [{ id: 'g1s4',
        text: 'Detailed code of conduct for high-risk situations; signed annually.',
        note: 'Covers one-on-one interactions, electronic communication, travel and overnight stays, physical contact, locker rooms and photography — with consistent consequences.', tools: [{ label: 'Code of Conduct', resource: 'code-of-conduct' }] }],
      sustained: [{ id: 'g1s5',
        text: 'Bystander intervention protocols empower everyone to speak up early.',
        note: 'Staff, volunteers and age-appropriate athletes trained in the 5 D’s, pocket guides distributed, multiple reporting channels including anonymous, and explicit protection from retaliation.', tools: [{ label: 'Bystander Intervention Protocols', href: 'toolbox/bystander-intervention.html' }, { label: 'Pocket Reference Guide', href: 'toolbox/pocket-guide.html' }] }]
    }
  },
  {
    id: 'g2',
    number: '02',
    title: 'Alignment with Long-Term Athlete Development',
    statement: 'Youth sport programs are aligned to long-term athlete development models.',
    href: 'guidelines/ltad.html',
    stages: {
      foundational: [{ id: 'g2s1',
        text: 'One-page developmental charter signed by all stakeholders.',
        note: 'Prioritizes physical literacy, multi-sport participation and biological readiness over early specialization. Published where families can actually see it.', tools: [{ label: 'Developmental Charter', href: 'toolbox/developmental-charter.html' }, { label: 'Developmental Commitment Pledge', href: 'toolbox/commitment-pledge.html' }] }],
      developing: [{ id: 'g2s2',
        text: 'Training, travel, and competition aligned to age and stage.',
        note: 'Written weekly hour maximums and practice-to-game ratios by developmental stage, mandatory rest days, and restricted travel at early stages.' }],
      established: [{ id: 'g2s3',
        text: 'Parent orientations reframe success beyond the scoreboard.',
        note: 'A mandatory pre-season session on youth development and the risks of early specialization, plus regular updates highlighting effort and skill rather than scores.', tools: [{ label: 'Parent/Guardian Orientation Outline', href: 'toolbox/parent-orientation.html' }] }],
      advanced: [{ id: 'g2s4',
        text: 'Evaluation and incentives reward developmental coaching over wins.',
        note: 'Annual coach evaluation against developmental competencies, including anonymized athlete and family feedback, with escalating accountability for persistent misalignment.', tools: [{ label: 'End-of-Season Experience Survey', href: 'toolbox/season-survey.html' }] }],
      sustained: [{ id: 'g2s5',
        text: 'Athlete-centered program recognized as a community model.',
        note: 'Registration costs, facility accessibility and coaching practice audited against inclusion standards; aggregate outcomes reviewed by leadership each year.' }]
    }
  },
  {
    id: 'g3',
    number: '03',
    title: 'Coach Development for Safe Environments',
    statement: 'Programs require and support coaches to engage in ongoing development in methods that promote safe and supportive coaching.',
    href: 'guidelines/coach-development.html',
    stages: {
      foundational: [{ id: 'g3s1',
        text: 'Comprehensive training in need-supportive, mastery-oriented coaching.',
        note: 'Completed before the role begins or within the first season, covering support for autonomy, competence and relatedness, plus cultural competence and inclusive practice.' }],
      developing: [{ id: 'g3s2',
        text: 'Ongoing learning through communities of practice and peer support.',
        note: 'Regular coach learning communities, mentor pairings for newer coaches, a resource library, and refresher education every 2–3 years.' }],
      established: [{ id: 'g3s3',
        text: 'Team rituals and shared experiences build relatedness and belonging.',
        note: 'Regular rituals and shared experiences beyond competition, created with athlete input and designed so no one is excluded by identity, ability or cost.' }],
      advanced: [{ id: 'g3s4',
        text: 'Coaching philosophy embedded in evaluation, hiring, and retention.',
        note: 'Coaches assessed on the environment they create, not only on results, using anonymous athlete feedback about psychological safety.' }],
      sustained: [{ id: 'g3s5',
        text: 'Coaching culture is a defining organizational strength.',
        note: 'Need-supportive coaches are recognized and celebrated, behaviors that undermine well-being face clear accountability, and coach well-being is actively resourced.' }]
    }
  },
  {
    id: 'g4',
    number: '04',
    title: 'Mental Health Literacy Training',
    statement: 'Programs require and support their key actors to engage in mental health literacy training.',
    href: 'guidelines/mental-health-literacy.html',
    stages: {
      foundational: [{ id: 'g4s1',
        text: 'Mental health literacy training for all coaches; refresh every 2–3 years.',
        note: 'Completed before the role begins or within the first season, with completion tracked as part of coach credentialing.' }],
      developing: [{ id: 'g4s2',
        text: 'Designated mental health point person as organizational liaison.',
        note: 'Formally designated with a written role, protected time and a training budget. Contact details shared with coaches, staff, families and athletes each season.', tools: [{ label: 'Mental Health Point Person role', href: 'toolbox/point-person.html' }] }],
      established: [{ id: 'g4s3',
        text: 'Regular anonymous athlete well-being surveys.',
        note: 'Run mid-season and end-of-season, covering team climate, psychological safety, stress, coach support and access to resources.', tools: [{ label: 'End-of-Season Experience Survey', href: 'toolbox/season-survey.html' }] }],
      advanced: [{ id: 'g4s4',
        text: 'Conversation skills practiced quarterly through sport-specific scenarios.',
        note: 'Staff rehearse recognizing early warning signs and responding supportively without overstepping, using realistic non-emergency scenarios.' }],
      sustained: [{ id: 'g4s5',
        text: 'Literacy woven through culture, leadership, and family communication.',
        note: 'Survey findings turned into action plans and reported back to athletes, training extended to parents/guardians, and age-appropriate methods used for athletes under 13.' }]
    }
  },
  {
    id: 'g5',
    number: '05',
    title: 'Mental Health Crisis Response Training',
    statement: 'Programs require and support mental health crisis response training for organizational leaders who work directly with young people.',
    href: 'guidelines/crisis-training.html',
    stages: {
      foundational: [{ id: 'g5s1',
        text: 'Mental Health First Aid for leadership – the psychological CPR.',
        note: 'Organizational leadership certified before the role begins or within the first year, with the organization covering the cost and providing training during work hours.' }],
      developing: [{ id: 'g5s2',
        text: 'Clear triage vs. treatment boundary – staff stabilize and refer.',
        note: 'Every staff member understands their role is to recognize, respond and refer — not to counsel — and has written referral pathways in hand.', tools: [{ label: 'Triage vs. Therapy One-Pager', href: 'toolbox/triage-vs-therapy.html' }] }],
      established: [{ id: 'g5s3',
        text: 'Annual scenario-based drills, parallel to fire drills.',
        note: 'Realistic sport scenarios walked through step by step with roles assigned, each followed by a structured debrief.' }],
      advanced: [{ id: 'g5s4',
        text: 'Crisis response integrated across operations; frontline staff certified.',
        note: 'Certification extends beyond leadership to staff working directly with young people, and role boundaries are reviewed at annual training.' }],
      sustained: [{ id: 'g5s5',
        text: 'Organization is a model of crisis-ready culture across sport.',
        note: 'Local mental health professionals take part in scenario training, and staff have debriefing and consultation access after any incident.' }]
    }
  },
  {
    id: 'g6',
    number: '06',
    title: 'Locating Resources & Services',
    statement: 'Youth sport programs document where mental health resources and services can be located.',
    href: 'guidelines/resources.html',
    stages: {
      foundational: [{ id: 'g6s1',
        text: 'Identify local mental health resources ahead of any crisis.',
        note: 'A written list of crisis lines, local counselors, mobile crisis teams and hospitals with psychiatric emergency services — assembled before it is needed.', tools: [{ label: 'Our Local Mental Health Contacts', resource: 'local-resources' }] }],
      developing: [{ id: 'g6s2',
        text: 'Resources accessible via web pages and physical flyers.',
        note: 'Published on the program website with a persistent entry point, and included in family preseason packets and coach onboarding materials.', tools: [{ label: 'Website \u201cGet Help\u201d Widget', href: 'toolbox/get-help-widget.html' }] }],
      established: [{ id: 'g6s3',
        text: 'Discreet options added – locker-room QR codes, stall posters.',
        note: 'Information placed where a young person can read it without being observed.', tools: [{ label: 'Bathroom Stall Poster', href: 'toolbox/bathroom-poster.html' }] }],
      advanced: [{ id: 'g6s4',
        text: 'Formal provider relationships and clear referral protocols.',
        note: 'Named local providers with youth expertise, established before they are needed, and a warm-handoff process so referred athletes are not left to navigate alone.' }],
      sustained: [{ id: 'g6s5',
        text: 'Part of a continuously updated local network with warm handoffs.',
        note: 'Contact details reviewed at least annually, telehealth options included, and a protocol for identifying resources in locations the program travels to.' }]
    }
  },
  {
    id: 'g7',
    number: '07',
    title: 'Mental Health Emergency Action Planning',
    statement: 'Youth sport programs have an emergency action plan that includes mental health.',
    href: 'guidelines/emergency-action-plan.html',
    stages: {
      foundational: [{ id: 'g7s1',
        text: 'Crisis Response Team with defined roles; meets annually.',
        note: 'Athletic or program director, coaches, medical staff where available, a mental health professional and program leadership — each with a defined role.' }],
      developing: [{ id: 'g7s2',
        text: 'Written procedures for individual mental health emergencies.',
        note: 'Activation criteria, when to call 911, when to involve parents/guardians, and flowcharts or decision trees staff can use under stress.', tools: [{ label: 'Mental Health Emergency Action Plan', resource: 'mheap' }] }],
      established: [{ id: 'g7s3',
        text: 'Collective trauma procedures for community violence and disasters.',
        note: 'A coordinated, trauma-informed response covering athletes and staff alike, with the boundaries of the program’s response made explicit.' , tools: [{ label: 'Collective Trauma Response Protocol', resource: 'ctrp' }]}],
      advanced: [{ id: 'g7s4',
        text: 'De-escalation techniques and post-crisis support protocols practiced.',
        note: 'Staff rehearse de-escalation rather than only reading it, and post-crisis protocols cover the athlete, teammates and responding staff — including a structured re-entry process.', tools: [{ label: 'Post-Crisis Re-Entry Protocol', href: 'toolbox/post-crisis-reentry.html' }] }],
      sustained: [{ id: 'g7s5',
        text: 'Plan reviewed annually and refined after every event.',
        note: 'Contacts updated, lessons from drills and real incidents written back into the plan, and staff or leadership changes reflected.' }]
    }
  }
];
