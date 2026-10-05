/* ==========================================================================
   Collective Trauma Response Protocol — structure.

   Rebuilt from the implementation guide, pages 163–173.

   Same split as the MHEAP: the response itself is fixed text, and the only
   editable parts are the ones that are true of a single organization — who
   holds each crisis role, where the team gathers, which local services to
   name in a letter to families. A protocol whose phases could be edited in a
   form would stop being a protocol.

   Block types match mheap-data.js (h, p, ul, note, table, sign) so both
   documents render, print and export through the same code.
   ========================================================================== */
window.MHG_CTRP = {
  key: 'ctrp',
  title: 'Collective Trauma Response Protocol',
  intro: 'For events that hit a whole team or community rather than one athlete. The phases and ' +
         'principles are written for you; fill in who holds each role, where you gather, and which ' +
         'local services you would name in a letter to families.',

  header: [
    { id: 'org_name',    label: 'Organization / program', wide: true },
    { id: 'owner',       label: 'Protocol owner' },
    { id: 'command',     label: 'Command centre / meeting location' },
    { id: 'reviewed',    label: 'Last reviewed', type: 'date' },
    { id: 'next_review', label: 'Next review due', type: 'date' }
  ],

  sections: [
    { n: 1, title: 'Purpose',
      blocks: [
        { t: 'p', text: 'This protocol provides a framework for responding to collective traumatic events that affect multiple team members, families, or the broader community. Collective trauma requires a coordinated, trauma-informed response that recognises both individual and collective impact while promoting collective healing and resilience.' },
        { t: 'h', text: 'Events covered' },
        { t: 'ul', items: [
          'Death of a team member, coach, or community figure',
          'Natural disasters &mdash; hurricanes, floods, earthquakes, wildfires',
          'Community violence or tragedy',
          'School-based traumatic events',
          'Acts of terrorism or mass violence',
          'Public health emergencies'
        ] },
        { t: 'h', text: 'Core principles' },
        { t: 'ul', items: [
          'Promote safety and stabilisation',
          'Foster connectedness and community support',
          'Provide hope and meaning',
          'Honour cultural and community practices',
          'Balance individual and collective needs'
        ] }
      ] },

    { n: 2, title: 'Crisis Response Team',
      blocks: [
        { t: 'p', text: 'Name the people who hold each role before you need them.' },
        { t: 'table', id: 'team', cols: ['Role', 'Responsibilities', 'Name', 'Phone'],
          fixedCols: { 1: [
            'Coordinate overall response, make key decisions, liaise with leadership',
            'Manage internal and external communications, draft messages, media liaison',
            'Primary contact for affected families, coordinate family support',
            'Coordinate support services for athletes, identify high-risk individuals',
            'Manage facility, schedule adjustments, coordinate external resources',
            'Record all actions taken, maintain the timeline, track communications'
          ] },
          rows: ['Team Leader', 'Communications Lead', 'Family Liaison',
                 'Student Support Coordinator', 'Logistics Coordinator', 'Documentation Lead'] }
      ] },

    { n: 3, title: 'Phase 1 — Immediate Response (first 24–72 hours)',
      blocks: [
        { t: 'note', text: 'Goals: ensure safety, verify facts, activate the crisis team, and begin initial communication.' },
        { t: 'h', text: 'Step 1 &mdash; Activate the crisis response team' },
        { t: 'ul', items: [
          'Contact crisis team members immediately.',
          'Schedule an emergency team meeting within two to four hours.',
          'Assign roles and responsibilities.',
          'Establish the command centre or meeting location.'
        ] },
        { t: 'h', text: 'Step 2 &mdash; Gather and verify facts' },
        { t: 'ul', items: [
          'Obtain accurate information from reliable sources.',
          'Contact the affected family first, and agree with them what may be disclosed, to whom, and in what words. Their decision governs every communication that follows.',
          'Verify details with school administration, law enforcement or other authorities.',
          'Determine what information can and should be shared.',
          'Document the source of information and the timestamp.'
        ] },
        { t: 'note', text: '<strong>Critical:</strong> do not share unverified information and do not speculate about causes. Where the event is a death by suicide, the cause of death is the family\u2019s to disclose, not the program\u2019s \u2014 do not name it in any communication unless the family has explicitly agreed to that wording.' },
        { t: 'h', text: 'Step 3 &mdash; Initiate communications, in this order' },
        { t: 'note', text: '<strong>Before anything goes out.</strong> Nothing is sent to staff, athletes, families or the public until the affected family has been consulted and has agreed what may be shared. This applies to the fact of a death, its cause, the person\u2019s name, and any detail that could identify them. If the family cannot be reached, or has not decided, say only that an event has occurred and that more will follow \u2014 and say nothing about cause.' },
        { t: 'ul', items: [
          '<strong>Staff and coaches.</strong> Meet with all staff before communicating with athletes or families. Provide facts, outline support resources, clarify roles, answer questions.',
          '<strong>Athletes.</strong> Gather the team as soon as possible after the staff meeting. Communicate in person where possible. Be honest, factual and age-appropriate, and allow space for questions and reactions.',
          '<strong>Families.</strong> Send written communication within 24 hours, including facts, support resources, what the program is doing, and contact information.',
          '<strong>Broader community.</strong> Issue a public statement if the event is widely known, coordinated with the school or organization communications office.'
        ] },
        { t: 'h', text: 'Communication guidelines' },
        { t: 'ul', items: [
          'Be factual and avoid speculation. Use clear, simple language.',
          'Acknowledge emotions and normalise trauma-related reactions.',
          'Provide specific information about the support available, and include crisis hotline numbers.',
          'Avoid graphic details. Respect privacy and cultural practices.'
        ] },
        { t: 'h', text: 'Step 4 &mdash; Assess immediate safety and needs' },
        { t: 'ul', items: [
          'Ensure the physical safety of facilities and activities.',
          'Identify athletes at highest risk &mdash; close friends, witnesses, those with prior trauma.',
          'Determine whether practices or games should be cancelled, postponed or modified.',
          'Assess staff capacity and the need for additional support.',
          'Connect with external mental health resources.'
        ] }
      ] },

    { n: 4, title: 'Phase 2 — Short-Term Response (days 3–30)',
      blocks: [
        { t: 'note', text: 'Goals: provide ongoing support, facilitate collective processing, and restore routine while allowing flexibility.' },
        { t: 'h', text: 'Psychological First Aid, adapted for sport' },
        { t: 'ul', items: [
          '<strong>Safety.</strong> Ensure physical and emotional safety, create predictable structure and routines, and communicate clearly what safety measures have been taken.',
          '<strong>Calming.</strong> Teach breathing and grounding techniques, provide quiet spaces for athletes who need breaks, model a calm steady presence, and reduce stimulation.',
          '<strong>Connectedness.</strong> Facilitate peer support and team bonding, create shared experience, encourage family involvement, and connect athletes to broader support networks.',
          '<strong>Self-efficacy.</strong> Provide opportunities to take helpful action, teach coping strategies, emphasise what is within their control, and build on existing strengths.',
          '<strong>Hope.</strong> Acknowledge difficulty while emphasising resilience, share stories of recovery, keep a forward-looking perspective, and celebrate small progress.'
        ] },
        { t: 'h', text: 'Structured support options' },
        { t: 'ul', items: [
          '<strong>Drop-in support room.</strong> A quiet space with a counselor or trusted adult that athletes can use during practice if overwhelmed.',
          '<strong>Team check-ins.</strong> Brief structured conversations at the start or end of practice.',
          '<strong>Small group sessions.</strong> Process groups led by mental health professionals for the most affected athletes.',
          '<strong>Individual counseling.</strong> Referrals for one-to-one support as needed.',
          '<strong>Family support sessions.</strong> Information and resources for parents and caregivers.'
        ] },
        { t: 'h', text: 'Healing activities' },
        { t: 'ul', items: [
          'Memory or tribute activities appropriate to the event',
          'Service projects or fundraising for relevant causes',
          'Team rituals &mdash; a moment of silence, a special warm-up',
          'Creative expression through art, writing or music',
          'Physical activity that promotes regulation, such as walking together'
        ] },
        { t: 'h', text: 'Modifying sport activities during the acute period' },
        { t: 'ul', items: [
          'Reduce the intensity and competitiveness of practices.',
          'Focus on cooperative rather than competitive activities.',
          'Shorten practice duration as needed, and allow athletes to sit out or leave early.',
          'Postpone competitions if appropriate, and reduce pressure around performance.',
          'Emphasise being together over achievement.'
        ] },
        { t: 'h', text: 'Ongoing communication with families' },
        { t: 'ul', items: [
          'Weekly updates during the first month',
          'Information about trauma-related reactions in young people',
          'Resources for supporting children at home',
          'Invitations to family support sessions, and updates on memorial plans',
          'Contact information for questions or concerns'
        ] }
      ] },

    { n: 5, title: 'Phase 3 — Medium-Term Recovery (1–6 months)',
      blocks: [
        { t: 'note', text: 'Goals: transition back to routine while maintaining support, monitor for delayed reactions, and build community resilience.' },
        { t: 'h', text: 'Gradual return to normal operations' },
        { t: 'ul', items: [
          'Gradually restore full practice intensity and competition.',
          'Maintain check-in routines but reduce their frequency.',
          'Continue to allow flexibility for athletes who are struggling.',
          'Recognise that trauma is non-linear &mdash; ups and downs are normal.'
        ] },
        { t: 'h', text: 'Continue monitoring for' },
        { t: 'ul', items: [
          'Delayed trauma-related reactions', 'Academic decline',
          'Social withdrawal or isolation', 'Changes in athletic performance',
          'Substance use or risk-taking behaviors', 'Anniversary reactions'
        ] },
        { t: 'h', text: 'Anticipating trigger events' },
        { t: 'p', text: 'Expect intensified reactions around birthdays, holidays and the anniversary of the event; the first games without the person; season milestones such as playoffs and championships; senior night, graduation and end-of-season ceremonies; and media coverage of similar events elsewhere. Reach out proactively before these dates with additional support.' }
      ] },

    { n: 6, title: 'Supporting the Team Through Collective Grief',
      blocks: [
        { t: 'p', text: 'What a team carries after a collective event is grief, and often a loss of the sense that their environment is safe and predictable. Recovery is not a performance the team owes anyone. The aim of this section is to make room for that, not to hurry people to a lesson.' },
        { t: 'note', text: 'Coping varies, and the variation is normal. Some athletes will want to talk, some will want the ordinary structure of practice and nothing else, some will appear unaffected for weeks and then not be. None of these is the right or wrong response, and none of them should be read as a measure of how much someone cared.' },

        { t: 'h', text: 'Acknowledge what happened, plainly' },
        { t: 'p', text: 'Ignoring or minimising the event leaves people to carry it alone. Name what happened in clear language rather than euphemism, within whatever the affected family has agreed may be said. Offer structured, voluntary sessions whose only purpose is to hear people &mdash; not to solve anything, and not to require anyone to speak.' },

        { t: 'h', text: 'Restore a sense of safety and predictability' },
        { t: 'p', text: 'A collective event often disturbs an athlete\u2019s sense that their world is stable. Keep routines where you can, say clearly what will happen next and when, and follow through on it. Predictability does more for a grieving team than encouragement does.' },

        { t: 'h', text: 'Recognise care without turning it into a performance' },
        { t: 'p', text: 'Notice and thank the people who checked on others, or who quietly held things together. Do this without framing the period as a test the team passed, and without implying that those who needed more support gave less. Grief is not a contest, and recognition that sounds like ranking will land badly.' },

        { t: 'h', text: 'Let people find their own meaning, or none' },
        { t: 'p', text: 'There is a real difference between finding meaning and being handed one. Avoid the language of silver linings, of adversity making people stronger, of what does not kill you. Some people will find something they want to keep from this; others will not, and that has to be equally acceptable. Where meaning does emerge, let it come from them and in their own time.' },

        { t: 'h', text: 'Hold the history without letting it define the team' },
        { t: 'p', text: 'Over time this becomes part of the team\u2019s story rather than the whole of it. Tell newcomers gently and accurately. Keep any practice that genuinely helped people, and let go of the ones adopted in the acute period that no longer serve anyone.' }
      ] },

    { n: 7, title: 'Phase 4 — Long-Term Integration (6+ months)',
      blocks: [
        { t: 'note', text: 'Goals: integrate the experience into team history, ensure appropriate commemoration, maintain awareness.' },
        { t: 'h', text: 'Commemoration guidelines' },
        { t: 'ul', items: [
          'Obtain family permission for any memorial.',
          'Consider cultural and religious practices.',
          'Ensure memorials do not inadvertently glorify suicide or risky behavior.',
          'Balance honouring memory with moving forward.',
          'Consider permanence &mdash; what works now may not work in five or ten years.'
        ] },
        { t: 'h', text: 'Appropriate memorial options' },
        { t: 'ul', items: [
          'A scholarship or award in the person’s name',
          'A donation to a relevant charity or cause',
          'A service project reflecting the person’s values',
          'A memorial game or event, if appropriate',
          'A plaque or dedicated space, after careful consideration',
          'A team tradition or ritual that honours the memory'
        ] },
        { t: 'h', text: 'Generally avoid' },
        { t: 'ul', items: [
          'Permanent physical memorials on campus or at the facility',
          'Retiring jersey numbers permanently',
          'Large public gatherings that could be triggering',
          'Social media campaigns that could spread contagion'
        ] },
        { t: 'h', text: 'Staff support and debriefing' },
        { t: 'ul', items: [
          'Regular staff debriefing sessions',
          'Access to Employee Assistance Programs or counseling',
          'Acknowledgment of vicarious trauma',
          'Training on self-care and burnout prevention',
          'Recognition of staff efforts in supporting the community'
        ] }
      ] },

    { n: 8, title: 'Special Considerations by Event Type',
      blocks: [
        { t: 'h', text: 'Death of a team member, coach or community figure' },
        { t: 'ul', items: [
          'Obtain family permission before sharing information.',
          'If the death was by suicide: the family decides whether cause of death is shared at all. Follow safe messaging \u2014 omit method and location, avoid glorification, emphasise that help is available, and monitor for contagion.',
          'Coordinate with the school or organization if the person had multiple affiliations.',
          'Support team members who were closest to the person, and plan for funeral or memorial attendance.'
        ] },
        { t: 'h', text: 'Natural disasters' },
        { t: 'ul', items: [
          'Assess which families and athletes were directly impacted, and address basic needs first.',
          'Recognise ongoing stress from displacement, loss and rebuilding.',
          'Sport can provide normalcy and community during recovery.',
          'Coordinate with broader community relief efforts, and allow displaced athletes to maintain team connection.'
        ] },
        { t: 'h', text: 'Community violence or mass trauma' },
        { t: 'ul', items: [
          'Coordinate with law enforcement and community leaders.',
          'Address safety concerns directly and honestly.',
          'Be aware of media attention and protect athletes’ privacy.',
          'Recognise the potential for community division, and affirm the team as a safe space for all members.',
          'Consider the impact on athletes from targeted communities.'
        ] },
        { t: 'h', text: 'School-based traumatic events' },
        { t: 'ul', items: [
          'Coordinate closely with school administration and counselors, and follow the school’s crisis protocol.',
          'Recognise that athletes may receive support at school and need consistency.',
          'Sport can be a refuge or an additional stressor depending on circumstances.',
          'Ensure sport staff are informed of the school’s approach.'
        ] }
      ] },

    { n: 9, title: 'Communication Templates',
      blocks: [
        { t: 'note', text: '<strong>Do not send either template until the family has read and agreed the wording.</strong> These are drafts to take to that conversation, not messages to issue from it. Where a death was by suicide, follow safe messaging guidance: state that a death occurred, omit method and location, avoid detail that could prompt identification with the person, and include crisis line numbers in the same message.' },
        { t: 'h', text: 'Template 1 &mdash; Initial staff notification' },
        { t: 'p', text: 'Dear Staff, I am writing to inform you of a tragic event that will affect our team community. [Brief factual statement about what happened, limited to what the family has agreed may be shared.] We will meet today at {{staff_meeting_time}} at {{staff_meeting_place}} to discuss how we will support our athletes and each other through this difficult time.' },
        { t: 'p', text: 'Please do not discuss this with athletes or families until after our meeting; we need to coordinate our response and messaging. If you need immediate support, please contact {{staff_support_contact}}.' },
        { t: 'h', text: 'Template 2 &mdash; Family notification letter' },
        { t: 'p', text: 'Dear Families, It is with great sadness that I share [brief factual description of the event, in the words the family has agreed]. Our entire team community is grieving and we are committed to supporting our athletes and families during this difficult time.' },
        { t: 'p', text: '<strong>What we are doing.</strong> Mental health counselors will be available at practice {{counselor_times}}. We are modifying practice schedules to allow time for processing and support. All coaches and staff are prepared to recognise signs of distress. We are coordinating with {{coordinating_org}} to provide comprehensive support.' },
        { t: 'p', text: '<strong>How you can help.</strong> Talk with your child about the event using age-appropriate language. Normalise a wide range of trauma-related reactions. Monitor for changes in behavior, sleep or eating. Reach out to us if you have concerns.' },
        { t: 'p', text: '<strong>Resources.</strong> 988 Suicide &amp; Crisis Lifeline &mdash; call or text 988. Crisis Text Line &mdash; text HELP to 741741. Local: {{local_resources}}.' },
        { t: 'p', text: 'We will continue to update you as our support plans develop. Please contact {{letter_contact}} with any questions or concerns.' }
      ] },

    { n: 10, title: 'Protocol Evaluation and Revision',
      blocks: [
        { t: 'p', text: 'After the acute phase, conduct a review.' },
        { t: 'ul', items: [
          'What worked well in the response?',
          'What gaps or challenges were identified?',
          'What resources were most helpful?',
          'What updates to the protocol are needed?',
          'What training would better prepare staff for future events?'
        ] },
        { t: 'note', text: 'This protocol should be reviewed annually and updated based on lessons learned and best practice in trauma response.' }
      ] },

    { n: 11, title: 'Resources',
      blocks: [
        { t: 'h', text: 'Evidence-based frameworks' },
        { t: 'ul', items: [
          'Psychological First Aid Field Operations Guide &mdash; National Child Traumatic Stress Network, nctsn.org',
          'Skills for Psychological Recovery &mdash; NCTSN',
          'After a Suicide: A Toolkit for Schools (2nd ed.) &mdash; American Foundation for Suicide Prevention and SPRC'
        ] },
        { t: 'h', text: 'School crisis response' },
        { t: 'ul', items: [
          'National Association of School Psychologists &mdash; nasponline.org',
          'National Center for School Crisis and Bereavement &mdash; schoolcrisiscenter.org'
        ] }
      ] }
  ]
};
