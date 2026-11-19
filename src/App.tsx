import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Clipboard, Code2, Database, ExternalLink, Globe2, Grid2X2, House, Layers3, Menu, QrCode, Send, Sparkles, X } from 'lucide-react';
import { projects, services, type Project } from './data';
import { publicAsset } from './paths';

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL?.trim() || '';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      window.setTimeout(() => target?.scrollIntoView({ behavior: 'smooth' }), 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const lastMenuLinkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!open) return;

    document.documentElement.classList.add('mobile-menu-open');
    document.body.classList.add('mobile-menu-open');
    firstMenuLinkRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus({ preventScroll: true });
      } else if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstMenuLinkRef.current) {
          event.preventDefault();
          menuButtonRef.current?.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === menuButtonRef.current) {
          event.preventDefault();
          firstMenuLinkRef.current?.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === lastMenuLinkRef.current) {
          event.preventDefault();
          menuButtonRef.current?.focus({ preventScroll: true });
        }
      }
    };
    const desktop = window.matchMedia('(min-width: 901px)');
    const onDesktop = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.documentElement.classList.remove('mobile-menu-open');
      document.body.classList.remove('mobile-menu-open');
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open]);
  const nav = [
    ['#services', 'សេវាកម្ម'],
    ['#work', 'គំរូកម្មវិធី'],
    ['#process', 'របៀបធ្វើការ'],
    ['#faq', 'សំណួរញឹកញាប់'],
  ];
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="THE WOFT ទំព័រដើម" onClick={() => setOpen(false)}>
            <span className="brand-mark"><Code2 size={19} strokeWidth={2.3} /></span>
            <span>THE <strong>WOFT</strong><small>SOFTWARE & DIGITAL</small></span>
          </Link>
          <nav id="mobile-navigation" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
            {nav.map(([href, label], index) => <Link key={href} ref={index === 0 ? firstMenuLinkRef : undefined} to={`/${href}`} onClick={() => setOpen(false)}>{label}</Link>)}
            <Link ref={lastMenuLinkRef} className="mobile-contact" to="/#contact" onClick={() => setOpen(false)}>ពិភាក្សាគម្រោង <ArrowUpRight size={17} /></Link>
          </nav>
          <Link className="button button-small button-outline header-cta" to="/#contact">ពិភាក្សាគម្រោង <ArrowUpRight size={17} /></Link>
          <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={open ? 'បិទម៉ឺនុយ' : 'បើកម៉ឺនុយ'} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </header>
      {open && <button className="nav-backdrop" type="button" tabIndex={-1} aria-label="បិទម៉ឺនុយ" onClick={() => { setOpen(false); menuButtonRef.current?.focus({ preventScroll: true }); }} />}
    </>
  );
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-grid" aria-hidden="true" />
    <div className="container hero-inner">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> SOFTWARE DEVELOPMENT & DIGITAL SOLUTIONS</p>
        <h1>បម្លែងគំនិតរបស់អ្នក<br />ទៅជា<span>ប្រព័ន្ធដែលប្រើបានពិត។</span></h1>
        <p className="hero-description">យើងបង្កើតប្រព័ន្ធកម្មវិធី និងដំណោះស្រាយឌីជីថលដែលសមនឹងរបៀបធ្វើការរបស់អាជីវកម្មអ្នក។ ចាប់ពីប្រព័ន្ធគ្រប់គ្រង រហូតដល់ម៉ឺនុយ QR។</p>
        <div className="hero-actions">
          <a href="#work" className="button button-lime">មើលគំរូកម្មវិធី <ArrowUpRight size={19} /></a>
          <a href="#services" className="button button-ghost">ស្វែងយល់ពីសេវាកម្ម <ArrowDown size={18} /></a>
        </div>
        <div className="hero-proof"><span className="proof-dot" /> រចនាតាមតម្រូវការ · ប្រើបានលើគ្រប់អេក្រង់</div>
      </div>
      <div className="hero-visual" aria-label="គំរូទំព័រម៉ឺនុយឌីជីថល">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="browser-card hero-browser">
          <div className="browser-top"><span className="browser-dots"><i /><i /><i /></span><span>thewoft / selected work</span><span className="browser-lock">●</span></div>
          <div className="browser-content">
            <div className="browser-aside"><span className="mini-brand">W.</span><i /><i /><i /><i /></div>
            <div className="browser-main"><span className="mock-label">SAMPLE PROJECTS</span><h3>Digital experiences<br />made for real businesses.</h3><div className="mock-projects"><div><img src={publicAsset('projects/lotcha-cover.webp')} alt="" /><span>LOTCHA SIEMREAP</span></div><div><img src={publicAsset('projects/snaca-screen.webp')} alt="" /><span>SNACA CAFE</span></div></div></div>
          </div>
        </div>
        <div className="float-note"><span className="float-icon"><Sparkles size={19} /></span><span><strong>Built for your workflow</strong><small>Simple. Useful. Thoughtful.</small></span></div>
        <div className="hero-vertical">IDEA → DESIGN → DELIVERY</div>
      </div>
    </div>
    <div className="hero-bottom-line"><span>01 / WELCOME</span><span>SCROLL TO EXPLORE <ArrowDown size={14} /></span></div>
  </section>;
}

