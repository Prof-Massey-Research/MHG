/* ==========================================================================
   Safeguarding Audit Checklist — content.

   Extracted from the printable template. Item ids are the storage keys, so
   changing an id discards any answer already recorded against it. Add new ids
   rather than renaming old ones.
   ========================================================================== */
window.MHG_AUDIT = {
  key: 'safeguarding-audit',
  title: 'Safeguarding Audit Checklist',
  intro: 'Review each standard and mark where your organization stands. For anything ' +
         'not yet in place, record the action needed in the action plan at the end. ' +
         'Complete this audit annually, and again after any safeguarding incident.',
  options: [
    { value: 'in_place',     label: 'In place' },
    { value: 'in_progress',  label: 'In progress' },
    { value: 'not_in_place', label: 'Not in place' }
  ],
  fields: [
    { id: 'org_name',     label: 'Organization name' },
    { id: 'completed_by', label: 'Audit completed by' },
    { id: 'role',         label: 'Position / role' },
    { id: 'audit_date',   label: 'Date of audit', type: 'date' }
  ],
  signoff: [
    { id: 'approved_by',  label: 'Reviewed and approved by' },
    { id: 'approver_role', label: 'Position' },
    { id: 'approved_date', label: 'Date', type: 'date' },
    { id: 'next_audit',   label: 'Next scheduled audit', type: 'date' }
  ],
  sections: [
    {
      id: 's1',
      title: 'Section 1 · Governance and leadership',
      items: [
        { id: 's1q1', text: 'Organization has a designated safeguarding lead or coordinator' },
        { id: 's1q2', text: 'Safeguarding is included in the mission statement or strategic plan' },
        { id: 's1q3', text: 'Board or leadership team receives regular safeguarding updates' },
        { id: 's1q4', text: 'Written safeguarding policies exist and are reviewed annually' },
        { id: 's1q5', text: 'Policies are easily accessible to all staff, volunteers and parents/guardians' },
        { id: 's1q6', text: 'Adequate budget and resources are allocated for safeguarding' },
        { id: 's1q7', text: 'Insurance coverage includes safeguarding / abuse incidents' },
      ]
    },
    {
      id: 's2',
      title: 'Section 2 · Recruitment and screening',
      items: [
        { id: 's2q1', text: 'All staff and volunteers complete a formal application or registration process' },
        { id: 's2q2', text: 'Criminal background checks are conducted before anyone works with youth' },
        { id: 's2q3', text: 'Background checks include state and national criminal history searches' },
        { id: 's2q4', text: 'Sex offender registry checks are conducted for all staff and volunteers' },
        { id: 's2q5', text: 'Reference checks are completed and documented' },
        { id: 's2q6', text: 'Clear disqualification criteria exist based on background check results' },
        { id: 's2q7', text: 'Background checks are repeated every 2–3 years' },
        { id: 's2q8', text: 'Background check records are stored securely and confidentially' },
        { id: 's2q9', text: 'A process exists for reviewing and responding to concerning results' },
        { id: 's2q10', text: 'Driving records are checked for anyone who transports athletes' },
      ]
    },
    {
      id: 's3',
      title: 'Section 3 · Training and education',
      items: [
        { id: 's3q1', text: 'All staff and volunteers complete abuse prevention training before working with youth' },
        { id: 's3q2', text: 'Training is evidence-based (e.g., SafeSport, Stewards of Children)' },
        { id: 's3q3', text: 'Training covers recognizing signs and symptoms of abuse' },
        { id: 's3q4', text: 'Training covers grooming behaviors and boundary violations' },
        { id: 's3q5', text: 'Training covers responding appropriately to disclosures from youth' },
        { id: 's3q6', text: 'Training covers mandated reporting requirements and procedures' },
        { id: 's3q7', text: 'Training includes organization-specific policies and code of conduct' },
        { id: 's3q8', text: 'Refresher training is required every 1–2 years' },
        { id: 's3q9', text: 'Training completion is tracked and documented' },
        { id: 's3q10', text: 'Age-appropriate safeguarding education is provided to athletes' },
        { id: 's3q11', text: 'Parents/guardians receive information about policies and how to report concerns' },
        { id: 's3q12', text: 'Bystander intervention training is provided to staff and volunteers' },
      ]
    },
    {
      id: 's4',
      title: 'Section 4 · Code of conduct and behavior standards',
      items: [
        { id: 's4q1', text: 'A written code of conduct applies to all staff and volunteers' },
        { id: 's4q2', text: 'Code includes specific standards for one-on-one interactions' },
        { id: 's4q3', text: 'Code addresses electronic communication and social media use' },
        { id: 's4q4', text: 'Code includes protocols for travel and overnight stays' },
        { id: 's4q5', text: 'Code defines appropriate vs. inappropriate physical contact' },
        { id: 's4q6', text: 'Code addresses locker room and changing area supervision' },
        { id: 's4q7', text: 'Code includes guidelines for photography and video recording' },
        { id: 's4q8', text: 'Code prohibits gift-giving and special treatment of individual athletes' },
        { id: 's4q9', text: 'All staff and volunteers sign the code annually' },
        { id: 's4q10', text: 'Code is reviewed during onboarding and regular training' },
        { id: 's4q11', text: 'Violations result in clear, consistent consequences' },
        { id: 's4q12', text: 'Relevant portions are shared with parents/guardians and athletes' },
      ]
    },
    {
      id: 's5',
      title: 'Section 5 · Supervision and monitoring',
      items: [
        { id: 's5q1', text: 'Adequate staff-to-athlete supervision ratios are maintained at all times' },
        { id: 's5q2', text: 'One-on-one interactions occur in observable and interruptible spaces' },
        { id: 's5q3', text: 'Private meetings require visibility, or another adult present' },
        { id: 's5q4', text: 'Locker rooms and changing areas have monitoring protocols that respect privacy' },
        { id: 's5q5', text: 'Staff and volunteers are never alone with a single athlete in isolated areas' },
        { id: 's5q6', text: 'Coaching or instruction is visible to others wherever possible' },
        { id: 's5q7', text: 'Clear procedures exist for late pickups when an athlete would be left alone' },
      ]
    },
    {
      id: 's6',
      title: 'Section 6 · Travel and off-site activities',
      items: [
        { id: 's6q1', text: 'Written parent/guardian consent is required for all travel and off-site activity' },
        { id: 's6q2', text: 'Background-checked chaperones accompany athletes on all trips' },
        { id: 's6q3', text: 'Room assignments are gender-specific and age-appropriate' },
        { id: 's6q4', text: 'Non-familial adults and athletes never share rooms during overnight stays' },
        { id: 's6q5', text: 'Clear curfews and supervision protocols are established for overnight trips' },
        { id: 's6q6', text: 'Emergency contact information is available for all athletes during travel' },
        { id: 's6q7', text: 'Transportation protocols ensure athletes are not alone with a single adult' },
        { id: 's6q8', text: 'Local emergency services and hospitals are identified before travel' },
      ]
    },
    {
      id: 's7',
      title: 'Section 7 · Communication and social media',
      items: [
        { id: 's7q1', text: 'Electronic communication guidelines specify appropriate hours for contact' },
        { id: 's7q2', text: 'Parents/guardians are copied on, or have access to, coach–athlete communications for minors' },
        { id: 's7q3', text: 'Staff use organization-sponsored platforms with administrator oversight' },
        { id: 's7q4', text: 'A policy exists for social media friend/follow requests between staff and athletes' },
        { id: 's7q5', text: 'Direct messaging between staff and individual athletes is prohibited or requires parent/guardian inclusion' },
        { id: 's7q6', text: 'The organization monitors compliance with communication policies' },
      ]
    },
    {
      id: 's8',
      title: 'Section 8 · Physical environment and facility safety',
      items: [
        { id: 's8q1', text: 'Facilities are designed to minimize isolated, unobservable spaces' },
        { id: 's8q2', text: 'Offices and meeting rooms have windows or visibility from hallways' },
        { id: 's8q3', text: 'Restrooms and changing areas have appropriate signage and monitoring' },
        { id: 's8q4', text: 'Storage areas and equipment rooms are locked when not in supervised use' },
        { id: 's8q5', text: 'Facilities are regularly inspected for safety hazards' },
      ]
    },
    {
      id: 's9',
      title: 'Section 9 · Record keeping and documentation',
      items: [
        { id: 's9q1', text: 'Secure, confidential files are maintained for all staff and volunteers' },
        { id: 's9q2', text: 'Files include background check results, training completion and signed code of conduct' },
        { id: 's9q3', text: 'Safeguarding incidents and reports are documented and stored securely' },
        { id: 's9q4', text: 'Documentation complies with applicable privacy laws and regulations' },
        { id: 's9q5', text: 'Access to sensitive records is restricted to authorized personnel only' },
        { id: 's9q6', text: 'Records retention policies comply with legal requirements' },
        { id: 's9q7', text: 'A process exists for securely destroying outdated records' },
      ]
    },
    {
      id: 's10',
      title: 'Section 10 · Parent/guardian and athlete engagement',
      items: [
        { id: 's10q1', text: 'Parents/guardians receive safeguarding policy information at registration or orientation' },
        { id: 's10q2', text: 'Parents/guardians know how to report safeguarding concerns' },
        { id: 's10q3', text: 'A parent/guardian code of conduct addresses behavior toward athletes and staff' },
        { id: 's10q4', text: 'Parents/guardians are informed of staff–athlete communication policies' },
        { id: 's10q5', text: 'Parents/guardians have opportunities to give feedback on safeguarding practice' },
        { id: 's10q6', text: 'Athletes know how to report concerns and are encouraged to speak up' },
        { id: 's10q7', text: 'The organization creates a culture where athletes feel safe raising concerns' },
      ]
    },
    {
      id: 's11',
      title: 'Section 11 · Continuous improvement and review',
      items: [
        { id: 's11q1', text: 'Safeguarding policies and procedures are reviewed and updated at least annually' },
        { id: 's11q2', text: 'This comprehensive audit is conducted annually' },
        { id: 's11q3', text: 'Safeguarding incidents are reviewed to identify systemic improvements' },
        { id: 's11q4', text: 'The organization stays informed of emerging best practice and legal requirements' },
        { id: 's11q5', text: 'Staff and volunteers provide input on safeguarding policy improvements' },
        { id: 's11q6', text: 'Practices are benchmarked against peer organizations and standards' },
        { id: 's11q7', text: 'Safeguarding improvements are incorporated into strategic planning and budgeting' },
      ]
    },
  ]
};
