/* =========================================================================
   Policy tracker data — youth-sport legislation by state.

   Source: Youth Sports and Physical Activity Legislation Tracker, The Sports
   Institute, University of Washington (2025), with Susan Crown Exchange and
   LiFEsports at The Ohio State University.
   https://thesportsinstitute.com/youth-sports-and-physical-activity-legislation-tracker/

   Topics pulled: Mental Health, Abuse, School Sports Coaching, Youth Sports
   Coaching. Bills the source marks "failed" are omitted. Where one bill is
   tagged under several topics it appears once, with the topics combined.

   status  — reflects MENTAL HEALTH legislation only, so the map answers the
             question the page asks. Related protections still appear in the
             panel under `related`.
     "enacted"    a coach mental health training law is in force
     "introduced" a mental health bill has been introduced, not yet law
     "baseline"   no mental-health-specific law tracked

   Last pulled from the source: see LAST_SYNCED below.
   ========================================================================= */
window.POLICY_DATA = {
  AK: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "HB 44 / 47.17.022", stage: "Passed · 2015", topic: "Safeguarding & abuse · School sport coaching", summary: "Requires state and school district employees including volunteer coaches to receive child abuse and neglect reporting training. New employees must be trained within 45 days; in-service refresher training must be provided periodically and curriculum filed with the Council on Domestic Violence.", link: "https://legiscan.com/AK/bill/HB44/2015" },
      { name: "HB 15 / 14.30.142", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires school districts to develop concussion awareness programs, remove student athletes suspected of concussion from play, and prohibit return without written clearance from a qualified health professional, ensuring student safety in interscholastic sports.", link: "https://legiscan.com/AK/bill/HB15/2011" }
    ]
  },
  AL: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "Ala. Code 38-13-3, 38-13-4", stage: "Passed · 2000", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires employers whose volunteers provide 'care' to children in a 'caretaker setting' (including recreation) to obtain criminal history background checks; mandates written consent and a disclosure statement from volunteers/employees and retention of records.", link: "https://law.justia.com/codes/alabama/title-38/chapter-13/section-38-13-3/" },
      { name: "HB 9 / 22-11F-3", stage: "Passed · 2018", topic: "School sport coaching · Youth sport coaching", summary: "Mandates that volunteer coaches of youth under age 14 in high-risk sports complete an annual injury prevention course covering topics like concussion, heat illness, and cardiac arrest. Coaches who complete training and follow the protocols receive civil liability protection for injuries occurring during play.", link: "https://legiscan.com/AL/bill/HB9/2018" },
      { name: "HB 108 / 22-11E-2", stage: "Passed · 2011", topic: "School sport coaching · Youth sport coaching", summary: "Requires schools and youth sports organizations to provide annual concussion education to athletes and parents and mandates coach training in concussion recognition and response. Athletes suspected of a concussion must be immediately removed from play and may only return with written medical clearance.", link: "https://legiscan.com/AL/bill/HB308/2012" },
      { name: "Act 2006-605 / 6-5-344", stage: "Passed · 2014", topic: "Youth sport coaching", summary: "Provides civil liability immunity to volunteer coaches, managers, or officials in nonprofit youth sports unless they engage in willful misconduct, gross negligence, or violate safety requirements (e.g., lack of training or unsupervised activities). This law encourages volunteerism while promoting basic safety standards.", link: "https://arc-sos.state.al.us/ucp/B06123AA.AAK.pdf" }
    ]
  },
  AR: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "Act 642 (SB 421)", stage: "Passed · 2023", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires all coaches and athletics personnel involved in high-risk youth sports for children aged 14 and under to complete a free, state-approved injury mitigation course within 30 days of starting and annually thereafter. The course covers emergency preparedness, concussion and heat-related injury awareness, equipment safety, and cardiac risks. In addition, all coaches must undergo background checks, including fingerprinting, with failure to comply resulting in potential license revocation. Certain licensed professionals and endorsed teachers are exempt, and those who complete the course and follow its guidelines are granted liability protection.", link: "https://arkleg.state.ar.us/Home/FTPDocument?path=%2FACTS%2F2023R%2FPublic%2FACT642.pdf" },
      { name: "SB 421 / 6-18-721", stage: "Passed · 2023", topic: "School sport coaching", summary: "Requires coaches of youth (under 14) in high-risk sports to complete annual injury prevention training, covering concussions, heat illness, and cardiac arrest. Provides liability protection to coaches who follow the mandated safety protocols and training requirements.", link: "https://legiscan.com/AR/bill/SB421/2023" }
    ]
  },
  CA: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "AB 506", stage: "Passed · 2021", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires administrators, employees, and regular volunteers (18+) of youth service organizations including youth sports to undergo background checks, complete mandated reporter training, and adopt policies such as two-adult rule to prevent abuse.", link: "https://legiscan.com/CA/text/AB506/id/2433373" },
      { name: "Bus. & Prof. Code 18900 (2019)", stage: "Passed · 2019", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires community youth athletic programs to provide written notice (e.g., on website) of their background-check policies for hired/volunteer coaches, including whether checks include state and federal records and subsequent arrest notifications.", link: "http://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=BPC&division=8.&title=&part=&chapter=2.7.&article=" },
      { name: "AB 245 / 35179.1", stage: "Passed · 2023", topic: "School sport coaching", summary: "Revises the High School Coaching Education & Training Program to require, by July-1, 2024, coach training in recognizing and responding to concussions, heat illness, and sudden cardiac arrest (including CPR and AED use), and mandates regular rehearsal of emergency action procedures.", link: "https://legiscan.com/CA/bill/AB245/2023" },
      { name: "AB 2007 / 124235", stage: "Passed · 2015", topic: "School sport coaching · Youth sport coaching", summary: "Requires youth sports organizations to provide annual concussion education to athletes and parents, ensure coaches complete concussion training, and remove any athlete suspected of a concussion from play until cleared by a licensed healthcare provider and a graduated return-to-play protocol is followed.", link: "https://legiscan.com/CA/bill/AB2007/2015" },
      { name: "AB 1 / 124241", stage: "Passed · 2018", topic: "Youth sport coaching", summary: "Regulates youth tackle football by limiting full-contact practices, requiring annual coach training in safety protocols, mandating 10 hours of non-contact training before contact, and ensuring medical personnel are present at games. It aims to reduce head injuries and improve overall player safety.", link: "https://legiscan.com/CA/bill/AB1/2019" }
    ]
  },
  CO: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB24-113", stage: "Passed · 2024", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires all youth sports organizations to ensure each coach completes annual mandatory reporter training and is encouraged to take abuse-prevention training covering prohibited conduct, boundaries, and responding to disclosures of abuse. Organizations must adopt a prohibited conduct policy and code of conduct for parents, coaches, athletes, and spectators, while all coaches (paid or volunteer in a coaching role) must undergo criminal history checks and cannot be hired if they have records of child abuse or sexual offenses. The law also directs the Department of Early Childhood to provide a model code of conduct and requires the Attorney General to prepare and distribute a notice of these requirements to be posted or shared with families.", link: "https://leg.colorado.gov/sites/default/files/documents/2024A/bills/2024a_113_rev.pdf" },
      { name: "SB11-040 / 25-43-103", stage: "Passed · 2011", topic: "School sport coaching · Youth sport coaching", summary: "Requires coaches to complete annual concussion education and mandates immediate removal of athletes suspected of concussion, prohibiting return until cleared by a licensed healthcare provider to protect youth athletes from brain injury risks.", link: "https://legiscan.com/CO/bill/SB040/2011" },
      { name: "HB 24-1080 / 26.5-4-403", stage: "Passed · 2024", topic: "Youth sport coaching", summary: "Effective August 7, 2024, this law mandates that all youth sports organizations conduct criminal background checks every three years for coaches and chaperones working directly with youth, including international checks if applicable. Additionally, at least one adult with current CPR and first aid certification must be present at each youth athletic activity. The law aims to enhance participant safety by ensuring properly vetted and trained personnel.", link: "https://legiscan.com/CO/bill/HB1080/2024" }
    ]
  },
  CT: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "HB 6417", stage: "Passed · 2021", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Mandates comprehensive background checks for adults who coach youth sports (employee or volunteer), including review of criminal and child-abuse registries, with renewals at least every five years; prohibits employing individuals with specified disqualifying offenses." },
      { name: "HB 5113 / 10-149b", stage: "Passed · 2010", topic: "School sport coaching", summary: "Mandates that public school coaches complete approved concussion training initially and review updates annually. Students and parents must receive concussion education and sign informed consent. Coaches must remove athletes exhibiting symptoms, notify guardians within 24 hours, and require written healthcare clearance before return-to-play.", link: "https://legiscan.com/CT/bill/HB05113/2014" }
    ]
  },
  DC: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "41321.02", stage: "Passed · 2006", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Defines a broad set of mandatory reporters (professionals who work with children such as teachers, athletic coaches, law enforcement, medical personnel, etc.) and requires them to report suspected child abuse, neglect, exposure to drug-related activity, sexual abuse, or certain types of injury (e.g. from sharp objects or firearms). It also includes exemptions (e.g. for lawyers in some contexts), rules about reporting procedures, and penalties for violations.", link: "https://code.dccouncil.gov/us/dc/council/code/sections/4-1321.02" },
      { name: "CB 21-263 / 382661.24", stage: "Passed · 2017", topic: "School sport coaching", summary: "Mandates that the District of Columbia State Athletic Association (DCSAA) administer knowledge exams for coaches and event officials in each DCSAA-sponsored sport at least four times annually. To qualify, individuals must pass the exam (within five years) or demonstrate equivalent competence, and DCSAA must maintain their certification records.", link: "https://code.dccouncil.gov/us/dc/council/laws/21-263" },
      { name: "CB 19-7 / 72871.03", stage: "Passed · 2011", topic: "School sport coaching · Youth sport coaching", summary: "Requires the Mayor to establish a concussion training program through rulemaking, covering: the nature and risks of concussions; criteria for removal and return of athletes; and dangers of under-reporting injuries. The program must identify who must complete it and make it widely available.", link: "https://code.dccouncil.gov/us/dc/council/laws/19-22" }
    ]
  },
  DE: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 256", stage: "Passed · 2014", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Expands the states background check requirements for child-serving entities to explicitly include youth sports organizations. The law requires employees, volunteers, and contractors in these organizations to undergo fingerprint-based state and federal criminal checks as well as a Child Protection Registry check, with specified prohibitions for certain convictions. Private schools and camps may opt out only if they disclose the lack of background checks to parents and obtain signed acknowledgment, ensuring transparency while strengthening safeguards for children in youth sports.", link: "https://legis.delaware.gov/json/BillDetail/GenerateHtmlDocument?docTypeId=2&legislationId=26872&legislationName=SB256&legislationTypeId=1" },
      { name: "HB404 / 3006L", stage: "Passed · 2015", topic: "School sport coaching · Youth sport coaching", summary: "Requires all on-site coaches and officials to complete initial and periodic concussion training per standards set by the State Council, with online training allowed. Non-school youth athletic organizations must also implement concussion education policies aligned with 3005L requirements for all participants.", link: "https://legiscan.com/DE/bill/HB404/2015" }
    ]
  },
  FL: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "HB 431", stage: "Passed · 2025", topic: "Safeguarding & abuse · Youth sport coaching", summary: "HB 431 extends the deadline for youth athletic team coaches providing coaching services for an independent\nsanctioning authority to undergo a Level 2 background screening from January 1, 2025 to July 1, 2026.", link: "https://www.flhouse.gov/Sections/Bills/billsdetail.aspx?BillId=81009" },
      { name: "943.0438 / SB 1546", stage: "Passed · 2023", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires youth athletic coaches under independent sanctioning authorities to complete Level 2 background screening; later legislation (Zachary Martin Act, 2019) requires education in CPR, AED use, and heat illness prevention. Coaches in youth sports must also take concussion training under state policy.", link: "https://legiscan.com/FL/bill/S1546/2025#:~:text=Florida%20Senate%20Bill%201546&text=Revising%20the%20date%20upon%20which,coaches%20must%20be%20conducted%2C%20etc.&text=Register%20now%20for%20our%20free,data%20of%20the%20LegiScan%20API." },
      { name: "HB 865 / 1012.55", stage: "Passed · 2024", topic: "School sport coaching", summary: "Requires public school athletic coaches to hold current certifications in CPR, first aid, and AED use. Effective July-1, 2024, the law aims to ensure coaches are prepared to respond to cardiac and medical emergencies during school sports activities.", link: "https://legiscan.com/FL/bill/H0865/2024" },
      { name: "HB 291 / 1006.20", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires public K–12 schools, via FHSAA approved bylaws, to implement policies including annual medical evaluations, concussion education, informed parent consent, immediate removal of suspected concussions, and written healthcare clearance before return-to-play. Coaches and administration are held compliant via detailed sports medicine advisory guidance.", link: "https://www.flhouse.gov/Sections/Bills/billsdetail.aspx?BillId=47442" }
    ]
  },
  GA: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB-60 / 20-2-324.5", stage: "Passed · 2019", topic: "School sport coaching", summary: "Requires schools with grades 6–12 to hold informational meetings twice annually on sudden cardiac arrest, distribute educational materials with a parent signature form, mandate student removal if fainting is suspected to be cardiac, and prohibit return to sports until medical clearance; coaches must annually review posted guidelines.", link: "https://legiscan.com/GA/bill/SB60/2019" }
    ]
  },
  HI: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "321-28 / Act 262", stage: "Passed · 2016", topic: "School sport coaching · Youth sport coaching", summary: "Establishes the Traumatic Brain Injury Advisory Board to oversee concussion education and awareness programs for youth, requiring annual concussion training, removal from play if injured, and medical clearance before return, aimed at protecting student-athletes statewide.", link: "https://legiscan.com/HI/bill/SB2557/2016" }
    ]
  },
  IA: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "HB 2442 / 280.13C", stage: "Passed · 2017", topic: "School sport coaching", summary: "Requires schools to provide concussion education to coaches, athletes, and parents, mandate removal of athletes suspected of concussion from play, and ensure medical clearance before return, protecting student-athlete health during school sports activities.", link: "https://legiscan.com/IA/bill/HF2442/2017" }
    ]
  },
  IL: {
    status: "introduced",
    headline: "Mental health legislation introduced, not yet law.",
    bills: [
      { name: "105 ILCS 25 / HB 3447", stage: "Pending · 2025", topic: "Mental health · School sport coaching", summary: "Requires high school coaching personnel to complete annual training on youth mental health best practices. The training must include information about athlete nutrition and eating disorders. The bill aims to enhance the well-being of student-athletes by equipping coaches with the knowledge to address mental health and nutritional issues effectively.", link: "https://legiscan.com/IL/bill/HB3447/2025" }
    ],
    related: [
      { name: "SB 0007", stage: "Passed · 2015", topic: "School sport coaching · Youth sport coaching", summary: "Requires concussion training for coaches and athletic trainers involved in interscholastic and youth sports. Establishes concussion oversight teams, return-to-play protocols, and continuing education for coaches.", link: "https://www.ilga.gov/legislation/BillStatus.asp?DocNum=0007&GAID=13&DocTypeID=SB&LegID=83721&SessionID=88&SpecSess=0&Session=0&GA=99" },
      { name: "HB 200 / 410 ILCS 145", stage: "Passed · 2011", topic: "School sport coaching · Youth sport coaching", summary: "Requires youth sports programs to provide concussion education, remove athletes suspected of concussion from play, and ensure medical clearance before return, enhancing safety for student-athletes in schools and youth sports organizations.", link: "https://legiscan.com/IL/bill/HB0200/2011" }
    ]
  },
  IN: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 93 / 20-34-7-7", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires schools to provide concussion education to coaches, athletes, and parents, mandate removal of athletes suspected of concussion from play, and ensure return only with medical clearance to protect student-athlete health and safety.", link: "https://legiscan.com/IN/bill/SB0093/2011" }
    ]
  },
  KY: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 120", stage: "Passed · 2025", topic: "Safeguarding & abuse · School sport coaching", summary: "requires that all interscholastic athletics consent forms inform student-athletes and parents about their right and duty to report child dependency, neglect, and abuse under KRS 620.030. It mandates that coaches and administrators receive training on abuse reporting obligations and procedures, ensuring they understand how to recognize and report suspected cases. These provisions embed child protection directly into Kentuckys school sports system.", link: "https://legiscan.com/KY/bill/SB120/2025" },
      { name: "HB 281 / 160.445", stage: "Passed · 2012", topic: "School sport coaching", summary: "Requires schools to provide concussion education to coaches, parents, and students, mandate removal of athletes suspected of concussion from play, and ensure medical clearance before return, promoting student-athlete safety in school sports.", link: "https://apps.legislature.ky.gov/record/12rs/hb281.html" }
    ]
  },
  LA: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 54 / 17:440.3", stage: "Passed · 2024", topic: "School sport coaching", summary: "Mandates concussion education for youth sports coaches, parents, and athletes, requires removal of athletes suspected of concussion from play, and ensures medical clearance before return, enhancing safety and awareness in youth athletic programs statewide.", link: "https://legiscan.com/LA/bill/SB54/2024" },
      { name: "SB 189 / 17:440.4", stage: "Passed · 2011", topic: "School sport coaching · Youth sport coaching", summary: "Requires public schools to provide concussion education to coaches, students, and parents, mandate removal of athletes suspected of concussion from play, and ensure return only with medical clearance to protect student-athlete health and safety.", link: "https://legiscan.com/LA/bill/SB189/2011" }
    ]
  },
  MA: {
    status: "enacted",
    headline: "Coach mental health training required by law.",
    bills: [
      { name: "Chapter 111 of the General Laws 2022 / HB 2508", stage: "Passed · 2025", topic: "Mental health · School sport coaching · Youth sport coaching", summary: "Mandates that municipal recreation departments establish annual training for youth athletic coaches, focusing on mental health awareness and the prevention of psychological and physical abuse. Coaches must complete this training to participate in youth sports.", link: "https://legiscan.com/MA/bill/H2508/2025" },
      { name: "SB 247", stage: "Pending · 2023", topic: "Mental health · School sport coaching", summary: "The department of elementary and secondary education shall publish, on or before June 30, 2024, guidelines for the implementation of social and emotional learning curricula in middle and high school athletic programs.", link: "https://malegislature.gov/Bills/193/S247/" }
    ],
    related: [
      { name: "M.G.L. c. 6, 172H", stage: "Passed · 2010", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires any entity primarily engaged in programs for children (including youth sports) to obtain CORI checks before accepting employees, volunteers, vendors, or contractors; provides related liability protections elsewhere in 172.", link: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleII/Chapter6/Section172h" },
      { name: "Chapter 166 of the Acts 2010 / 47A", stage: "Passed · 2010", topic: "School sport coaching", summary: "Requires public school coaches to have current CPR and AED certification from approved providers, covering adults, children, and infants. Schools arent responsible for certification costs.", link: "https://malegislature.gov/Laws/SessionLaws/Acts/2010/Chapter166" }
    ]
  },
  MD: {
    status: "enacted",
    headline: "Coach mental health training required by law.",
    bills: [
      { name: "SB 165", stage: "Passed · 2024", topic: "Mental health · School sport coaching", summary: "Requires MSDE and MHEC to develop guidelines and requires public schools and public colleges that offer athletics to provide mental-health/behavioral-distress training to each coach (topics include depression, trauma, violence, youth suicide, substance abuse).", link: "https://www.billtrack50.com/billdetail/1660246" }
    ],
    related: [
      { name: "HB 950", stage: "Pending · 2025", topic: "Safeguarding & abuse", summary: "The bill expands when the Department of Human Services may disclose child abuse or neglect reports and records, adding youth sports programs, child care centers in state or local facilities, and organizations that supervise children to the list of eligible recipients", link: "https://legiscan.com/MD/bill/HB950/2025" }
    ]
  },
  MI: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "28.722 & 380.1319 / HB 4371", stage: "Pending · 2025", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Mandates safety standards for youth sports, including emergency plans, criminal background checks, and coach training in CPR, concussion awareness, inclusivity, and bullying prevention.", link: "https://legiscan.com/MI/bill/HB4371/2026" },
      { name: "HB 5528 / 380.1319", stage: "Passed · 2023", topic: "School sport coaching", summary: "Mandates that all high school athletic coaches obtain certification in CPR and AED use by the 20252026 school year. The law provides legal immunity for coaches performing these duties, except in cases of gross negligence or willful misconduct.", link: "https://legiscan.com/MI/bill/HB5528/2023" },
      { name: "SB 1122 / 333.9155", stage: "Passed · 2012", topic: "School sport coaching · Youth sport coaching", summary: "Require educational materials and an electronic concussion awareness training program. The program must cover concussion risks, removal criteria, and the dangers of continued participation after a suspected concussion. Materials are to be made publicly available online.", link: "https://legiscan.com/MI/bill/SB1122/2011" },
      { name: "MCL 333.9155 et seq.", stage: "Passed · 2013", topic: "Youth sport coaching", summary: "Michigan law requires the Department of Health and Human Services to establish approved educational materials and a concussion awareness training program. Organizing entities (schools, leagues, or other youth athletic groups) must ensure coaches, employees, and volunteers complete this training every three years, provide concussion education to youth athletes and their parents/guardians (with signed acknowledgements), and remove any youth athlete suspected of a concussion until they receive written clearance from a health professional. The law also includes periodic review of training materials and allows private interscholastic associations with equal or stronger concussion protocols to follow their own rules in place of the states.", link: "https://www.michigan.gov/en/mdhhs/safety-injury-prev/publicsafety/concussion/awareness/michigans-sports-concussion-laws" }
    ]
  },
  MN: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SF 612 / 121A.37", stage: "Passed · 2011", topic: "School sport coaching · Youth sport coaching", summary: "Requires schools and youth sport programs to implement concussion management policies, including training for coaches and officials, mandatory removal of suspected concussed athletes, and medical clearance before return to play, enhancing youth athlete safety statewide.", link: "https://legiscan.com/MN/bill/SF612/2011" },
      { name: "121A.37", stage: "Passed · 2011", topic: "Youth sport coaching", summary: "requires any municipality, business, or nonprofit that organizes youth athletic activities with a fee to provide concussion education to athletes, parents, coaches, and officials, and mandates that all coaches and officials complete CDC-approved concussion training initially and every three years. It further requires immediate removal of athletes suspected of concussion, with return-to-play only allowed after medical evaluation and written clearance, while clarifying that compliance does not create new legal liability for organizations.", link: "https://www.revisor.mn.gov/statutes/cite/121A.37" }
    ]
  },
  MS: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "MS Code 43-15-303 / SB 2053", stage: "Passed · 2005", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Prohibits registered sex offenders from owning, operating, working for, or volunteering at any child care service, including public schools, licensed facilities, and fee-based youth programs. Employers are barred from hiring applicants listed on the sex offender registry, and violations carry misdemeanor or felony penalties with fines and possible imprisonment. The law also strengthens background check requirements for all caregivers in child care facilities, mandating fingerprint-based state and federal criminal checks as well as child abuse registry checks to ensure the safety of children", link: "https://billstatus.ls.state.ms.us/documents/2005/html/SB/2001-2099/SB2053SG.htm" },
      { name: "HB 48 / 37-24-7", stage: "Passed · 2014", topic: "School sport coaching · Youth sport coaching", summary: "Requires schools to implement concussion management policies, including education for athletes, parents, and coaches, and mandates removal from play and medical clearance before return, ensuring safer handling of concussions in student athletes.", link: "https://legiscan.com/MS/bill/HB48/2014" }
    ]
  },
  MT: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 112 / 20-7-1303", stage: "Passed · 2013", topic: "School sport coaching", summary: "Requires schools to adopt policies on youth concussions, including training for coaches, immediate removal of suspected cases, and medical clearance before return to play, aiming to protect student-athletes from brain injury complications", link: "https://legiscan.com/MT/bill/SB112/2013" },
      { name: "HB 487 / 20-7-1303", stage: "Passed · 2017", topic: "Youth sport coaching", summary: "Expands concussion safety laws to include all youth sports organizations, mandates concussion education for athletes, coaches, and parents, requires immediate removal from play for suspected concussions, and enforces medical clearance before return, enhancing protections statewide", link: "https://legiscan.com/MT/bill/HB487/2017" }
    ]
  },
  NC: {
    status: "introduced",
    headline: "Mental health legislation introduced, not yet law.",
    bills: [
      { name: "SB 550 (2025) Coaches Care Act", stage: "Pending · 2025", topic: "Mental health · School sport coaching · Youth sport coaching", summary: "Mandate annual mental-health training for middle and high school coaches, athletic directors and coaches of youth athletic organizations to recognize and support youth experiencing mental-health or substance-use challenges.", link: "https://www.ncleg.gov/Sessions/2025/Bills/Senate/PDF/S550v0.pdf" }
    ],
    related: [
      { name: "HB 792 / 115C-12", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires annual concussion education for athletes, parents, coaches, and relevant personnel before participation in school sports, with signed acknowledgment forms and maintained compliance records.", link: "https://legiscan.com/NC/bill/H792/2011" },
      { name: "130A-443.12 / HB 602", stage: "Passed · 2025", topic: "Youth sport coaching", summary: "Requires all youth athletics personnel or coaches serving athletes age 18 or younger to complete a Department-approved youth sports injury education course within 30 days of starting and annually thereafter; associations must keep individual course completion records. Exemptions include licensed trainers, physicians, nurses, and certain EMS personnel.", link: "https://legiscan.com/NC/bill/H602/2025" }
    ]
  },
  ND: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "HB 1363 / 15.1-02", stage: "Passed · 2025", topic: "School sport coaching", summary: "Requires the state superintendent and Department of Health to provide a cardiac emergency response plan templateincluding AED placement, maintenance, drills, training, and EMS coordinationfor public and private schools and athletic events, and mandates each school to adopt, practice, and annually review its plan.", link: "https://legiscan.com/ND/bill/HB1363/2025" },
      { name: "SB 2281 / 15.1-18", stage: "Passed · 2011", topic: "School sport coaching", summary: "Establishes school and youth sports concussion protocolsremoval, evaluation, biennial coach training, parental acknowledgment, health grants and the 988 crisis line.", link: "https://legiscan.com/ND/bill/2281/2011" }
    ]
  },
  NE: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "LB462", stage: "Pending · 2025", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Expands mandatory reporting status to an employee of a youth sports, recreation, or mentorship\norganization;", link: "https://legiscan.com/NE/text/LB462/id/3068664" },
      { name: "LB 260 & LB 932 / 71-9104", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires annual concussion training for coaches, distribution of concussion information to athletes and parents, immediate removal of suspected concussion cases, and medical clearance plus parental consent before return to play.", link: "https://legiscan.com/NE/bill/LB260/2011" }
    ]
  },
  NH: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "NH Rev Stat 170-E:56", stage: "Passed · 2019", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires all recreation camps to be licensed annually and all youth skill camps to maintain and certify a background check policy for owners, employees, and volunteers who may be left alone with children. Certification must show no one has convictions involving physical injury or harm to a child, with a $25 fee per check supporting the state camp fund. Camps must make their policies available to the department, which publishes them online, and may adopt more stringent requirements; recent background checks from another entity may be shared with consent to satisfy the law.", link: "https://law.justia.com/codes/new-hampshire/title-xii/chapter-170-e/section-170-e-56/" },
      { name: "HB 1530 / 328-F:18-a", stage: "Passed · 2018", topic: "Safeguarding & abuse", summary: "Requires criminal background checks, including fingerprinting, for applicants seeking licensure or certification as allied health professionals in New Hampshire, ensuring the governing board reviews the results before granting licensure.", link: "https://legiscan.com/NH/bill/HB1530/2018" }
    ]
  },
  NJ: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "A5872", stage: "Pending · 2025", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires volunteers, employees, and organizers of certain youth and sports organizations to receive criminal history record background checks.", link: "https://www.njleg.state.nj.us/bill-search/2024/A5872" },
      { name: "A4983", stage: "Pending · 2024", topic: "School sport coaching", summary: "Requires the Commissioner of Education to create an eating disorder awareness training program for coaches and athletic trainers in interscholastic, cheer, dance, and collegiate sports. The program will cover risk factors, symptoms, prevention, and referral protocols, and must be completed initially within six months and then every two years. School districts and public colleges must also adopt policies to ensure staff know how to respond when a student-athlete may have an eating disorder.", link: "https://legiscan.com/NJ/bill/A4983/2024" },
      { name: "18A / SB 4182", stage: "Pending · 2024", topic: "School sport coaching", summary: "Requires New Jersey to implement sensitivity training for athletic directors, coaches, and officials covering diversity, inclusion, and bias. The NJSIAA mandates training every four years to promote respectful, inclusive school sports environments.", link: "https://legiscan.com/NJ/bill/S4182/2024" },
      { name: "18A:40-41i / SB 3599", stage: "Pending · 2024", topic: "School sport coaching", summary: "Mandates the Department of Education to establish a program enabling coaches of school district and nonpublic school athletic activities to obtain certification in cardiopulmonary resuscitation (CPR).", link: "https://legiscan.com/NJ/bill/S3599/2024" },
      { name: "AB 2743 / 18A:40-41.2", stage: "Passed · 2010", topic: "School sport coaching", summary: "Requires New Jersey schools to implement concussion safety protocols, including education, immediate removal of suspected concussed athletes from play, and mandatory medical clearance before return, enhancing student-athlete health and safety during sports activities.", link: "https://legiscan.com/NJ/bill/A2743/2010" }
    ]
  },
  NM: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 450 / 22-13-31.2", stage: "Passed · 2023", topic: "School sport coaching", summary: "Mandates that all licensed coaches in New Mexico public and charter schools maintain current CPR certification, including AED training. The Public Education Department is responsible for implementing rules to enforce this requirement, enhancing student-athlete safety during school athletic activities.", link: "https://legiscan.com/NM/bill/SB450/2023" },
      { name: "SB 1 / 22-13-31.1", stage: "Passed · 2010", topic: "School sport coaching", summary: "Enhances brain injury protocols in New Mexico schools by requiring coaches to recognize, respond to, and educate on concussion symptoms, ensuring student-athletes receive proper care and are removed from play following brain injury signs to protect their health and safety.", link: "https://legiscan.com/NM/bill/SB1/2010" }
    ]
  },
  NV: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "Nev. Rev. Stat. 432A.710", stage: "Passed · 2017", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires seasonal or temporary recreation programs to maintain a first aid kit, post an emergency exit plan, and ensure at least one trained staff member or volunteer is certified in CPR and first aid during operating hours. Operators must conduct background checks and child abuse/neglect screenings for staff within three days of hire and every five years thereafter, terminating individuals with disqualifying convictions or substantiated abuse reports. Programs must keep staff records confidential, and violations of these requirements can result in civil penalties of up to $500 per violation.", link: "https://www.leg.state.nv.us/NRS/NRS-432A.html" },
      { name: "AB 445 / 385B.080", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires the Nevada Interscholastic Activities Association (NIAA) to develop concussion management policies for high school sports. The NIAA must require immediate removal of athletes with suspected concussions, medical clearance before return, and annual training for coaches and staff.", link: "https://legiscan.com/NV/bill/AB455/2011" }
    ]
  },
  NY: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "AB 9534 / 3001-B", stage: "Passed · 2021", topic: "School sport coaching", summary: "Mandates that coaches of high school extracurricular athletic activities in public schools obtain certification in first aid and adult CPR from a nationally recognized organization approved by the commissioner. They must provide evidence of current certification before each sports season.", link: "https://legiscan.com/NY/bill/A09534/2021" },
      { name: "AB 8194 & SB 3953 / 305", stage: "Passed · 2011", topic: "School sport coaching", summary: "Established concussion management protocols in New York schools, requiring training for coaches and staff, parental notification, and removal of student-athletes with suspected concussions. Ensure safe return-to-play with written medical clearance to protect student health.", link: "https://legiscan.com/NY/bill/A08194/2011" },
      { name: "AB 3569 / SB 5638", stage: "Pending · 2025", topic: "Youth sport coaching", summary: "Relates to requiring CPR and AED training by youth league coaches; requires youth league coaches to be trained in adult and child CPR and the use of an automated external defibrillator; provides current coaches have one year from the effective date of the law to receive such training; provides that a person who is unable to complete a training due to a physical disability may coach as long as a person who has completed a training is present at all times.", link: "https://legiscan.com/NY/bill/A3569/2025" }
    ]
  },
  OH: {
    status: "enacted",
    headline: "Coach mental health training required by law.",
    bills: [
      { name: "HB 33 / 3313.5318", stage: "Passed · 2023", topic: "Mental health · School sport coaching", summary: "Mandates that all athletic coaches complete a student mental health training course approved by the Department of Mental Health and Addiction Services. This training must be completed each time the individual applies for or renews a pupil-activity program permit.", link: "https://legiscan.com/OH/bill/HB33/2023" }
    ],
    related: [
      { name: "HB 252 / 3707.59", stage: "Passed · 2015", topic: "School sport coaching · Youth sport coaching", summary: "Mandates that youth athletes, parents, and coaches receive education on sudden cardiac arrest (SCA) risks. Athletes exhibiting fainting or a family history of SCA must obtain medical clearance before participating. Coaches are required to complete annual SCA training.", link: "https://legiscan.com/OH/bill/SB252/2015" },
      { name: "HB 143 / 3319.303", stage: "Passed · 2011", topic: "School sport coaching · Youth sport coaching", summary: "Requires schools and youth sports organizations to provide annual concussion and head injury information to athletes and parents, and mandates that coaches and referees complete concussion-recognition training. Students showing symptoms of a concussion must be immediately removed from play and cannot return until cleared in writing by a physician or qualified health care provider. The law also establishes liability protections for schools, staff, coaches, referees, and volunteers, except in cases of willful or wanton misconduct.", link: "https://legiscan.com/OH/bill/HB143/2011" }
    ]
  },
  OK: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "57 Okl. St. 589", stage: "Passed · 2024", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Oklahoma law makes it unlawful for registered sex offenders or violent crime offenders to work with or provide services to children, or to be employed on school premises. Employers and contractors serving children must conduct annual registry checks and require employees to sign statements confirming they are not registered offenders", link: "https://law.justia.com/codes/oklahoma/title-57/section-57-589/" },
      { name: "SB 239 & SB 1921 / 70-24-156", stage: "Passed · 2016", topic: "School sport coaching", summary: "Requires public schools to have a sudden cardiac emergency response plan and mandates annual sudden cardiac arrest training for athletic coaches before coaching. Aims to improve student-athlete safety through preparedness, awareness, and rapid response in emergencies.", link: "https://legiscan.com/OK/bill/SB239/2016" }
    ]
  },
  OR: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 1547", stage: "Passed · 2021", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Requires anyone operating a school-age recorded programyouth development programs for children outside school hours that provide enrichment such as sports or recreational activitiesto be formally recorded with the Office of Child Care. Operators, employees, and others with potential unsupervised contact with children are considered subject individuals and must apply for and maintain enrollment in the states Central Background Registry. Programs cannot hire or retain individuals who are not cleared through this registry, ensuring added safety in non-school youth activity settings.", link: "https://olis.oregonlegislature.gov/liz/2022R1/Downloads/MeasureDocument/SB1547/Introduced" },
      { name: "SB 348 / 336.485 & 418.696", stage: "Passed · 2009", topic: "School sport coaching", summary: "Establishes concussion management and awareness protocols for youth sports, requiring annual distribution of educational materials to parents and coaches, immediate removal from play if a concussion is suspected, and written clearance for return-to-play. Aims to enhance safety and awareness in youth athletic activities.", link: "https://olis.oregonlegislature.gov/liz/2009R1/Measures/Overview/SB348" },
      { name: "SB 721", stage: "Passed · 2013", topic: "Youth sport coaching", summary: "Imposes on nonschool athletic teams requirements for recognizing and responding to possible concussions.", link: "https://legiscan.com/OR/bill/SB721/2013" }
    ]
  },
  PA: {
    status: "introduced",
    headline: "Mental health legislation introduced, not yet law.",
    bills: [
      { name: "HB 1367", stage: "Pending · 2023", topic: "Mental health", summary: "Would require mental-health awareness training for high school coaches and directs state agencies to develop curriculum/resources; aimed at improving early identification and support for student-athletes.", link: "https://legiscan.com/PA/bill/HB1367/2023" }
    ],
    related: [
      { name: "23 Pa C.S. 6344, 6344.2 and 6344.4", stage: "Passed · 2014", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Establishes mandatory reporting requirements, protective services, and definitions related to child abuse in Pennsylvania. It applies broadly to schools, child-care settings, and any program, activity, or service involving children, explicitly including youth camps, recreational camps, and sports or athletic programs. The law emphasizes complete reporting, agency cooperation, and safeguards to protect children while recognizing parental rights and clarifying that participation in interscholastic sports, physical education, or recreational/athletic activities involving physical contact does not in itself constitute child abuse.", link: "https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/23/00.063..HTM" },
      { name: "14-1425 / SB 619", stage: "Pending · 2025", topic: "School sport coaching", summary: "Mandates that the Departments of Health and Education develop and post guidelines on sudden cardiac arrest (SCA) and electrocardiogram (ECG) testing. It requires schools to inform students and parents about the option to request ECG testing during physical exams. The law also mandates that coaches complete annual SCA training and establishes penalties for non-compliance.", link: "https://legiscan.com/PA/bill/SB619/2025" },
      { name: "HB 1367", stage: "Pending · 2023", topic: "School sport coaching", summary: "This act amends Pennsylvania's Public School Code to strengthen student mental health awareness by requiring updated state standards, a model curriculum, and twice-yearly notification to students, families, and athletics staff about available services. If a student athletes is injured or suddenly stops attending a school-sponsored athletic or extracurricular activity, the school's student assistance program must be notified and provide parents with mental health resources. Beginning in the 2025–2026 school year, coaches must complete mental health awareness training, and health examination forms will be updated to include parent-provided mental health information.", link: "https://legiscan.com/PA/bill/HB1367/2023" },
      { name: "SB 200 / 5323", stage: "Passed · 2011", topic: "School sport coaching", summary: "Mandates post concussion and traumatic brain injury (TBI) guidelines developed by the Departments of Health and Education, and require annual signed acknowledgement from students and parents, ensure coaches complete concussion-management training, and enforce immediate removal and medical professional clearance of any athlete suspected of a concussion.", link: "https://legiscan.com/PA/bill/SB200/2011" }
    ]
  },
  RI: {
    status: "enacted",
    headline: "Coach mental health training required by law.",
    bills: [
      { name: "R.I. Gen. Laws 16-21.7-2 (Nathan Bruno & Jason Flatt Act)", stage: "Passed · 2021", topic: "Mental health · School sport coaching", summary: "Requires annual suicide-awareness and prevention training for all public school personnel, explicitly including coaches and coaching staffeven volunteerscovering prevention, intervention, and postvention policies.", link: "https://webserver.rilegislature.gov/Statutes/TITLE16/16-21.7/16-21.7-2.htm" }
    ],
    related: [
      { name: "HB 7036 & HB 5440 & HB 7367 / 16-91-3", stage: "Passed · 2010", topic: "School sport coaching · Youth sport coaching", summary: "Requires youth sports programs to provide annual concussion education to athletes, parents, and coaches; remove athletes showing concussion signs from play; prohibit return without medical clearance; and ensure coaches complete training. The Rhode Island Department of Education develops materials and oversees compliance.", link: "https://legiscan.com/RI/bill/H7036/2010" },
      { name: "HB 5826 / 16-11.1-1", stage: "Passed · 2003", topic: "School sport coaching", summary: "Requires all public school athletic coaches to complete a first aid certification course approved by the Department of Elementary and Secondary Education. This mandate applies to both paid and volunteer coaches in any athletic program supported wholly or partially by public funds.", link: "https://webserver.rilegislature.gov/BillText03/HouseText03/H5826.pdf" }
    ]
  },
  SD: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 149 / 13-36-10", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires the SD High School Activities Association and Department of Education to develop a concussion training program and mandates that every coach in sanctioned school athletic activities complete that training annually.", link: "https://legiscan.com/SD/bill/SB149/2011" }
    ]
  },
  TN: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "HB 1410 & SB 1259 / 68-55-502", stage: "Passed · 2021", topic: "School sport coaching", summary: "Requires all school coaches to complete a concussion recognition and head injury safety course within 90 days of starting and biennially thereafter, and to annually acknowledge in writing completion and understanding of the training", link: "https://legiscan.com/TN/bill/HB1410/2021" },
      { name: "SB 985 / 68-6-103", stage: "Passed · 2015", topic: "School sport coaching · Youth sport coaching", summary: "Requires schools and youth sport organizations to educate and inform coaches, athletes, administrators, and parents about sudden cardiac arrest risks and symptoms using approved materials; mandates annual training for coaches and athletic directors; enforces removal of symptomatic athletes; and applies escalating penalties for violations.", link: "https://legiscan.com/TN/bill/SB0985/2015" },
      { name: "68-55-501", stage: "Passed · 2014", topic: "School sport coaching · Youth sport coaching", summary: "Establishes definitions for youth sports concussion protocols. It distinguishes between community-based youth athletic activities (organized by cities, counties, nonprofits, or businesses) and school-based youth athletic activities (organized by schools or local education agencies), both applying only to participants under 18 and excluding college programs, lessons, or incidental activities. It also specifies that only qualified Tennessee-licensed physicians, osteopathic doctors, physician assistants under supervision, or clinical neuropsychologists with concussion training may serve as recognized health care providers for concussion management.", link: "https://advance.lexis.com/documentpage/?pdmfid=1000516&crid=638e9dac-4ef9-4797-8904-3593c0784a87&nodeid=ACPAABABDAAFAAB&nodepath=%2fROOT%2fACP%2fACPAAB%2fACPAABABD%2fACPAABABDAAF%2fACPAABABDAAFAAB&level=5&haschildren=&populated=false&title=68-55-501.+Part+definitions.&config=025054JABlOTJjNmIyNi0wYjI0LTRjZGEtYWE5ZC0zNGFhOWNhMjFlNDgKAFBvZENhdGFsb2cDFQ14bX2GfyBTaI9WcPX5&pddocfullpath=%2fshared%2fdocument%2fstatutes-legislation%2furn%3acontentItem%3a588J-X5D0-R03M-G0KR-00008-00&ecomp=6gf5kkk&prid=5c3fa737-7056-4544-a31b-6d3c7362b07f" },
      { name: "SB 882 / 49-6-3601", stage: "Passed · 2013", topic: "School sport coaching", summary: "Mandates that schools and youth sports organizations implement safety standards for youth athletic activities, requiring coaches to complete training in concussion, cardiac arrest, CPR/AED, background checks, and emergency response plans and develop a formal coach code of conduct.", link: "https://legiscan.com/TN/bill/SB0882/2013" }
    ]
  },
  TX: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 865 / 22.902", stage: "Passed · 2025", topic: "School sport coaching", summary: "Requires school personnel to complete and maintain CPR and AED certification from recognized organizations, and mandates that schools adopt policies ensuring staff and volunteers have access to this training to respond effectively to cardiac emergencies.", link: "https://legiscan.com/TX/bill/SB865/2025" },
      { name: "HB 2038 / 38.158", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires coaches to complete at least two hours of concussion training every two years, covering prevention, recognition, evaluation, and long-term effects. The UIL approves courses and maintains a list of authorized providers, ensuring all student-athletes receive safe management during athletic activities.", link: "https://legiscan.com/TX/bill/HB2038/2011" },
      { name: "SB 1127 / 75.205", stage: "Passed · 2003", topic: "School sport coaching", summary: "Requires coaches to complete at least two hours of concussion training every two years, covering prevention, recognition, evaluation, and long-term effects. The UIL approves courses and maintains a list of authorized providers, ensuring all student-athletes receive safe management during athletic activities.", link: "https://www.lrl.state.tx.us/scanned/srcBillAnalyses/78-0/SB1127RPT.PDF" },
      { name: "HB 816", stage: "Pending · 2024", topic: "Youth sport coaching", summary: "Creates a licensing system for non-school youth sports programs, with an advisory board, fee authority, a complaint hotline, and enforcement powers (including license denial/suspension and civil/admin penalties). Programs must require University Interscholastic League-style safety training for coaches/trainers and adopt Texas Department of Licensing and Regulation-approved concussion and venue safety protocols", link: "https://legiscan.com/TX/bill/HB816/2025" },
      { name: "HB 4260", stage: "Passed · 2019", topic: "Youth sport coaching", summary: "Mandates the establishment of a coaching education program administered by The University of Texas Sport Sciences Institute. The program must cover coaching philosophies, sport psychology, pedagogy, physiology, management, CPR and first aid, legal compliance, character development, and student-athlete role modeling. All 7-12 grade coaches shall complete the Coaches Certification Program prior to their sports season on an annual basis.", link: "https://legiscan.com/TX/bill/HB4260/2019" }
    ]
  },
  UT: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 158", stage: "Passed · 2024", topic: "Safeguarding & abuse · Youth sport coaching", summary: "Applies to youth services organizations such as sports leagues, athletic associations, scouting groups, and similar programs serving 25 or more children. Beginning May 1, 2025, these organizations must conduct sex offender registry checks on all employees and volunteers (youth workers), provide training on sexual abuse identification and reporting, and adopt child abuse prevention policies", link: "https://le.utah.gov/~2024/bills/static/SB0158.html" },
      { name: "HB 204 / 26-53-201", stage: "Passed · 2011", topic: "Youth sport coaching", summary: "Mandates that amateur sports organizations adopt and enforce a concussion and head injury policy. The policy must inform parents or guardians about the risks of concussions and require their written acknowledgment before a child participates in sporting events. Coaches and volunteers must be familiar and trained with the policy.", link: "https://legiscan.com/UT/bill/HB0204/2011" }
    ]
  },
  VA: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "HB 1695 / 22.1-271.9", stage: "Passed · 2025", topic: "School sport coaching", summary: "Mandates that all public elementary and secondary schools develop and implement a Cardiac Emergency Response Plan (CERP) or an Athletic Emergency Action Plan (EAP). These plans must include establishing a cardiac emergency response team, integrating with local emergency services, conducting annual drills, and ensuring the availability and maintenance of Automated External Defibrillators (AEDs) at athletic venues.", link: "https://legiscan.com/VA/bill/HB1695/2025" }
    ]
  },
  VT: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 100 / 1431", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires that schools educate coaches, youth athletes, and parents about concussion prevention and treatment. It mandates the removal of athletes from play if a concussion is suspected and prohibits return until evaluated and cleared by a healthcare professional. Schools must develop and implement a concussion management plan.", link: "https://legiscan.com/VT/bill/S0100/2011" }
    ]
  },
  WA: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "43.43.830 / HB 1803", stage: "Pending · 2025", topic: "Safeguarding & abuse · School sport coaching · Youth sport coaching", summary: "Aims to enhance youth sports safety in Washington by establishing new training and reporting requirements for coaches and youth sports organizations. The bill seeks to promote safety in youth sports.", link: "https://legiscan.com/WA/bill/HB1803/2025" },
      { name: "SB 5083 / 28A.600.195", stage: "Passed · 2015", topic: "School sport coaching", summary: "Mandates that youth sports organizations provide information on sudden cardiac arrest risks and require parents and athletes to sign an acknowledgment form before participation.", link: "https://legiscan.com/WA/bill/SB5083/2015" }
    ]
  },
  WI: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "HB 259 / 118.293", stage: "Passed · 2011", topic: "School sport coaching", summary: "Mandates that youth athletic organizations educate coaches, athletes, and parents about the risks of concussions and head injuries. It prohibits participation in youth activities unless a signed information sheet is returned, requires immediate removal if a concussion is suspected, and mandates medical clearance before return.", link: "https://legiscan.com/WI/bill/AB259/2011" }
    ]
  },
  WV: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SB 866", stage: "Pending · 2025", topic: "School sport coaching · Youth sport coaching", summary: "Directs the West Virginia Board of Education, in consultation with the Board of Physical Therapy, to create a rule requiring schools and youth sports leagues to adopt written concussion education, prevention, and response plans grounded in established concussion protocols.", link: "https://legiscan.com/WV/bill/SB866/2025" },
      { name: "HB 4497 / 18-5-22e", stage: "Passed · 2020", topic: "School sport coaching", summary: "Schools must develop venue-specific, annually practiced cardiac emergency response plans for athletic programs and other school settings. Staff including coaches, nurses, and trainers must be trained in CPR and AED use, and students must acknowledge the plan annually before participation.", link: "https://legiscan.com/WV/bill/HB4497/2020" },
      { name: "HB 2005 / 18A-3-2a", stage: "Passed · 2015", topic: "School sport coaching", summary: "Mandates that the State Superintendent can issue special certificates for athletic coaches outside of traditional educator credentials when they are contracted, insured, and complete a state-approved orientation.", link: "https://legiscan.com/WV/bill/HB2005/2015" },
      { name: "SB 336 / 18-2-25a", stage: "Passed · 2013", topic: "School sport coaching", summary: "Requires schools to educate coaches, athletes, parents, and administrators about concussion risks; mandate annual concussion training for head coaches; enforce immediate removal and medical clearance for suspected concussions; require signed information sheets; and report all concussion incidents to the state activities commission.", link: "https://legiscan.com/WV/bill/SB336/2013" }
    ]
  },
  WY: {
    status: "baseline",
    headline: "No mental-health-specific law. Related protections are in force.",
    related: [
      { name: "SF 38 & SF 50 / 21-2-202", stage: "Passed · 2011", topic: "School sport coaching", summary: "Requires school boards to develop protocols for training coaches and athletic trainers and educating students, parents, and guardians about head injuries and concussions resulting from athletic activities. The state superintendent is tasked with assisting local districts in implementing these protocols.", link: "https://legiscan.com/WY/bill/SF0038/2011" }
    ]
  }
};

window.POLICY_LAST_SYNCED = "September 2025 (source last updated)";

window.POLICY_BASELINE_NOTE =
  "All 50 states and D.C. require youth-sports concussion protocols \u2014 physical safety is " +
  "regulated. No mental-health-specific youth-sport law is tracked here yet. Any related " +
  "safeguarding or coach-training laws in force appear below.";