function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'section-heading-light' : ''}`}><p className="eyebrow"><span className="eyebrow-number">/</span> {eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

function ServiceIcon({ name }: { name: string }) {
  if (name === 'database') return <Database size={28} strokeWidth={1.7} />;
  if (name === 'globe') return <Globe2 size={28} strokeWidth={1.7} />;
  return <QrCode size={28} strokeWidth={1.7} />;
}

function Services() {
  return <section id="services" className="section services-section"><div className="container">
    <div className="section-top"><SectionHeading eyebrow="WHAT WE DO" title="សេវាកម្មសម្រាប់គំនិតគ្រប់ទំហំ" description="ជ្រើសរើសចំណុចចាប់ផ្តើមដែលសមនឹងអាជីវកម្មអ្នក។ ព័ត៌មានលម្អិត និងតម្លៃចុងក្រោយកំណត់តាមវិសាលភាពការងារ។" /><p className="section-side-note">មានគំនិតខុសពីនេះ?<br /><a href="#contact">ប្រាប់យើងអំពីគម្រោងអ្នក <ArrowUpRight size={15} /></a></p></div>
    <div className="service-grid">{services.map(s => <article className="service-card" key={s.number}><div className="service-card-top"><span>{s.number} / 03</span><span className="service-icon"><ServiceIcon name={s.icon} /></span></div><div className="service-card-body"><p className="service-english">{s.english}</p><h3>{s.title}</h3><p>{s.description}</p><div className="service-example">{s.examples}</div></div><div className="service-card-bottom"><span>តម្លៃចាប់ពី <strong>{s.price}</strong></span><a href="#contact" aria-label={`ពិភាក្សាអំពី ${s.title}`}><ArrowUpRight size={22} /></a></div></article>)}</div>
    <p className="pricing-note"><span>*</span> តម្លៃខាងលើជាតម្លៃចាប់ផ្តើមពីផ្ទាំងតម្លៃបច្ចុប្បន្ន។ យើងនឹងបញ្ជាក់មុខងារ និងការចំណាយពិតប្រាកដក្នុងសំណើតម្លៃនីមួយៗ។</p>
  </div></section>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card"><Link className="project-image" to={`/work/${project.slug}`} aria-label={`មើលព័ត៌មាន ${project.title}`}><img src={project.image} alt={project.imageAlt} loading="eager" /><span className="project-image-badge">LIVE SAMPLE <span>↗</span></span></Link><div className="project-card-info"><div className="project-meta"><span>0{index + 1} / DIGITAL MENU</span><span>PUBLIC DEMO</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="project-card-bottom"><span>{project.tags.slice(0, 2).join(' · ')}</span><Link to={`/work/${project.slug}`}>មើលលម្អិត <ArrowUpRight size={17} /></Link></div></div></article>;
}

function Work() {
  return <section id="work" className="section work-section"><div className="container"><div className="section-top"><SectionHeading eyebrow="SELECTED WORK" title="មើលអ្វីដែលយើងបានបង្កើត" description="សាកល្បងគំរូកម្មវិធីពិត និងមើលបទពិសោធន៍ដែលអតិថិជនអាចប្រើប្រាស់បាន។" /><div className="work-count"><strong>02</strong><span>PUBLIC EXAMPLES</span></div></div><div className="project-grid">{projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}</div><p className="work-footnote">គំរូទាំងនេះជាតំណទៅកាន់គេហទំព័រដែលមានស្រាប់។ លទ្ធផល និងមុខងារសម្រាប់គម្រោងថ្មីអាចខុសគ្នាតាមតម្រូវការ។</p></div></section>;
}

function Process() {
  const steps = [
    ['01', 'ស្វែងយល់', 'ប្រាប់យើងពីបញ្ហា គោលដៅ និងរបៀបធ្វើការរបស់អ្នក។'],
    ['02', 'កំណត់វិសាលភាព', 'យើងរៀបចំមុខងារ តម្លៃ និងផែនការអនុវត្តឱ្យច្បាស់។'],
    ['03', 'រចនា និងអភិវឌ្ឍ', 'បង្កើតកម្មវិធី ហើយពិនិត្យជាមួយអ្នកតាមដំណាក់កាល។'],
    ['04', 'ដាក់ឱ្យប្រើ', 'ប្រគល់ការងារ និងជួយដោះស្រាយបញ្ហាក្នុងរយៈពេលដែលបានព្រមព្រៀង។'],
  ];
  return <section id="process" className="section process-section"><div className="container process-layout"><div className="process-intro"><SectionHeading eyebrow="OUR PROCESS" title="ពីគំនិត ដល់ការប្រើប្រាស់ពិត" description="ដំណើរការងាយយល់ ដើម្បីឱ្យអ្នកដឹងថាគម្រោងកំពុងទៅដល់ណា។" light /><div className="process-decor"><Layers3 size={63} strokeWidth={1} /><span>BUILT WITH PURPOSE<br />DELIVERED WITH CARE</span></div></div><div className="process-steps">{steps.map(([n, title, detail]) => <div className="process-step" key={n}><span className="step-num">{n}</span><div><h3>{title}</h3><p>{detail}</p></div><ArrowUpRight className="step-arrow" size={20} /></div>)}</div></div></section>;
}

function Terms() {
  return <section className="section terms-section"><div className="container"><div className="terms-panel"><div><p className="eyebrow"><span className="eyebrow-number">/</span> CLEAR EXPECTATIONS</p><h2>ព័ត៌មានតម្លៃ<br />ដែលគួរដឹង</h2><p>គម្រោងនីមួយៗមានតម្រូវការផ្សេងគ្នា។ តម្លៃ និងលក្ខខណ្ឌចុងក្រោយត្រូវបានបញ្ជាក់ក្នុងសំណើតម្លៃ។</p><a className="text-link" href={publicAsset('quotation-poster.png')} target="_blank" rel="noopener noreferrer">មើលផ្ទាំងតម្លៃដើម <ExternalLink size={16} /></a></div><div className="terms-list"><div><strong>50%</strong><span>ប្រាក់កក់តាមផ្ទាំងតម្លៃ <small>បញ្ជាក់ពេលកំណត់វិសាលភាពការងារ</small></span></div><div><strong>30 ថ្ងៃ</strong><span>ការជួយកែ Bug <small>តាមលក្ខខណ្ឌដែលបានព្រមព្រៀង</small></span></div><div><strong>$10–$50</strong><span>ការកែប្រែបន្ថែម <small>អាស្រ័យលើប្រភេទការកែប្រែ</small></span></div><div><strong>ដាច់ដោយឡែក</strong><span>Hosting និង Domain <small>បញ្ជាក់ក្នុងសំណើតម្លៃ</small></span></div></div></div></div></section>;
}

function FAQ() {
  const items = [
    ['ប្រព័ន្ធ Offline និង Online ខុសគ្នាយ៉ាងដូចម្តេច?', 'ប្រព័ន្ធ Offline អាចប្រើបានដោយមិនចាំបាច់មានអ៊ីនធឺណិតជានិច្ច។ ប្រព័ន្ធ Online ត្រូវការការតភ្ជាប់ ដើម្បីចូលប្រើទិន្នន័យ និងមុខងារតាមអ៊ីនធឺណិត។ របៀបដំណើរការពិតប្រាកដអាស្រ័យលើការរចនាគម្រោង។'],
    ['តើតម្លៃដែលបង្ហាញជាតម្លៃចុងក្រោយឬ?', 'មិនមែនទេ។ តម្លៃទាំងនេះជាតម្លៃចាប់ផ្តើម ឬតម្លៃសម្គាល់ពីផ្ទាំងសេវាកម្ម។ តម្លៃចុងក្រោយអាស្រ័យលើមុខងារ ការរចនា និងវិសាលភាពការងារ។'],
    ['តើ Hosting និង Domain រួមក្នុងតម្លៃដែរឬទេ?', 'ផ្ទាំងសេវាកម្មបញ្ជាក់ថា Hosting និង Domain គិតដាច់ដោយឡែក។ យើងនឹងបង្ហាញច្បាស់ក្នុងសំណើតម្លៃមុនចាប់ផ្តើមការងារ។'],
    ['តើត្រូវផ្តល់ព័ត៌មានអ្វីខ្លះសម្រាប់ស្នើតម្លៃ?', 'សូមប្រាប់ពីប្រភេទអាជីវកម្ម បញ្ហាដែលចង់ដោះស្រាយ មុខងារសំខាន់ៗ អ្នកប្រើប្រាស់ និងពេលវេលាដែលអ្នកចង់បាន។ បើមានគំរូដែលអ្នកចូលចិត្ត អ្នកអាចភ្ជាប់តំណបាន។'],
  ];
  return <section id="faq" className="section faq-section"><div className="container faq-layout"><SectionHeading eyebrow="GOOD TO KNOW" title="សំណួរដែលគេសួរញឹកញាប់" description="ចម្លើយខ្លីៗមុនពេលយើងពិភាក្សាគម្រោងរបស់អ្នក។" /><div className="faq-list">{items.map(([q, a], i) => <details key={q} open={i === 0}><summary><span>{q}</span><ChevronDown size={21} /></summary><p>{a}</p></details>)}</div></div></section>;
}

function InquiryForm() {
  const params = new URLSearchParams(useLocation().search);
  const projectName = params.get('project') || '';
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState(projectName ? 'similar' : '');
  const [message, setMessage] = useState(projectName ? `ខ្ញុំចង់បង្កើតគម្រោងស្រដៀងនឹង ${projectName}។` : '');
  const [status, setStatus] = useState<'idle' | 'copied' | 'error' | 'email'>('idle');
  const brief = `សំណើគម្រោងសម្រាប់ THE WOFT\nឈ្មោះ: ${name}\nទំនាក់ទំនង: ${contact}\nប្រភេទគម្រោង: ${type}\nព័ត៌មានគម្រោង: ${message}`;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    if (CONTACT_EMAIL) {
      const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`សំណើគម្រោងពី ${name}`)}&body=${encodeURIComponent(brief)}`;
      window.location.href = href;
      setStatus('email');
      return;
    }
    try {
      await navigator.clipboard.writeText(brief);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }
  return <section id="contact" className="section contact-section"><div className="container contact-layout"><div className="contact-intro"><p className="eyebrow"><span className="eyebrow-number">/</span> START A PROJECT</p><h2>មានគំនិតមួយ?<br /><span>ចាប់ផ្តើមពីការសន្ទនា។</span></h2><p>ប្រាប់យើងបន្តិចអំពីអ្វីដែលអ្នកចង់បង្កើត។ ទម្រង់នេះជួយរៀបចំព័ត៌មានសម្រាប់សំណើគម្រោង។</p><div className="contact-mark"><span>W.</span><span>THE WOFT<br />DEVELOP · INNOVATE · DELIVER</span></div></div><div className="form-card"><div className="form-head"><span className="form-icon"><Send size={22} /></span><span>PROJECT INQUIRY <small>01 / 01</small></span></div><h3>ប្រាប់យើងពីគម្រោងរបស់អ្នក</h3><form onSubmit={handleSubmit}><div className="form-row"><label>ឈ្មោះរបស់អ្នក *<input value={name} onChange={e => { setName(e.target.value); setStatus('idle'); }} required minLength={2} placeholder="ឈ្មោះពេញ" /></label><label>លេខទូរស័ព្ទ ឬ Email *<input value={contact} onChange={e => { setContact(e.target.value); setStatus('idle'); }} required placeholder="វិធីទំនាក់ទំនង" /></label></div><label>ប្រភេទគម្រោង *<select value={type} onChange={e => { setType(e.target.value); setStatus('idle'); }} required><option value="">ជ្រើសរើសប្រភេទ</option><option value="offline">ប្រព័ន្ធ Offline</option><option value="online">ប្រព័ន្ធ Online</option><option value="qr-menu">QR Digital Menu</option><option value="similar">គម្រោងស្រដៀងនឹងគំរូ</option><option value="other">ផ្សេងៗ</option></select></label><label>ព័ត៌មានខ្លីអំពីគម្រោង *<textarea value={message} onChange={e => { setMessage(e.target.value); setStatus('idle'); }} required minLength={12} rows={4} placeholder="អាជីវកម្មរបស់អ្នក បញ្ហាដែលចង់ដោះស្រាយ និងមុខងារដែលត្រូវការ..." /></label><button className="button button-submit" type="submit">{CONTACT_EMAIL ? 'បើកកម្មវិធី Email' : 'ចម្លងសំណើគម្រោង'} {CONTACT_EMAIL ? <ArrowUpRight size={19} /> : <Clipboard size={19} />}</button><p className="form-disclaimer">{CONTACT_EMAIL ? 'កម្មវិធី Email នឹងបើកជាមួយសំណើរបស់អ្នក។ សូមចុច Send នៅក្នុង Email ដើម្បីផ្ញើ។' : 'មិនទាន់មានអាសយដ្ឋានទទួលសំណើ។ ចម្លងព័ត៌មាននេះ ហើយផ្ញើតាមវិធីទំនាក់ទំនងដែលអ្នកបានព្រមព្រៀង។'}</p><div className="form-status" aria-live="polite">{status === 'copied' && <span className="success"><Check size={17} /> បានចម្លងសំណើទៅកាន់ Clipboard។</span>}{status === 'error' && <span className="error">មិនអាចចម្លងបានទេ។ សូមព្យាយាមម្តងទៀត។</span>}{status === 'email' && <span className="success"><Check size={17} /> សូមពិនិត្យ និងផ្ញើសារនៅក្នុងកម្មវិធី Email។</span>}</div></form></div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-main"><div><Link to="/" className="footer-brand">THE <strong>WOFT</strong><span>SOFTWARE & DIGITAL SOLUTIONS</span></Link><p>បង្កើតដំណោះស្រាយឌីជីថលដែលងាយប្រើ<br />និងសមនឹងអាជីវកម្មរបស់អ្នក។</p></div><div className="footer-links"><span>EXPLORE</span><Link to="/#services">សេវាកម្ម</Link><Link to="/#work">គំរូកម្មវិធី</Link><Link to="/#process">របៀបធ្វើការ</Link></div><div className="footer-links"><span>INFORMATION</span><Link to="/#faq">សំណួរញឹកញាប់</Link><Link to="/#contact">រៀបចំសំណើ</Link><a href={publicAsset('quotation-poster.png')} target="_blank" rel="noopener noreferrer">ផ្ទាំងតម្លៃដើម</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} THE WOFT. ALL RIGHTS RESERVED.</span><span>DEVELOP · INNOVATE · DELIVER</span></div></footer>;
}

