/* ==========================================================================
   Code of Conduct for Staff and Volunteers — document structure.

   Block types:
     h        subheading
     p        paragraph; {{field_id}} becomes an inline input
     ul       bullet list; items may contain {{field_id}}
     choice   mutually exclusive options. On screen these are radios; in print
              only the chosen option prints, as plain prose — which is the whole
              point, since the paper version should read as settled policy
              rather than as a list of decisions nobody made.
     optional a clause included only if ticked
     sign     signature block
   ========================================================================== */
window.MHG_CONDUCT = {
  key: 'code-of-conduct',
  title: 'Code of Conduct for Staff and Volunteers',
  intro: 'Fill in the highlighted details and choose between the alternatives. ' +
         'Everything saves as you type. When you print, only the options you chose appear, ' +
         'so the result reads as finished policy.',
  sections: [
    {
      id: 'purpose', title: 'Purpose and scope',
      blocks: [
        { t: 'p', text: 'This Code of Conduct establishes clear behavioral expectations for all staff, coaches, volunteers and other adults who work with youth athletes in {{org_name}} programs. Its purpose is to protect the safety and well-being of young athletes while creating a positive, supportive environment for athletic development.' },
        { t: 'p', text: 'This Code applies to {{scope}} during all program activities, including practices, competitions, travel, team events and electronic communications.' }
      ]
    },
    {
      id: 'values', title: 'Core values and principles',
      blocks: [
        { t: 'p', text: 'All individuals covered by this Code are expected to uphold the following:' },
        { t: 'ul', items: [
          '<strong>Safety first.</strong> The physical and emotional safety of athletes is our top priority.',
          '<strong>Respect.</strong> Treat all individuals with dignity, regardless of age, gender, race, ethnicity, ability or skill level.',
          '<strong>Transparency.</strong> Conduct all activities in observable and accountable ways.',
          '<strong>Professional boundaries.</strong> Maintain appropriate adult–athlete relationships at all times.',
          '<strong>Accountability.</strong> Speak up when we observe concerning behavior, and take responsibility for our actions.'
        ]}
      ]
    },
    {
      id: 'oneonone', title: 'One-on-one interactions with athletes',
      blocks: [
        { t: 'principle', text: 'Private, unobserved interactions between adults and individual athletes create opportunities for abuse and should be minimized.' },
        { t: 'ul', items: [
          '<strong>Observable and interruptible.</strong> All one-on-one interactions must occur in spaces observable and interruptible by others.'
        ]},
        { t: 'choice', id: 'rule_of_three', label: 'Supervision rule', options: [
          { v: 'three', text: 'We follow the Rule of Three: another adult or athlete must be present for any one-on-one interaction.' },
          { v: 'observable', text: 'We allow one-on-one meetings in observable spaces with visibility, such as an office with windows or a door left open.' }
        ]},
        { t: 'p', text: 'Meetings with individual athletes must not occur behind closed doors without {{closed_door}}.' },
        { t: 'p', text: 'When providing individual coaching or feedback, ensure the interaction is visible to others and in an open area.' },
        { t: 'p', text: 'Exceptions: {{exceptions}}.' }
      ]
    },
    {
      id: 'contact', title: 'Physical contact and spotting',
      blocks: [
        { t: 'principle', text: 'Physical contact should be for the benefit of the athlete, age-appropriate, and conducted transparently.' },
        { t: 'h', text: 'Appropriate contact' },
        { t: 'ul', items: [
          'High-fives, fist bumps, side hugs with consent, pats on the shoulder or upper back, handshakes.',
          'Necessary spotting during skill instruction, with announcement and consent.',
          'Sport-specific contact necessary for safety, such as preventing injury.'
        ]},
        { t: 'h', text: 'Inappropriate contact' },
        { t: 'ul', items: [
          'Full-frontal hugs, hugging from behind, kissing, touching legs, buttocks, torso or chest.',
          'Any contact that makes an athlete uncomfortable, or that is for the adult’s benefit rather than the athlete’s.',
          'Massages or rubdowns, except by licensed medical or athletic training professionals in appropriate settings with the athlete’s consent.'
        ]},
        { t: 'h', text: 'Required practices' },
        { t: 'ul', items: [
          'Announce your intent before touching an athlete for instruction, and obtain verbal consent.',
          'Ensure instructional contact occurs where others can observe.',
          'Respect the athlete’s comfort level. If they appear uncomfortable or decline, use verbal instruction or demonstration instead.'
        ]}
      ]
    },
    {
      id: 'electronic', title: 'Electronic communication and social media',
      blocks: [
        { t: 'principle', text: 'All electronic communication with athletes must be professional, transparent, and include appropriate oversight.' },
        { t: 'p', text: 'Approved platforms: {{platforms}}, with administrator oversight.' },
        { t: 'choice', id: 'parent_copy', label: 'Parent/guardian inclusion', options: [
          { v: 'all', text: 'All electronic communication with athletes under 18 must copy a parent or guardian.' },
          { v: 'age', text: 'All electronic communication with athletes under the age set below must copy a parent or guardian.' },
          { v: 'platform', text: 'All communication takes place on team platforms with administrator visibility.' }
        ]},
        { t: 'p', text: 'Communication should occur between {{comm_hours}} unless it is an emergency.' },
        { t: 'choice', id: 'social_friending', label: 'Social media connections', options: [
          { v: 'none', text: 'Staff may not send or accept friend or follow requests to or from current athletes on personal accounts.' },
          { v: 'permission', text: 'Staff may connect with athletes on social media only with administrator notification and parent or guardian permission.' }
        ]},
        { t: 'choice', id: 'social_dm', label: 'Direct messaging', options: [
          { v: 'prohibited', text: 'Direct or private messaging between staff and individual athletes is prohibited.' },
          { v: 'logistics', text: 'Direct messaging is permitted only for logistical or scheduling purposes, with a parent or guardian copied.' }
        ]},
        { t: 'h', text: 'Prohibited content' },
        { t: 'ul', items: [
          'Sexual, romantic or otherwise inappropriate content or language.',
          'Requests for photos or videos of athletes in private settings.',
          'Communications that exclude parents or guardians, or that seek to keep interactions secret.',
          'Commentary on athletes’ physical appearance or development.'
        ]}
      ]
    },
    {
      id: 'photo', title: 'Photography, video recording and media',
      blocks: [
        { t: 'ul', items: [
          'Photo and video consent forms must be obtained from parents or guardians {{photo_consent}}.',
          'Photography and video are prohibited in locker rooms, restrooms, changing areas and sleeping quarters.',
          'All photos and videos of athletes must be for legitimate team or program purposes only.',
          'Images should focus on athletic activity, not close-ups of body parts or athletes in compromising positions.',
          'Staff may not request or solicit photos or videos from athletes via personal devices or social media.'
        ]}
      ]
    },
    {
      id: 'locker', title: 'Locker rooms and changing areas',
      blocks: [
        { t: 'principle', text: 'Athletes have a right to privacy while changing, and supervision must balance safety with respect for that privacy.' },
        { t: 'ul', items: [
          'Adults must announce their presence before entering locker rooms or changing areas.',
          'Supervision should be conducted from doorways or common areas, not where athletes are changing.',
          'Supervision approach: {{locker_supervision}}.',
          'Adults should never shower or change in the same locker room as athletes.',
          'Cell phones and cameras are prohibited in locker rooms and changing areas.',
          'If an athlete needs assistance in a locker room, {{locker_assist}}.'
        ]}
      ]
    },
    {
      id: 'travel', title: 'Travel and overnight stays',
      blocks: [
        { t: 'principle', text: 'Travel increases risk through extended time together and reduced oversight.' },
        { t: 'ul', items: [
          'Written parent or guardian consent is required for all travel, including destination, dates, supervision and emergency contacts.',
          'Background-checked chaperones must accompany all trips at a ratio of {{chaperone_ratio}}.',
          'Room assignments: {{room_assignments}}. Adults and athletes never share rooms.',
          'Curfews and supervision protocols are established and communicated to athletes and parents or guardians.',
          'Adults may not enter athlete rooms without {{room_entry}}.'
        ]},
        { t: 'choice', id: 'transportation', label: 'Transportation', options: [
          { v: 'never', text: 'Athletes may not ride alone in a vehicle with a single adult.' },
          { v: 'permission', text: 'One-on-one transportation is permitted only with advance parent or guardian notification and permission.' }
        ]}
      ]
    },
    {
      id: 'hazing', title: 'Hazing, bullying and harassment',
      blocks: [
        { t: 'p', text: 'The following are prohibited:' },
        { t: 'ul', items: [
          'Physical, verbal or emotional abuse, including yelling, name-calling, belittling or public humiliation.',
          'Hazing or initiation rituals involving degradation, physical harm or coercion.',
          'Discrimination or harassment based on race, gender, sexual orientation, religion, ability or any other protected characteristic.',
          'Retaliation against athletes who report concerns or refuse to participate in inappropriate activities.',
          'Punishments involving physical or emotional harm, denial of food or water, or excessive physical activity.'
        ]}
      ]
    },
    {
      id: 'substances', title: 'Alcohol, drugs and tobacco',
      blocks: [
        { t: 'ul', items: [
          'Use, possession or distribution of illegal drugs, alcohol or tobacco products during any team activity, or in the presence of athletes, is prohibited.',
          'Providing alcohol, drugs or tobacco products to athletes is prohibited.',
          'Being under the influence of alcohol or drugs while supervising or coaching athletes is prohibited.'
        ]},
        { t: 'optional', id: 'alcohol_clause', label: 'Include a clause permitting alcohol at adult-only events',
          text: 'Adult social events may include alcohol only when athletes are not present and designated sober supervision is in place.' }
      ]
    },
    {
      id: 'reporting', title: 'Reporting violations or concerns',
      blocks: [
        { t: 'ul', items: [
          'All staff and volunteers are required to report suspected abuse or violations of this Code immediately.',
          'Suspected child abuse must be reported to {{cps_contact}} as required by law.',
          'Code of Conduct violations should be reported to {{report_to}}.'
        ]},
        { t: 'h', text: 'Reporting channels' },
        { t: 'ul', items: [
          'In person: {{report_person}}',
          'By phone: {{report_phone}}',
          'By email: {{report_email}}',
          'Anonymously: {{report_anon}}'
        ]},
        { t: 'p', text: '<strong>Staff are protected from retaliation for reporting concerns in good faith</strong>, even where an investigation does not substantiate the allegation.' }
      ]
    },
    {
      id: 'consequences', title: 'Consequences for violations',
      blocks: [
        { t: 'p', text: 'Violations of this Code will result in disciplinary action, which may include:' },
        { t: 'ul', items: [
          'Verbal or written warning.',
          'Mandatory additional training.',
          'Suspension from activities.',
          'Removal from position.',
          'Permanent ban from the organization.',
          'Referral to law enforcement where appropriate.'
        ]},
        { t: 'p', text: 'The specific consequence depends on the nature and severity of the violation. Serious violations, including any form of abuse or sexual misconduct, will result in immediate removal and may be reported to law enforcement.' }
      ]
    },
    {
      id: 'ack', title: 'Acknowledgement and agreement', pageBreak: true,
      blocks: [
        { t: 'p', text: 'I acknowledge that I have read, understood and agree to comply with this Code of Conduct. I understand that violations may result in disciplinary action up to and including removal from my position. I understand my obligation to report suspected abuse and violations of this Code.' },
        { t: 'sign', rows: [
          ['Printed name', 'Position / role'],
          ['Signature', 'Date']
        ]},
        { t: 'note', text: 'This Code must be signed annually by every member of staff and every volunteer. Keep signed copies on file securely.' }
      ]
    }
  ],

  /* Inline fields, in the order they appear. */
  fields: {
    org_name:         { label: 'Organization name', placeholder: 'Riverside Youth Soccer Club', wide: true },
    scope:            { label: 'Who this Code covers', placeholder: 'all coaches, assistant coaches, volunteers, board members and administrators', wide: true },
    closed_door:      { label: 'Closed-door condition', placeholder: 'another adult present, or the door remaining open' },
    exceptions:       { label: 'Exceptions', placeholder: 'emergency medical situations' },
    platforms:        { label: 'Approved platforms', placeholder: 'TeamSnap, Remind, and program email' },
    comm_hours:       { label: 'Permitted contact hours', placeholder: '7:00 AM and 9:00 PM' },
    photo_consent:    { label: 'Consent frequency', placeholder: 'annually at registration' },
    locker_supervision:{ label: 'Locker room supervision', placeholder: 'same-gender supervision wherever possible' },
    locker_assist:    { label: 'If assistance is needed', placeholder: 'notify another adult before entering' },
    chaperone_ratio:  { label: 'Chaperone ratio', placeholder: 'one adult per eight athletes' },
    room_assignments: { label: 'Room assignments', placeholder: 'gender-specific and age-appropriate' },
    room_entry:       { label: 'Entering athlete rooms', placeholder: 'another adult present and the door remaining open' },
    cps_contact:      { label: 'Child protective services', placeholder: 'state child protective services and local law enforcement' },
    report_to:        { label: 'Report violations to', placeholder: 'the Safeguarding Lead', wide: true },
    report_person:    { label: 'In person', placeholder: 'name and location' },
    report_phone:     { label: 'Phone', placeholder: 'number' },
    report_email:     { label: 'Email', placeholder: 'address' },
    report_anon:      { label: 'Anonymous route', placeholder: 'online form or hotline, if available' }
  }
};
