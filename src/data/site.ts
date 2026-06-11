/**
 * Site-wide data and UI strings. Czech is the master authoring language
 * (notes/assignment.md §2.2); English is the derived translation. Keep the
 * two in sync — never edit one without the other.
 */

export type Lang = 'en' | 'cs'
export type Localized = { en: string; cs: string }

export const SITE = {
  name: 'Vojtěch Zicha',
  legalName: 'Bc. Vojtěch Zicha, LL.B.',
  monogram: 'VZ',
  url: 'https://vojtechzicha.com',
  email: 'mail@vojtechzicha.com',
  phone: '+420 727 913 052',
  phoneHref: 'tel:+420727913052',
  linkedin: 'https://www.linkedin.com/in/vojtechzicha/',
  github: 'https://github.com/vojtechzicha/',
  cvPath: '/cv',

  title: {
    en: 'Vojtěch Zicha — Solution & Cloud Architect',
    cs: 'Vojtěch Zicha — solution a cloud architekt',
  },
  description: {
    en: 'Solution and cloud architect with 11+ years across financial services, automotive, energy, and the public sector. Architecture, cloud, DevOps — designed and delivered end to end.',
    cs: 'Solution a cloud architekt s více než 11 lety zkušeností ve finančních službách, automotive, energetice a veřejném sektoru. Architektura, cloud, DevOps — návrh i dodávka od začátku do konce.',
  },

  eyebrow: {
    en: 'Cloud & Solution Architecture',
    cs: 'Architektura řešení a cloudu',
  },
  tagline: {
    en: 'I design and deliver digital platforms.',
    cs: 'Navrhuji a dodávám digitální platformy.',
  },
  lede: {
    en: "One architect, seven roles. Pick the one you're hiring.",
    cs: 'Jeden architekt, sedm rolí. Vyberte si tu, kterou právě hledáte.',
  },
  pitch: {
    en: 'Solution architect and technology leader with 11+ years across financial services, automotive, energy, and the public sector. I design full-scale architectures, own delivery end to end, and pair hands-on engineering with formal enterprise-architecture practice.',
    cs: 'Solution architekt a technologický lídr s více než 11 lety zkušeností ve finančních službách, automotive, energetice a veřejném sektoru. Navrhuji architekturu v celém rozsahu, vedu dodávku od začátku do konce a praktické inženýrství spojuji s formální enterprise architekturou.',
  },

  availability: {
    state: 'available' as 'available' | 'booked',
    label: {
      en: 'Available for freelancing — project or part-time',
      cs: 'K dispozici pro freelance spolupráci — projektově i na část úvazku',
    },
  },

  stats: [
    { n: '30+', label: { en: 'projects delivered', cs: 'dodaných projektů' } },
    { n: '11+', label: { en: 'years of experience', cs: 'let zkušeností' } },
    { n: '22', label: { en: 'largest team led', cs: 'největší vedený tým' } },
  ],

  about: [
    {
      en: "I'm a solution and cloud architect with over 11 years of experience across financial services, automotive, energy, and public-sector clients. I design full-scale architectures and own delivery end to end, with particular strength in cloud, DevOps, and DevSecOps for web, mobile, and IoT platforms. I pair hands-on engineering with formal enterprise-architecture practice (TOGAF, ArchiMate) and AWS certification, mentor technology teams, and set delivery standards.",
      cs: 'Jsem solution a cloud architekt s více než 11 lety zkušeností u klientů z finančních služeb, automotive, energetiky a veřejného sektoru. Navrhuji architekturu v celém rozsahu a vedu dodávku od začátku do konce — s důrazem na cloud, DevOps a DevSecOps pro webové, mobilní a IoT platformy. Praktické inženýrství spojuji s formální enterprise architekturou (TOGAF, ArchiMate) a certifikací AWS, mentoruji technologické týmy a nastavuji dodávkové standardy.',
    },
    {
      en: "Deliveries range from new datacenter automation to mobile application platforms for Czech's largest automotive producer, and from Kubernetes-hosted backends to GCP-based loyalty and customer activation systems. Across my career I've delivered tens of projects covering sales, integration, collections, and business user experience.",
      cs: 'Dodávky sahají od automatizace nového datacentra po platformy mobilních aplikací pro největšího českého výrobce automobilů a od backendů na Kubernetes po věrnostní a aktivační systémy na GCP. Za svou kariéru jsem dodal desítky projektů v oblastech prodeje, integrací, vymáhání pohledávek a uživatelské zkušenosti.',
    },
  ],

  facts: {
    location: {
      en: 'Based in Prague, Czechia · remote & on-site across the EU',
      cs: 'Praha · vzdáleně i na místě po celé EU',
    },
    languages: {
      en: 'Czech native · English full professional (C1)',
      cs: 'Čeština rodilý mluvčí · angličtina plně profesionální (C1)',
    },
  },

  services: [
    {
      k: '01',
      title: { en: 'Architecture review & advisory', cs: 'Review architektury a poradenství' },
      desc: {
        en: 'A second set of eyes on a design, an integration landscape, or a migration plan — delivered as a written review with concrete recommendations. One-off or recurring.',
        cs: 'Druhý pár očí na návrh, integrační prostředí nebo migrační plán — formou písemné revize s konkrétními doporučeními. Jednorázově i opakovaně.',
      },
    },
    {
      k: '02',
      title: { en: 'Cloud & DevOps platform design', cs: 'Návrh cloudových a DevOps platforem' },
      desc: {
        en: 'Cloud architecture on AWS, GCP, or Azure; Kubernetes-hosted backends; CI/CD and infrastructure-as-code that let teams ship without friction.',
        cs: 'Cloudová architektura na AWS, GCP nebo Azure; backendy na Kubernetes; CI/CD a infrastructure-as-code, díky kterým týmy dodávají bez tření.',
      },
    },
    {
      k: '03',
      title: { en: 'Fractional technology leadership', cs: 'Fractional vedení technologií' },
      desc: {
        en: 'The head-of-technology agenda on a part-time basis: architecture roadmap, SDLC governance, team mentoring, and presale support.',
        cs: 'Agenda technologického ředitele na část úvazku: architektonická roadmapa, správa SDLC, mentoring týmů a podpora presale aktivit.',
      },
    },
    {
      k: '04',
      title: { en: 'Training & mentoring', cs: 'Školení a mentoring' },
      desc: {
        en: 'Mentoring of customer engineers, training of clients and internal staff — from enterprise-architecture practice (TOGAF, ArchiMate) to hands-on cloud and DevOps.',
        cs: 'Mentoring inženýrů zákazníka, školení klientů a interních týmů — od enterprise architektury (TOGAF, ArchiMate) po praktický cloud a DevOps.',
      },
    },
  ],

  skills: {
    'archimate-uml': { name: { en: 'ArchiMate / UML / BPMN', cs: 'ArchiMate / UML / BPMN' }, level: 'professional' },
    'togaf-ea': { name: { en: 'Enterprise & Solution Architecture (TOGAF)', cs: 'Enterprise a solution architektura (TOGAF)' }, level: 'professional' },
    'eda-microservices': { name: { en: 'Event-Driven Architecture & Microservices', cs: 'Event-driven architektura a mikroslužby' }, level: 'professional' },
    'cloud-aws': { name: { en: 'Cloud Architecture (AWS)', cs: 'Cloudová architektura (AWS)' }, level: 'certified' },
    'cloud-gcp-azure': { name: { en: 'Cloud Architecture (GCP, Azure)', cs: 'Cloudová architektura (GCP, Azure)' }, level: 'professional' },
    'kubernetes': { name: { en: 'Kubernetes & Containerization', cs: 'Kubernetes a kontejnerizace' }, level: 'professional' },
    'devops-cicd': { name: { en: 'DevOps & CI/CD', cs: 'DevOps a CI/CD' }, level: 'professional' },
    'iac-monitoring': { name: { en: 'Infrastructure-as-Code & monitoring', cs: 'Infrastructure-as-code a monitoring' }, level: 'professional' },
    'integration': { name: { en: 'Integration Analysis & Patterns (REST/SOAP, MQ, Kafka, SQL)', cs: 'Integrační analýza a vzory (REST/SOAP, MQ, Kafka, SQL)' }, level: 'professional' },
    'dev-node-dotnet': { name: { en: 'Node.js / .NET / Mobile App Development', cs: 'Vývoj v Node.js / .NET / mobilní aplikace' }, level: 'professional' },
  } as Record<string, { name: Localized; level: 'professional' | 'certified' }>,

  legal: {
    identity: 'Bc. Vojtěch Zicha, LL.B. · IČ 08090327 · DIČ/VAT CZ9112125572 · DUNS® 49-633-3611',
    address: 'Modenská 663/1, CZ-10900 Praha 15-Horní Měcholupy',
    bank: '346045492/0300 · IBAN CZ4103000000000346045492 (SWIFT CEKOCZPP)',
    register:
      'Fyzická osoba zapsaná v živnostenském rejstříku od 15. dubna 2019, příslušná pro Úřad městské části Praha 15.',
  },
}

