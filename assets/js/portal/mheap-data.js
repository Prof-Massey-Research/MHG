/* ==========================================================================
   Mental Health Emergency Action Plan (MHEAP) — structure.

   Rebuilt from the implementation guide, pages 149–162. The plan is adapted
   from Lawrence, N. M., & Gunter, K. (2022), cited at the end.

   Two kinds of content live here, and the distinction is the whole design:

     fixed    the clinical content — when to activate, what each procedure
              requires, de-escalation do's and don'ts. Nobody should be
              editing these in a form; they are what the plan says.
     fields   the parts that are only true of one organization — who is on
              the team, which hospital, which state's retention law. A plan
              with these blank is not a plan, which is why the progress count
              only counts these.

   Block types: h, p, ul, note, table, sign. Prose carries {{field}} tokens.
   ========================================================================== */
window.MHG_MHEAP = {
  key: 'mheap',
  title: 'Mental Health Emergency Action Plan',
  intro: 'The clinical procedures are written for you. Fill in the parts only your program knows — ' +
         'who responds, which numbers to call, which state law applies — then print it, post it, and ' +
         'review it every year.',

  header: [
    { id: 'org_name',   label: 'Organization / program', wide: true },
    { id: 'address',    label: 'Address', wide: true },
    { id: 'contact',    label: 'Main contact' },
    { id: 'phone',      label: 'Phone number' },
    { id: 'created',    label: 'Date created', type: 'date' },
    { id: 'updated',    label: 'Last updated', type: 'date' }
  ],

  sections: [
    { n: 1, title: 'Crisis Response Team',
      blocks: [
        { t: 'p', text: 'Identify team members and their specific roles during a mental health emergency.' },
        { t: 'table', id: 'team',
          cols: ['Role', 'Name', 'Phone', 'Email', 'Role in a mental health emergency'],
          rows: ['Athletic Director / Program Director', 'Head coach(es)',
                 'Athletic trainer / medical staff', 'School counselor / mental health professional',
                 'Principal / administrator', 'Other'] }
      ] },

    { n: 2, title: 'Mental Health Emergency Situations',
      blocks: [
        { t: 'p', text: 'The following situations require immediate activation of this plan:' },
        { t: 'ul', items: [
          'Suicidal ideation (thoughts of suicide) or homicidal ideation (thoughts of harming others)',
          'Sexual assault (recent or disclosed)',
          'Highly agitated or threatening behavior',
          'Acute psychosis or paranoia (loss of contact with reality)',
          'Acute delirium or confused state',
          'Acute intoxication or drug overdose',
          'Uncharacteristically aggressive behavior',
          'Missing athlete, or unexplained absence with concern for safety'
        ] }
      ] },

    { n: 3, title: 'Emergency Contact Numbers',
      blocks: [
        { t: 'table', id: 'emerg', cols: ['Emergency service', 'Phone number'],
          rows: ['911 Emergency Services', '988 Suicide and Crisis Lifeline', 'Crisis Text Line',
                 'Local mental health crisis line', 'Local mobile crisis team',
                 'Local hospital with psychiatric ER', 'Campus / school security',
                 'Local police (non-emergency)', 'On-call mental health consultant'],
          prefill: { 0: '911', 1: 'Call or text 988', 2: 'Text HELP to 741741' } }
      ] },

    { n: 4, title: 'Emergency Response Procedures',
      blocks: [
        { t: 'h', text: 'Procedure A &mdash; Suicidal or homicidal ideation' },
        { t: 'note', text: 'If an athlete expresses thoughts of suicide or harm to others:' },
        { t: 'ul', items: [
          '<strong>Do not leave the athlete alone.</strong>',
          'Stay calm and listen without judgment.',
          'Take all statements seriously &mdash; do not minimise or dismiss concerns.',
          'Call 911 if the athlete has a plan or the means to harm themselves or others.',
          'Contact the Crisis Response Team member and mental health professional named in Section 1.',
          'Move the athlete to a private, safe location.',
          'Remove access to potential means of harm (sharp objects, medications).',
          'Contact the parent or guardian per Section 8, document the incident, and follow up after the crisis is resolved.'
        ] },

        { t: 'h', text: 'Procedure B &mdash; Sexual assault' },
        { t: 'note', text: 'If an athlete discloses recent or ongoing sexual assault:' },
        { t: 'ul', items: [
          'Believe the athlete and express support. Ensure immediate safety.',
          'Call 911 if the assault occurred within the past 72 hours or the athlete is in immediate danger.',
          'Contact the Athletic Director or administrator, the school counselor or mental health professional, and the local sexual assault crisis centre.',
          'Follow mandatory reporting requirements under local and state law.',
          'Preserve evidence if the assault was recent &mdash; do not shower or change clothes.',
          'Provide information about medical care and evidence collection.',
          'Connect the athlete to specialised sexual assault support services.',
          'Document the disclosure, limited to the factual information disclosed.'
        ] },

        { t: 'h', text: 'Procedure C &mdash; Highly agitated or threatening behavior' },
        { t: 'note', text: 'If an athlete is highly agitated, violent, or threatening:' },
        { t: 'ul', items: [
          'Prioritise the safety of all individuals. If the athlete poses immediate danger, call 911.',
          'Clear the area of other athletes and bystanders.',
          'Do not corner or trap the athlete. Maintain a safe distance and a calm demeanour.',
          'Use the de-escalation techniques in Section 6.',
          'Contact the Crisis Response Team member, and the mental health professional or mobile crisis team.',
          'Do not physically restrain unless trained and necessary for immediate safety.',
          'Document the incident including triggers, behaviors and interventions.'
        ] },

        { t: 'h', text: 'Procedure D &mdash; Acute psychosis, paranoia, or delirium' },
        { t: 'note', text: 'If an athlete loses contact with reality:' },
        { t: 'ul', items: [
          'Stay calm and speak slowly and clearly.',
          'Do not argue with delusions or hallucinations.',
          'Create a calm, low-stimulation environment.',
          'Call 911 for medical evaluation, and contact the Crisis Response Team member and the parent or guardian.',
          'Stay with the athlete until emergency services arrive.',
          'Provide emergency personnel with all relevant information.'
        ] },

        { t: 'h', text: 'Procedure E &mdash; Acute intoxication or drug overdose' },
        { t: 'note', text: 'If an athlete is intoxicated or experiencing an overdose:' },
        { t: 'ul', items: [
          'Call 911 immediately. Do not leave the athlete alone.',
          'If unconscious, place the athlete in the recovery position.',
          'If naloxone (Narcan) is available and an opioid overdose is suspected, administer per training.',
          'Gather information about substances used, if known. Monitor vital signs if trained.',
          'Contact the Athletic Director or administrator, and the parent or guardian.',
          'Document the incident.'
        ] },

        { t: 'h', text: 'Procedure F &mdash; Missing athlete or unexplained absence' },
        { t: 'note', text: 'If an athlete goes missing or there is concern for their safety:' },
        { t: 'ul', items: [
          'Immediately attempt to contact the athlete by phone or text.',
          'Contact parents or guardians to determine whether they know the athlete’s whereabouts.',
          'Check with teammates and friends. Search the facility and surrounding area.',
          'If the athlete recently expressed suicidal thoughts or high-risk behavior, call 911.',
          'Contact the Athletic Director or administrator, and law enforcement if there is reasonable concern for safety.',
          'Document the timeline and all contact attempts.'
        ] }
      ] },

    { n: 5, title: 'Community Resources',
      blocks: [
        { t: 'table', id: 'comm', cols: ['Resource type', 'Organization name', 'Phone / address'],
          rows: ['Hospital &mdash; psychiatric ER', 'Mobile crisis team', 'Community mental health center',
                 'Sexual assault crisis center', 'Substance abuse treatment',
                 'Eating disorder treatment', 'On-call licensed therapist'] }
      ] },

    { n: 6, title: 'De-Escalation Techniques',
      blocks: [
        { t: 'p', text: 'All staff should be trained in the following.' },
        { t: 'h', text: 'What to do' },
        { t: 'ul', items: [
          'Keep your voice calm and measured.',
          'Listen actively without interrupting.',
          'Express support and concern, and ask how you can help.',
          'Keep the stimulation level low &mdash; dim lights, reduce noise.',
          'Move slowly and deliberately. Be patient and give them space.',
          'Offer options instead of trying to take control.',
          'Gently announce actions before taking them, and ask permission before touching or approaching closely.',
          'Be mindful of cultural considerations in verbal and nonverbal communication &mdash; eye contact, hand gestures, tone of voice and proximity can carry very different meanings.'
        ] },
        { t: 'h', text: 'What not to do' },
        { t: 'ul', items: [
          'Overreact or raise your voice.',
          'Make judgmental comments.',
          'Argue or try to reason with them.',
          'Make them feel trapped or cornered.',
          'Maintain continuous direct eye contact.',
          'Touch them without permission.',
          'Make demands or give ultimatums.',
          'Make sudden movements.'
        ] }
      ] },

    { n: 7, title: 'Involuntary Retention Procedures',
      blocks: [
        { t: 'p', text: 'Where an athlete poses an imminent danger to themselves or others, involuntary retention (also called involuntary commitment or a psychiatric hold) may be necessary.' },
        { t: 'h', text: 'Our state and local law' },
        { t: 'p', text: 'Summary of applicable law &mdash; who may initiate, duration of the hold, required criteria: {{retention_law}}' },
        { t: 'ul', items: [
          'Contact 911 and request a mental health crisis evaluation.',
          'Provide specific information about the behaviors and statements indicating danger.',
          'Contact the mental health professional or mobile crisis team.',
          'Only trained crisis professionals or law enforcement may determine involuntary retention.',
          'Contact the parent or guardian immediately.'
        ] },
        { t: 'h', text: 'Mandated reporting' },
        { t: 'p', text: 'Under {{reporting_law}}, {{reporters}} are mandated reporters. This responsibility is independent of involuntary retention procedures. If at any point during a mental health crisis a staff member suspects an athlete is a victim of abuse or neglect, a report must be filed with the appropriate authorities within {{report_window}}.' }
      ] },

    { n: 8, title: 'Parent/Guardian Notification Policy',
      blocks: [
        { t: 'note', text: 'This section must comply with all applicable federal, state and local law on parental notification and student privacy.' },
        { t: 'p', text: 'Parents and guardians will be contacted in the following situations:' },
        { t: 'ul', items: [
          'Any situation requiring emergency medical or mental health intervention',
          'Suicidal or homicidal ideation',
          'Self-harm behaviors',
          'Sexual assault disclosure, after consulting the appropriate authorities',
          'Substance intoxication or overdose',
          'Acute psychosis or severe mental health crisis',
          'Missing athlete with safety concerns'
        ] },
        { t: 'h', text: 'Who is authorised to notify' },
        { t: 'p', text: 'Name: {{notifier_name}} &nbsp; Title: {{notifier_title}} &nbsp; Phone: {{notifier_phone}}' },
        { t: 'h', text: 'Communicating beyond the family' },
        { t: 'p', text: 'Notifying a parent or guardian is an obligation. Telling anyone else is a decision, and it is the family\u2019s to make. Before any information reaches other staff, other athletes, other families or the public, agree with the family what may be said. Absent that agreement, share only what is operationally necessary for safety.' },
        { t: 'h', text: 'Special considerations' },
        { t: 'p', text: 'If the crisis involves suspected child abuse or neglect, or if notifying a parent or guardian would place the athlete at further risk, staff must follow state mandated reporting protocols and contact {{cps_contact}} immediately.' },
        { t: 'p', text: 'Any further considerations &mdash; emancipated minors, athletes in foster care, court orders. Consult legal counsel: {{notify_notes}}' }
      ] },

    { n: 9, title: 'Post-Crisis Support and Follow-Up',
      blocks: [
        { t: 'h', text: 'For the athlete in crisis' },
        { t: 'ul', items: [
          'Connect to ongoing mental health care.',
          'Develop a return-to-play protocol in consultation with the mental health provider.',
          'Assign a staff member as primary point of contact for ongoing support, and schedule regular check-ins.',
          'Provide resources for family support.'
        ] },
        { t: 'h', text: 'For teammates and peers' },
        { t: 'note', text: 'What teammates are told is decided with the athlete and their family first, not afterwards. Agree what may be shared, with whom, and in what words before saying anything to the wider team \u2014 and where the crisis involved suicidal behavior, follow safe messaging: no method, no location, and crisis line numbers alongside whatever is said.' },
        { t: 'ul', items: [
          'Provide age-appropriate information about the situation, limited to what the athlete and their family have agreed may be shared.',
          'Offer group debriefing or a support session led by a mental health professional.',
          'Provide individual counseling resources for affected teammates.',
          'Reinforce confidentiality and respect for the athlete’s privacy.'
        ] },
        { t: 'h', text: 'For staff and coaches' },
        { t: 'ul', items: [
          'Debrief the incident with the crisis response team.',
          'Provide access to an Employee Assistance Program or counseling.',
          'Offer additional mental health first aid training if needed.',
          'Address any secondary trauma experienced by responders.'
        ] },
        { t: 'h', text: 'Documentation and review' },
        { t: 'ul', items: [
          'Complete an incident report within 24 hours.',
          'Review the effectiveness of the response.',
          'Identify lessons learned and plan improvements.',
          'Update this plan if needed.'
        ] }
      ] },

    { n: 10, title: 'Training Requirements and Plan Review',
      blocks: [
        { t: 'p', text: 'All coaches, staff and volunteers must complete the following training, some of which will be conducted by {{training_provider}}.' },
        { t: 'ul', items: [
          'Mental Health First Aid or equivalent (an eight-hour course is recommended)',
          'Recognition of warning signs of mental health crises',
          'De-escalation techniques',
          'MHEAP procedures and role-specific responsibilities',
          'Suicide prevention training, such as QPR or ASIST',
          'Privacy laws and mandatory reporting requirements'
        ] },
        { t: 'h', text: 'Schedule' },
        { t: 'p', text: 'Initial training takes place before the start of the season or on hire. Annual refresher: {{refresher_date}}. Practice drills and tabletop exercises: {{drill_frequency}}.' },
        { t: 'p', text: 'Annual plan review: {{review_date}}. The plan is also reviewed after any crisis event, and updated when personnel, resources or laws change. Responsible for this review: {{review_owner}}.' }
      ] },

    { n: 11, title: 'Acknowledgment and Approval', pageBreak: true,
      blocks: [
        { t: 'p', text: 'This Mental Health Emergency Action Plan has been reviewed and approved by:' },
        { t: 'sign', rows: [
          ['Athletic Director / Program Director', 'Date'],
          ['Principal / Administrator', 'Date'],
          ['School Counselor / Mental Health Professional', 'Date']
        ] },
        { t: 'h', text: 'Distribution' },
        { t: 'p', text: 'Copies of this plan must be distributed to all coaches and assistant coaches, athletic training staff, school administration, school counselors, school nurses, campus security, and volunteers working with athletes.' },
        { t: 'h', text: 'Accessibility' },
        { t: 'p', text: 'Posted in the coaches’ office and the athletic training room, included in the staff handbook, accessible electronically, with summary cards available for quick reference.' },
        { t: 'note', text: 'Adapted from Lawrence, N. M., &amp; Gunter, K. (2022). Considerations for developing a mental health emergency action plan for high school football programs and athletic departments. <em>HSS Journal, 19</em>(3), 373&ndash;380.' }
      ] }
  ],

  /* Printed small, laminated, carried. Two fields, everything else fixed. */
  card: {
    title: 'Mental Health Quick Reference Card',
    lead: 'If an athlete discloses a mental health crisis:',
    steps: [
      '<strong>Stay calm.</strong> You can handle this.',
      '<strong>Don’t leave them alone.</strong> Get another adult.',
      '<strong>Ask about suicide.</strong> It is okay to ask directly.',
      '<strong>Call for help.</strong> 911 if there is imminent danger, 988 for crisis support.',
      '<strong>If abuse is suspected</strong>, contact CPS or your safeguarding lead before parents.',
      '<strong>If abuse is not suspected, notify parents.</strong> They need to know immediately.',
      '<strong>Document everything</strong> once the athlete is safe. Use objective language &mdash; exactly what was seen and heard, in quotes, not your interpretation.',
      '<strong>Follow up.</strong> Check that they got professional help.'
    ],
    closing: 'You are not expected to solve the crisis. You are expected to recognise it, respond appropriately, and connect the athlete to professional help.',
    contacts: [
      { fixed: '911 &mdash; immediate danger' },
      { fixed: '988 &mdash; Suicide &amp; Crisis Lifeline (call or text)' },
      { id: 'card_point_person', label: 'Mental Health Point Person' },
      { id: 'card_crisis_line',  label: 'Local crisis line' }
    ]
  }
};