function MobileTabBar() {
  const { pathname } = useLocation();
  const [active, setActive] = useState('top');

  useEffect(() => {
    if (pathname !== '/') return;
    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        let current = 'top';
        for (const id of ['services', 'work', 'contact']) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  const current = pathname === '/' ? active : pathname.startsWith('/work/') ? 'work' : 'top';
  const tabs = [
    { id: 'top', label: 'ទំព័រដើម', icon: House },
    { id: 'services', label: 'សេវាកម្ម', icon: Layers3 },
    { id: 'work', label: 'គំរូ', icon: Grid2X2 },
    { id: 'contact', label: 'ទំនាក់ទំនង', icon: Send },
  ];

  return <nav className="mobile-tab-bar" aria-label="ការរុករកសម្រាប់ទូរស័ព្ទ">
    {tabs.map(({ id, label, icon: Icon }) => <Link key={id} to={`/#${id}`} className={current === id ? 'is-current' : ''} aria-current={current === id ? 'location' : undefined}><Icon size={21} strokeWidth={current === id ? 2.3 : 1.9} /><span>{label}</span></Link>)}
  </nav>;
}

function HomePage() {
  return <><Hero /><Services /><Work /><Process /><Terms /><FAQ /><InquiryForm /></>;
}

function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  useEffect(() => { document.title = project ? `${project.title} — THE WOFT` : 'Project not found — THE WOFT'; return () => { document.title = 'THE WOFT — Software Development & Digital Solutions'; }; }, [project]);
  if (!project) return <main className="not-found container"><h1>រកមិនឃើញគម្រោងនេះទេ</h1><Link to="/" className="button button-dark">ត្រឡប់ទៅទំព័រដើម <ArrowRight size={18} /></Link></main>;
  return <main className="project-page"><div className="project-page-top"><div className="container"><Link to="/#work" className="back-link"><ArrowLeft size={17} /> ត្រឡប់ទៅគំរូកម្មវិធី</Link><p className="eyebrow">SELECTED WORK / DIGITAL MENU</p><div className="detail-hero-row"><div><h1>{project.title}</h1><p>{project.subtitle}</p></div><a className="button button-lime" href={project.demoUrl} target="_blank" rel="noopener noreferrer">សាកល្បងគំរូពិត <ExternalLink size={18} /></a></div></div></div><div className="container detail-content"><div className="detail-image"><img src={project.image} alt={project.imageAlt} /></div><div className="detail-grid"><div><span className="detail-kicker">ABOUT THE PROJECT</span><h2>អំពីគំរូនេះ</h2><p>{project.detail}</p><div className="detail-tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div></div><div className="detail-feature-box"><span className="detail-kicker">FEATURE HIGHLIGHTS</span><h3>ចំណុចសំខាន់ៗ</h3><ul>{project.features.map(f => <li key={f}><Check size={17} />{f}</li>)}</ul><p className="detail-note">ព័ត៌មាននេះពិពណ៌នាអំពីគំរូដែលបង្ហាញ។ មុខងារសម្រាប់គម្រោងថ្មីកំណត់តាមសំណើតម្លៃ។</p></div></div><div className="detail-next"><div><p className="eyebrow">YOUR TURN</p><h2>ចង់បង្កើតអ្វីមួយស្រដៀងនេះ?</h2></div><Link className="button button-dark" to={`/?project=${encodeURIComponent(project.title)}#contact`}>ពិភាក្សាគម្រោង <ArrowUpRight size={18} /></Link></div></div></main>;
}

export default function App() {
  return <><ScrollManager /><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/work/:slug" element={<ProjectPage />} /><Route path="*" element={<main className="not-found container"><h1>រកមិនឃើញទំព័រនេះទេ</h1><Link to="/" className="button button-dark">ត្រឡប់ទៅទំព័រដើម <ArrowRight size={18} /></Link></main>} /></Routes><Footer /><MobileTabBar /></>;
}