/** UI strings, keyed by language */
export const UI = {
  nav: {
    work: { en: 'Work', cs: 'Projekty' },
    services: { en: 'Services', cs: 'Služby' },
    about: { en: 'About', cs: 'O mně' },
    contact: { en: 'Contact', cs: 'Kontakt' },
  },
  sections: {
    services: { title: { en: 'Services', cs: 'Služby' }, cap: { en: "what I'm hired to do", cs: 'co si u mě klienti objednávají' } },
    work: { title: { en: 'Selected work', cs: 'Vybrané projekty' }, cap: { en: 'anonymized · full detail under NDA', cs: 'anonymizováno · plné detaily pod NDA' } },
    experience: { title: { en: 'Experience', cs: 'Praxe' }, cap: { en: '11+ years in production', cs: 'více než 11 let v produkci' } },
    educationSkills: { title: { en: 'Education & skills', cs: 'Vzdělání a dovednosti' }, cap: { en: '', cs: '' } },
    credentials: { title: { en: 'Credentials', cs: 'Certifikace' }, cap: { en: 'proof, not heroes', cs: 'důkazy, ne trofeje' } },
    about: { title: { en: 'About', cs: 'O mně' }, cap: { en: 'the person behind the platforms', cs: 'člověk za platformami' } },
    contact: { title: { en: 'Contact', cs: 'Kontakt' }, cap: { en: '', cs: '' } },
  },
  hero: {
    chipHint: {
      en: '→ select a role; the page re-specs for that reader',
      cs: '→ vyberte roli; stránka se přeskládá pro daného čtenáře',
    },
  },
  cta: {
    email: { en: 'EMAIL ME →', cs: 'NAPIŠTE MI →' },
    emailSubject: { en: 'Engagement inquiry — vojtechzicha.com', cs: 'Poptávka spolupráce — vojtechzicha.com' },
    downloadCv: { en: 'DOWNLOAD CV (PDF) →', cs: 'STÁHNOUT CV (PDF) →' },
    contactHeading: {
      en: 'Have a platform that needs an architect?',
      cs: 'Máte platformu, která potřebuje architekta?',
    },
    contactNote: {
      en: 'Email is the fastest channel — or reach out on LinkedIn. We can talk project work, part-time engagements, or one-off consulting.',
      cs: 'Nejrychlejší cesta je e-mail — nebo se ozvěte na LinkedIn. Můžeme se bavit o projektech, spolupráci na část úvazku i jednorázových konzultacích.',
    },
  },
  work: {
    client: { en: 'Client', cs: 'Klient' },
    period: { en: 'Period', cs: 'Období' },
    lens: { en: 'Lens', cs: 'Role' },
    stack: { en: 'Stack', cs: 'Stack' },
    outcome: { en: 'Outcome', cs: 'Výsledek' },
    decisions: { en: 'Key decisions', cs: 'Klíčová rozhodnutí' },
    nda: {
      en: 'Full detail — real names, real diagrams — available under NDA',
      cs: 'Plné detaily — skutečná jména, skutečné diagramy — k dispozici pod NDA',
    },
    readCaseStudy: { en: 'READ THE CASE STUDY →', cs: 'PŘEČÍST CASE STUDY →' },
    allWork: { en: 'ALL WORK →', cs: 'VŠECHNY PROJEKTY →' },
    indexTitle: { en: 'Work', cs: 'Projekty' },
    indexCap: { en: 'public tier — anonymized case studies', cs: 'veřejná vrstva — anonymizované case studies' },
    backHome: { en: '← BACK TO OVERVIEW', cs: '← ZPĚT NA PŘEHLED' },
  },
  role: {
    eyebrow: { en: 'Role profile', cs: 'Profil role' },
    whatIDo: { en: 'What I do in this role', cs: 'Co v této roli dělám' },
    topProjects: { en: 'Selected work in this lens', cs: 'Vybrané projekty v této roli' },
    relevantSkills: { en: 'Relevant skills', cs: 'Relevantní dovednosti' },
    relevantCerts: { en: 'Relevant credentials', cs: 'Relevantní certifikace' },
    otherRoles: { en: 'Other roles', cs: 'Další role' },
  },
  levels: {
    professional: { en: 'Professional', cs: 'Profesionální' },
    certified: { en: 'Certified', cs: 'Certifikováno' },
  },
  certGroups: {
    cloud: { en: 'Cloud', cs: 'Cloud' },
    ea: { en: 'Enterprise Architecture', cs: 'Enterprise architektura' },
    itsm: { en: 'IT Service Management', cs: 'IT Service Management' },
    earlier: { en: 'Earlier', cs: 'Dřívější' },
  },
  education: { title: { en: 'Education', cs: 'Vzdělání' } },
  skills: { title: { en: 'Technology skills', cs: 'Technologické dovednosti' } },
  footer: {
    blurb: {
      en: 'Solution & cloud architecture, designed and delivered. Public work anonymized; full dossier under NDA.',
      cs: 'Architektura řešení a cloudu — návrh i dodávka. Veřejné reference anonymizované; plné detaily pod NDA.',
    },
    site: { en: 'Site', cs: 'Web' },
    direct: { en: 'Direct', cs: 'Přímo' },
    legalHeading: { en: 'Legal / invoicing', cs: 'Právní a fakturační údaje' },
  },
  theme: {
    toggle: { en: 'Toggle dark mode', cs: 'Přepnout tmavý režim' },
  },
  notFound: {
    title: { en: 'Page not found', cs: 'Stránka nenalezena' },
    body: {
      en: "The page you're looking for doesn't exist — it may have moved in the site redesign.",
      cs: 'Hledaná stránka neexistuje — možná se přesunula při redesignu webu.',
    },
    back: { en: 'GO TO HOMEPAGE →', cs: 'NA ÚVODNÍ STRÁNKU →' },
  },
}

/** oklch tint from hue — all blue-family, fixed L/C, so role tints read as
 *  variations of the one accent, never seven colors. */
export function roleTint(hue: number, l = 0.52, c = 0.16): string {
  return `oklch(${l} ${c} ${hue})`
}

export function roleTintDark(hue: number): string {
  return roleTint(hue, 0.72, 0.14)
}

/** format YYYY-MM per locale, e.g. "January 2024" / "leden 2024" */
export function formatMonth(ym: string, lang: Lang): string {
  const [y, m] = ym.split('-').map(Number)
  const fmt = new Intl.DateTimeFormat(lang === 'cs' ? 'cs-CZ' : 'en-US', {
    month: 'long',
    year: 'numeric',
  })
  return fmt.format(new Date(y, m - 1, 1))
}

/** path helpers between language mirrors */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return lang === 'cs' ? `/cs${clean === '/' ? '/' : clean}` : clean
}
