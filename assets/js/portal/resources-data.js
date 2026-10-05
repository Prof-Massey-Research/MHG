/* ==========================================================================
   Our Local Mental Health Contacts — structure.

   Guideline 06 asks programs to document where mental health resources can be
   found, before a crisis rather than during one. This is that list.

   It is deliberately a form a program fills in rather than a directory the site
   generates. A national registry can say who is licensed near a zip code; it
   cannot say who answers the phone, who takes this program's families'
   insurance, who sees twelve-year-olds, or who has capacity this month. Six
   vetted contacts a coordinator has actually called are worth more in a crisis
   than sixty generated ones, so the tool captures the calling, not the lookup.

   The national lines are fixed rows: they are the same everywhere, they do not
   go stale, and nobody should have to type 988 into a form.
   ========================================================================== */
window.MHG_RESOURCES = {
  key: 'local-resources',
  title: 'Our Local Mental Health Contacts',
  intro: 'Build the list once, with real phone numbers you have called. Keep it where people ' +
         'can reach it — the first-aid kit, the coaches’ room, the team binder. Review it ' +
         'every season; numbers and capacity change.',

  /* Fixed everywhere in the US; rendered as reference, not as inputs. */
  national: [
    { name: '988 Suicide & Crisis Lifeline', contact: 'Call or text 988',
      handles: 'Any mental health crisis, 24/7. Free and confidential.' },
    { name: 'Crisis Text Line', contact: 'Text HOME to 741741',
      handles: 'Crisis support by text, 24/7 — often easier for a young person than a call.' },
    { name: 'The Trevor Project', contact: '1-866-488-7386 · text START to 678-678',
      handles: 'Crisis support for LGBTQ+ young people, 24/7.' },
    { name: 'SAMHSA National Helpline', contact: '1-800-662-4357',
      handles: 'Treatment referral and information, 24/7. Also finds local services.' }
  ],

  /* Each group is a fixed set of slots, so every answer has a stable id. */
  groups: [
    { id: 'crisis', title: 'Local crisis response',
      note: 'Who comes out, or who to take an athlete to, when 988 is not enough on its own.',
      rows: 3,
      hint: ['Mobile crisis team', 'Crisis stabilization or walk-in centre', 'Nearest ER with pediatric psychiatric capability'] },

    { id: 'clinical', title: 'Clinical providers who see young people',
      note: 'Only list providers someone has actually contacted. Record what they take and how long the wait is — that is the part families need.',
      rows: 4,
      hint: ['Therapist / counsellor', 'Child & adolescent psychiatrist', 'Practice that takes our families’ plans', 'Sliding-scale or low-cost option'] },

    { id: 'community', title: 'School and community',
      note: 'The people already connected to these young people.',
      rows: 3,
      hint: ['School counsellor or psychologist', 'District mental health liaison', 'Community mental health centre'] },

    { id: 'internal', title: 'Inside our program',
      note: 'Who in this organization holds these roles, so nobody has to ask in a crisis.',
      rows: 2,
      hint: ['Mental Health Point Person', 'Safeguarding lead'] }
  ],

  /* Columns for every editable row. */
  cols: [
    { id: 'name',    label: 'Name / organization', wide: true },
    { id: 'contact', label: 'Phone or contact' },
    { id: 'handles', label: 'What they handle' },
    { id: 'notes',   label: 'Notes — insurance, ages, wait time' }
  ],

  header: [
    { id: 'org_name',   label: 'Organization' },
    { id: 'maintainer', label: 'Who maintains this list' },
    { id: 'reviewed',   label: 'Last reviewed', type: 'date' },
    { id: 'next_review', label: 'Next review due', type: 'date' }
  ]
};
