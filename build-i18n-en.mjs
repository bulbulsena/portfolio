/**
 * Generates i18n-en.js from Turkish data in index.html + translation maps.
 */
import fs from 'fs';
import vm from 'vm';

const html = fs.readFileSync('index.html', 'utf8');

function extractObject(name) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`Missing ${name}`);
  let i = start + marker.length;
  while (html[i] === ' ') i++;
  if (html[i] !== '{') throw new Error(`Bad start for ${name}`);
  let depth = 0;
  let inStr = false;
  let strCh = '';
  let escape = false;
  for (let j = i; j < html.length; j++) {
    const c = html[j];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (c === '\\') { escape = true; continue; }
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; continue; }
    if (c === '{') depth++;
    if (c === '}') {
      depth--;
      if (depth === 0) {
        const code = `(${html.slice(i, j + 1)})`;
        return vm.runInNewContext(code);
      }
    }
  }
  throw new Error(`Unclosed ${name}`);
}

const panelDataTR = extractObject('panelDataTR');
const projectDataTR = extractObject('projectDataTR');
const itemDataTR = extractObject('itemDataTR');

/** Global phrase replacements (longest first) */
const PHRASES = [
  ['Zararlı Yazılım Analisti & Tersine Mühendis', 'Malware Analyst & Reverse Engineer'],
  ['Zararlı Yazılım Analisti &amp; Tersine Mühendis', 'Malware Analyst &amp; Reverse Engineer'],
  ['Zararlı Yazılım Analizi Stajyeri – Siber Tehdit İstihbaratı', 'Malware Analysis Intern – Cyber Threat Intelligence'],
  ['Zararlı Yazılım Analisti & Tersine Mühendis | Üye', 'Malware Analyst & Reverse Engineer | Member'],
  ['Zararlı Yazılım Analiz Raporları', 'Malware Analysis Reports'],
  ['Zararlı Yazılım Analizi & Tersine Mühendislik', 'Malware Analysis & Reverse Engineering'],
  ['Zararlı Yazılım İncelemesi', 'Malware Examination'],
  ['Zararlı Yazılım Analizi', 'Malware Analysis'],
  ['Zararlı Yazılım', 'Malware'],
  ['Siber Tehdit İstihbaratı', 'Cyber Threat Intelligence'],
  ['Tehdit İstihbaratı', 'Threat Intelligence'],
  ['Siber Güvenlik Uzmanlaşma Eğitimi', 'Cybersecurity Specialization Program'],
  ['Siber Güvenlik Topluluğu', 'Cybersecurity Community'],
  ['Siber Güvenlik', 'Cybersecurity'],
  ['Tersine Mühendislik', 'Reverse Engineering'],
  ['Yönetim Bilişim Sistemleri', 'Management Information Systems'],
  ['Yönetim Kurulu Üyesi', 'Board Member'],
  ['Ar-Ge Siber Ekip Liderliği', 'R&D Cyber Team Lead'],
  ['Organizasyon Komite Başkanı', 'Organization Committee Chair'],
  ['Bilgi İşlem Stajyeri', 'IT Intern'],
  ['Gönüllü Stajyer', 'Volunteer Intern'],
  ['DevFest\'24 Yönetim Ekibi Gönüllü Üyesi', 'DevFest\'24 Volunteer – Organizing Team'],
  ['Bursa & Uludağ Üniversitesi Temsilcisi', 'Bursa & Uludağ University Representative'],
  ['Server Kurulum, Onarım ve Koruma Elemanı', 'Server Setup, Maintenance & Security Officer'],
  ['Detay için tıklayın', 'Click for details'],
  ['DETAY PENCERESİ — KARTA TIKLA', 'DETAIL VIEW — CLICK CARD'],
  ['[ DETAY → ]', '[ DETAILS → ]'],
  ['DETAY → ✦', 'DETAILS → ✦'],
  ['DEVAM EDİYOR', 'IN PROGRESS'],
  ['Devam Ediyor', 'Ongoing'],
  ['Halen', 'Present'],
  ['TAMAMLANDI', 'COMPLETED'],
  ['Tamamlandı', 'Completed'],
  ['AKTİF', 'ACTIVE'],
  ['YÜKSEK', 'HIGH'],
  ['ORTA', 'MEDIUM'],
  ['RİSK', 'RISK'],
  ['GÖRSEL', 'IMAGE'],
  ['ÖDÜL', 'AWARD'],
  ['GÖRSELİ', 'AWARD IMAGE'],
  ['EĞİTİM // AKADEMİK GEÇMİŞ', 'EDUCATION // ACADEMIC BACKGROUND'],
  ['DENEYİM // 2021 → HALEN — 8+ POZİSYON', 'EXPERIENCE // 2021 → PRESENT — 8+ ROLES'],
  ['SKILLS // SİBER GÜVENLİK + WEB GELİŞTİRME', 'SKILLS // CYBERSECURITY + WEB DEVELOPMENT'],
  ['SERTİFİKALAR // 12+ SERTİFİKA — 2022→2026', 'CERTIFICATES // 12+ CERTIFICATES — 2022→2026'],
  ['PROJELER // YARIŞMALAR & GITHUB', 'PROJECTS // COMPETITIONS & GITHUB'],
  ['REFERANSLAR // AKADEMİK & PROFESYONEL', 'REFERENCES // ACADEMIC & PROFESSIONAL'],
  ['TASARIM // YARATICI ÇALIŞMALAR — WEB · BASKI · AFİŞ', 'DESIGN // CREATIVE WORK — WEB · PRINT · POSTER'],
  ['RAPORLAR // ZARARLI YAZILIM ANALİZİ & TERSİNE MÜHENDİSLİK', 'REPORTS // MALWARE ANALYSIS & REVERSE ENGINEERING'],
  ['ÜNİVERSİTE & UZMANLAŞMA', 'UNIVERSITY & SPECIALIZATION'],
  ['SİBER GÜVENLİK ARAÇLARI', 'CYBERSECURITY TOOLS'],
  ['PROGRAMLAMA & WEB GELİŞTİRME', 'PROGRAMMING & WEB DEVELOPMENT'],
  ['KİŞİSEL YETKİNLİKLER', 'SOFT SKILLS'],
  ['GELİŞTİRME ORTAMI', 'DEVELOPMENT ENVIRONMENT'],
  ['YARIŞMA & AKADEMİK PROJELER', 'COMPETITIONS & ACADEMIC PROJECTS'],
  ['GITHUB PROJELERİ', 'GITHUB PROJECTS'],
  ['AKADEMİK REFERANSLAR', 'ACADEMIC REFERENCES'],
  ['DİJİTAL TASARIM', 'DIGITAL DESIGN'],
  ['BASKI & YAYIM', 'PRINT & PUBLISHING'],
  ['KURUMSAL KİMLİK (PLANLANAN)', 'CORPORATE IDENTITY (PLANNED)'],
  ['ARAÇLAR & BECERİLER', 'TOOLS & SKILLS'],
  ['ANALİZ RAPORLARI', 'ANALYSIS REPORTS'],
  ['Analiz Raporu', 'Analysis Report'],
  ['Rapor görseli · Tıkla', 'Report preview · Click'],
  ['Mobil Hava Kalitesi İzleme', 'Mobile Air Quality Monitoring'],
  ['1.LİK ÖDÜLÜ', '1ST PRIZE'],
  ['Sızma Testi', 'Penetration Testing'],
  ['Web Güvenliği', 'Web Security'],
  ['Bilişim Teknolojileri', 'Information Technologies'],
  ['Web Geliştirme', 'Web Development'],
  ['Öğretim Üyesi · Bölüm Hocam', 'Faculty Member · Department Advisor'],
  ['Öğretim Üyesi · Tez Danışmanım & Alan Hocam', 'Faculty Member · Thesis Advisor & Domain Instructor'],
  ['Tez Danışmanı', 'Thesis Advisor'],
  ['Bölüm Hocam', 'Department Advisor'],
  ['Alan Hocam', 'Domain Instructor'],
  ['Sertifikalar kısmını aç', 'Open certificates section'],
  ['Üniversite Web', 'University Website'],
  ['Sertifikayı Gör', 'View Certificate'],
  ['PDF’yi yeni sekmede aç', 'Open PDF in new tab'],
  ['PowerPoint dosyasını indir', 'Download PowerPoint file'],
  ['Sunumu incelemek için dosyayı indirebilirsiniz.', 'Download the file to review the presentation.'],
  ['PROJE HAKKINDA', 'ABOUT THE PROJECT'],
  ['KAZANILAN YETKİNLİKLER', 'SKILLS GAINED'],
  ['TEKNOLOJİLER', 'TECHNOLOGIES'],
  ['HAKKINDA', 'ABOUT'],
  ['TEKNOLOJİLER / ARAÇLAR', 'TECHNOLOGIES / TOOLS'],
  ['PROJE VİDEOSU', 'PROJECT VIDEO'],
  ['SUNUM (PDF)', 'PRESENTATION (PDF)'],
  ['GÖRSEL / FOTOĞRAF', 'IMAGE / PHOTO'],
  ['EKLENECEK', 'COMING SOON'],
  ['YÜKLENİYOR...', 'LOADING...'],
  ['ZARALI YAZILIM ANALİSTİ_v2.4', 'MALWARE_ANALYST_v2.4'],
  ['ZARALI YAZILIM ANALİSTİ', 'MALWARE ANALYST'],
  ['SIBER_GUVENLIK // ZARALI_YAZILIM', 'CYBERSECURITY // MALWARE'],
  ['DURUM: [AKTİF] // BURSA_TR', 'STATUS: [ACTIVE] // BURSA_TR'],
  ['ZARALI YAZILIM ANALİSTİ & TERSİNE MÜHENDİS', 'MALWARE ANALYST & REVERSE ENGINEER'],
  ['BAŞLAT', 'START'],
  ['KAPAT', 'CLOSE'],
  ['GERİ', 'BACK'],
  ['EĞİTİM', 'EDUCATION'],
  ['DENEYİM', 'EXPERIENCE'],
  ['YETENEKLER', 'SKILLS'],
  ['TEKNİK YETENEKLER', 'TECHNICAL SKILLS'],
  ['TEKNİK', 'TECHNICAL'],
  ['EK SUNUM (PowerPoint)', 'EXTRA PRESENTATION (PowerPoint)'],
  ['EK SUNUM (PowerPoint — DURU_2)', 'EXTRA PRESENTATION (PowerPoint — DURU_2)'],
  ['PROJE PDFİ', 'PROJECT PDF'],
  ['Görselleştirme', 'Visualization'],
  ['Veri Görselleştirme', 'Data Visualization'],
  ['Görsel Anlatım', 'Visual Storytelling'],
  ['Görsel Hiyerarşi', 'Visual Hierarchy'],
  ['Sunum Hazırlama', 'Presentation Design'],
  ['Proje Sunumu', 'Project Presentation'],
  ['Kurumsal İletişim', 'Corporate Communication'],
  ['Takım Çalışması', 'Teamwork'],
  ['Mobil Geliştirme', 'Mobile Development'],
  ['Ders Projesi', 'Course Project'],
  ['Ortak Web Projesi', 'Collaborative Web Project'],
  ['Sertifikalar kısmını aç', 'Open certificates section'],
  ['SOLUK Projesini Gör', 'View SOLUK project'],
  ['Üniversite Web', 'University website'],
  ['SERTİFİKALAR', 'CERTIFICATES'],
  ['PROJELER', 'PROJECTS'],
  ['REFERANSLAR', 'REFERENCES'],
  ['TASARIM', 'DESIGN'],
  ['RAPORLAR', 'REPORTS'],
  ['TASARIM ÇALIŞMALARI', 'DESIGN WORK'],
  ['Takım Liderliği', 'Team Leadership'],
  ['Proje Yönetimi', 'Project Management'],
  ['Teknik Rapor Yazımı', 'Technical Report Writing'],
  ['Sunum & İletişim', 'Presentation & Communication'],
  ['Problem Çözme', 'Problem Solving'],
  ['Araştırma & Geliştirme', 'Research & Development'],
  ['B1 İngilizce', 'B1 English'],
  ['UI/UX Tasarım', 'UI/UX Design'],
  ['Baskı Tasarımı', 'Print Design'],
  ['Mezuniyet:', 'Graduation:'],
  ['Eylül', 'September'],
  ['Ocak', 'January'],
  ['Şubat', 'February'],
  ['Mart', 'March'],
  ['Nisan', 'April'],
  ['Mayıs', 'May'],
  ['Haziran', 'June'],
  ['Temmuz', 'July'],
  ['Ağustos', 'August'],
  ['Ekim', 'October'],
  ['Aralık', 'December'],
  ['Kasım', 'November'],
  ['Lisans', "Bachelor's"],
  ['Staj', 'Internship'],
  ['Gönüllülük', 'Volunteering'],
  ['Organizasyon', 'Organization'],
  ['Liderlik', 'Leadership'],
  ['Yönetim', 'Management'],
  ['Topluluk', 'Community'],
  ['Temsilcilik', 'Representation'],
  ['// AKADEMİK', '// ACADEMIC'],
  ['AKADEMİK', 'ACADEMIC'],
  ['Otomasyon', 'Automation'],
  ['değerlendirme', 'assessment'],
  ['İK / değerlendirme', 'HR / assessment'],
  ['Kurumsal iş birliği sunumu', 'Corporate collaboration presentation'],
  ['Poster tasarımı', 'Poster design'],
  ['Planlanan', 'Planned'],
  ['Kurumsal set', 'Corporate set'],
  ['Yeşil / siyah tema', 'Green / black theme'],
  ['Asansör teması', 'Elevator theme'],
  ['Film editi', 'Film edit'],
  ['ön izleme', 'preview'],
  ['Masal kitabı', "Children's storybook"],
  ['Çocuk Masal Kitabı', "Children's Storybook"],
  ['Hikaye + Photoshop', 'Story + Photoshop'],
  ['Hikaye + görsel tasarım', 'Story + visual design'],
  ['Kurumsal zarf', 'Corporate envelope'],
  ['Kartvizit', 'Business card'],
  ['Antetli kağıt', 'Letterhead'],
  ['Antetli Kağıt', 'Letterhead'],
  ['Kurumsal zarf', 'Corporate envelope'],
  ['Onur Belgesi', 'Honors Certificate'],
  ['kampüs / üniversite fotoğrafı', 'campus / university photo'],
  ['Sertifika görseli (yükleyin)', 'Certificate image'],
  ['Sertifika görseli', 'Certificate image'],
  ['doğrula', 'verify'],
  ['indir', 'download'],
  ['Tıkla', 'Click'],
  ['Tıkla;', 'Click;'],
  ['Bursa, Türkiye', 'Bursa, Turkey'],
  ['TASARIM ÇALIŞMALARI', 'DESIGN WORK'],
  ['YARATICI ÇALIŞMALAR', 'CREATIVE WORK'],
  ['WEB ARAYÜZÜ', 'WEB INTERFACE'],
  ['web arayüzü', 'web interface'],
  ['web arayüz', 'web interface'],
  ['WEB ARAYUZU', 'WEB INTERFACE'],
  ['GRAFİK ANİMASYON DERSİ', 'GRAPHIC ANIMATION CLASS'],
  ['GRAFİK ANİMASYON', 'GRAPHIC ANIMATION'],
  ['FİLM EDİTİ', 'FILM EDIT'],
  ['TİPOGRAFİ AFİŞİ', 'TYPOGRAPHY POSTER'],
  ['tipografi afişi', 'typography poster'],
  ['tipografi afisi', 'typography poster'],
  ['ÇOCUK MASAL KİTABI', "CHILDREN'S STORYBOOK"],
  ['Masal kitabı', "children's storybook"],
  ['PROJE AFİŞİ', 'PROJECT POSTER'],
  ['proje afişi', 'project poster'],
  ['KURUMSAL ZARF', 'CORPORATE ENVELOPE'],
  ['KARTVİZİT', 'BUSINESS CARD'],
  ['ANTETLİ KAĞIT', 'LETTERHEAD'],
  ['Antetli kağıt', 'Letterhead'],
  ['Antetli kagit', 'Letterhead'],
  ['ekip fotoğrafı', 'team photo'],
  ['ekip/proje görseli', 'team/project image'],
  ['birincilik görseli', 'first prize image'],
  ['önizleme görseli', 'preview image'],
  ['ekran görüntüsü', 'screenshot'],
  ['animasyon videosu', 'animation video'],
  ['proje görseli', 'project image'],
  ['proje teması / arayüz', 'project theme / interface'],
  ['eğitim görselim', 'training visual'],
  ['deneyim görseli', 'experience visual'],
  ['sertifikası', 'certificate'],
  ['katılım sertifikası', 'participation certificate'],
  ['katılım belgesi', 'term participation certificate'],
  ['Katılım Sertifikası', 'Participation Certificate'],
  ['ödül görseli', 'award image'],
  ['rapor önizleme görseli', 'report preview image'],
  ['Alternatif zarf yerleşimi', 'Alternative envelope layout'],
  ['Kurumsal zarf tasarımı', 'Corporate envelope design'],
  ['Kurumsal kartvizit', 'Corporate business card'],
  ['Antetli kağıt tasarımı', 'Letterhead design'],
  ['Proje afişi çalışması', 'Project poster artwork'],
  ['PDF önizleme', 'PDF preview'],
  ['Fikir Yarışması', 'Idea Competition'],
  ['Yazılım ve Teknoloji Okulu', 'Software and Technology School'],
  ['Türkiye Siber Vatan Programı', 'Turkey Cyber Homeland Program'],
  ['Siber Güvenlik Etkinliği', 'Cybersecurity Event'],
  ['İleri Seviye Girişimcilik Eğitimi', 'Advanced Entrepreneurship Training'],
  ['Ağ ve Uygulama Sızma Testi', 'Network and Application Penetration Testing'],
  ['Temel Girişimcilik Programı', 'Basic Entrepreneurship Program'],
  ['1.LİK ÖDÜLÜ — SOLUK PROJESİ', '1ST PRIZE — SOLUK PROJECT'],
  ['ZARARLI YAZILIM ANALİZ RAPORLARI', 'MALWARE ANALYSIS REPORTS'],
  ['ZARARLIYAZILIM ANALİZİ', 'MALWARE ANALYSIS'],
  ['İnsanlık Yararına Teknolojiler', 'Technologies for Humanity'],
  ['Web Programlama Dersi', 'Web Programming Course'],
  ['Kurumsal iş birliği sunumu', 'Corporate collaboration presentation'],
  ['RAG kampüs asistanı', 'RAG campus assistant'],
  ['Emlak asistanı', 'real estate assistant'],
  ['Arşiv Otomasyonu', 'Archive Automation'],
  ['değerlendirme aracı', 'assessment tool'],
  ['Okul birincisi', 'valedictorian'],
  ['Bölüm Hocam', 'Department advisor'],
  ['Tez Danışmanım', 'Thesis advisor'],
  ['Komite Başkanlığı', 'Committee chair'],
  ['Organizasyon komite başkanlığı', 'Organization committee chair'],
  ['bilgi işlem stajı', 'IT internship'],
  ['gönüllü staj', 'volunteer internship'],
  ['sunucu kurulum', 'server setup'],
  ['siber ekip görseli', 'cyber team visual'],
  ['tehdit istihbaratı deneyimi', 'threat intelligence experience'],
  ['İnegöl Belediyesi', 'İnegöl Municipality'],
  ['iş birliği', 'collaboration'],
  ['Sertifika doğrula', 'Verify certificate'],
  ['YouTube videosu', 'YouTube video'],
  ['Masal kitabı PDF', 'Storybook PDF'],
  ['SOLUK Projesini Gör', 'View SOLUK project'],
  ['Marka tasarımı', 'Brand design'],
  ['Planlanan kurumsal kimlik', 'Planned corporate identity'],
  ['UI/UX Tasarımı', 'UI/UX Design'],
  ['Tipografi Afiş', 'Typography Poster'],
  ['Logo Tasarımı', 'Logo Design'],
  ['Renk Stratejisi', 'Color Strategy'],
  ['Marka Kimliği', 'Brand Identity'],
  ['Afiş Tasarımı', 'Poster Design'],
  ['Poster Kompozisyonu', 'Poster Composition'],
  ['Hikaye Kurgusu', 'Storytelling'],
  ['Yayın Tasarımı', 'Publication Design'],
  ['Kurumsal Kimlik Kurgusu', 'Corporate Identity Design'],
  ['Baskı Şablonu', 'Print Template'],
  ['Marka Tutarlılığı', 'Brand Consistency'],
  ['Doküman Tasarımı', 'Document Design'],
  ['Baskı Materyali', 'Print Material'],
  ['Konsept Tasarım', 'Concept Design'],
  ['Film Editi', 'Film Editing'],
  ['Girişimcilik Temelleri', 'Entrepreneurship Fundamentals'],
  ['Girişimcilik', 'Entrepreneurship'],
  ['İnovasyon', 'Innovation'],
  ['Bilgi Mimarisi', 'Information Architecture'],
  ['Responsive Tasarım', 'Responsive Design'],
  ['HTML/CSS Layout', 'HTML/CSS Layout'],
  ['POZİSYON', 'ROLES'],
  ['AFİŞ', 'POSTER'],
  ['BASKI', 'PRINT'],
  ['YARATICI', 'CREATIVE'],
  ['ÇALIŞMALAR', 'WORK'],
  ['GÖRSEL', 'IMAGE'],
  ['ÖDÜL', 'AWARD'],
  ['GÖRSELİ', 'IMAGE'],
  ['yükleyin', 'upload'],
  ['Mart ', 'March '],
  ['Şubat', 'February'],
  ['Nisan ', 'April '],
  ['Kasım ', 'November '],
  ['Eylül ', 'September '],
  ['Haziran ', 'June '],
  ['Ocak ', 'January '],
  ['Ağustos ', 'August '],
  ['Aralık ', 'December '],
  ['— afiş', '— poster'],
  [' — görsel ', ' — image '],
  ['görsel 1', 'image 1'],
  ['görsel 2', 'image 2'],
  ['görsel 3', 'image 3'],
  ['görsel 4', 'image 4'],
  ['ekran 1', 'screen 1'],
  ['ekran 2', 'screen 2'],
  ['ekran 3', 'screen 3'],
  ['ekran 4', 'screen 4'],
  ['Tamamlandı', 'Completed'],
  ['Devam Ediyor', 'Ongoing'],
  ['ULUSİBER – ULUDAĞ ÜNİVERSİTESİ SİBER GÜVENLİK TOPLULUĞU', 'ULUSIBER – ULUDAĞ UNIVERSITY CYBERSECURITY COMMUNITY'],
  ['UYBIST – Ar-Ge Siber Ekip Liderliği', 'UYBIST – R&D Cyber Team Lead'],
  ['UYBIST – Organizasyon Komite Başkanı', 'UYBIST – Organization Committee Chair'],
  ['ULUDAĞ ÜNİVERSİTESİ – Server & IT', 'ULUDAĞ UNIVERSITY – Server & IT'],
  ['ANTICVERSE – Bursa & Uludağ Temsilcisi', 'ANTICVERSE – Bursa & Uludağ Representative'],
  ['MERAM BELEDİYESİ', 'MERAM MUNICIPALITY'],
  ['İNEGÖL BELEDİYESİ', 'İNEGÖL MUNICIPALITY'],
  ['BİR FİKİR BİR İNEGÖL – 1.LİK ÖDÜLÜ', 'ONE IDEA ONE İNEGÖL – 1ST PRIZE'],
  ['YAZILIM VE TEKNOLOJİ OKULU', 'SOFTWARE AND TECHNOLOGY SCHOOL'],
  ['TÜRKİYE SİBER VATAN PROGRAMI 2025', 'TURKEY CYBER HOMELAND PROGRAM 2025'],
  ["SKYDAYS: TÜRKİYE'NİN EN BÜYÜK SİBER GÜVENLİK ETKİNLİĞİ KATILIM SERTİFİKASI", "SKYDAYS: TURKEY'S LARGEST CYBERSECURITY EVENT — PARTICIPATION CERTIFICATE"],
  ['W-ENERGY TEMEL GİRİŞİMCİLİK PROGRAMI', 'W-ENERGY BASIC ENTREPRENEURSHIP PROGRAM'],
  ['AFİYETLE BLOG — Ortak Web Projesi', 'AFİYETLE BLOG — Collaborative Web Project'],
  ['SOLUK — Mobil Hava Kalitesi İzleme Sistemi', 'SOLUK — Mobile Air Quality Monitoring System'],
  ['SECURELIFT — ProLoper Takımı', 'SECURELIFT — ProLoper Team'],
  ['NYP Arşiv Otomasyonu', 'NYP Archive Automation'],
  ['İLERİ SEVİYE GİRİŞİMCİLİK EĞİTİMİ', 'ADVANCED ENTREPRENEURSHIP TRAINING'],
  ['AĞ VE UYGULAMA SIZMA TESTİ', 'NETWORK AND APPLICATION PENETRATION TESTING'],
  ['DOÇ. DR.', 'ASSOC. PROF.'],
  ['Komite Başkanlığı', 'Committee chair'],
  ['Siber Kulüpler Birliği', 'Cyber Clubs Union'],
  ['ÜNİVERSİTESİ', 'UNIVERSITY'],
  ['üniversite fotoğrafı', 'university photo'],
  ['POZİSYON', 'ROLES'],
  ['HALEN', 'PRESENT'],
  ['Tipografi', 'Typography'],
  ['Masal PDF', 'Storybook PDF'],
  ['Siber Kulüpler', 'Cyber Clubs'],
  ['Üniversite Web', 'University website'],
  ['Üniversite ', 'University '],
  ['Üniversitesi', 'University'],
  ['üniversite', 'university'],
  ['Bölümü', 'Department'],
  ['Bölüm', 'Department'],
  ['Belediyesi', 'Municipality'],
  ['Belediye', 'Municipality'],
  ['Stajyeri', 'Intern'],
  ['Stajyer', 'Intern'],
  ['Gönüllü', 'Volunteer'],
  ['Temsilcisi', 'Representative'],
  ['Temsilcilik', 'Representation'],
  ['Danışmanım', 'Advisor'],
  ['Danışmanı', 'Advisor'],
  ['Danışman', 'Advisor'],
  ['Hocam', 'Advisor'],
  ['Hocası', 'Instructor'],
  ['Ödülü', 'Award'],
  ['Ödül', 'Award'],
  ['Sertifikası', 'Certificate'],
  ['Sertifika', 'Certificate'],
  ['Programı', 'Program'],
  ['Eğitimi', 'Training'],
  ['Eğitim', 'Training'],
  ['Girişimcilik', 'Entrepreneurship'],
  ['Girişimci', 'Entrepreneur'],
  ['Yarışması', 'Competition'],
  ['Yarışma', 'Competition'],
  ['Projesi', 'Project'],
  ['Proje', 'Project'],
  ['Takımı', 'Team'],
  ['Takım', 'Team'],
  ['Topluluğu', 'Community'],
  ['Topluluğun', 'Community'],
  ['Topluluk', 'Community'],
  ['Kulüpler', 'Clubs'],
  ['Kulübü', 'Club'],
  ['Kulüp', 'Club'],
  ['Fakültesi', 'Faculty'],
  ['Fakülte', 'Faculty'],
  ['İşletme', 'Business'],
  ['Kampüs', 'Campus'],
  ['Lisans', "Bachelor's"],
  ['Mezuniyet', 'Graduation'],
  ['Mezun', 'Graduate'],
  ['Uzmanlaşma', 'Specialization'],
  ['Planlanan', 'Planned'],
  ['Kurumsal', 'Corporate'],
  ['Baskı', 'Print'],
  ['Afiş', 'Poster'],
  ['afiş', 'poster'],
  ['Görsel', 'Image'],
  ['görsel', 'image'],
  ['Sunum', 'Presentation'],
  ['Rapor', 'Report'],
  ['Analiz', 'Analysis'],
  ['İnceleme', 'Examination'],
  ['Geliştirme', 'Development'],
  ['Geliştirici', 'Developer'],
  ['Yönetim', 'Management'],
  ['Organizasyon', 'Organization'],
  ['Liderlik', 'Leadership'],
  ['Mentorluk', 'Mentoring'],
  ['Koordinasyonu', 'Coordination'],
  ['Koordinasyon', 'Coordination'],
  ['Sunumu', 'Presentation'],
  ['Sunum ', 'Presentation '],
  ['iş birliği', 'collaboration'],
  ['İş birliği', 'Collaboration'],
  ['değerlendirme', 'assessment'],
  ['Dikkat', 'Attention'],
  ['Hafıza', 'Memory'],
  ['Hesap', 'Math'],
  ['Oyun', 'Game'],
  ['Oyunu', 'Game'],
  ['Otomasyon', 'Automation'],
  ['Arşiv', 'Archive'],
  ['Şubat – Mart', 'February – March'],
  ['Şubat –', 'February –'],
  ['Eki ', 'Oct '],
  ['Oca ', 'Jan '],
  ['Haz ', 'Jun '],
  ['Ağu ', 'Aug '],
  ['Eyl ', 'Sep '],
  ['Kas ', 'Nov '],
  ['Ara ', 'Dec '],
  ['Şub ', 'Feb '],
  ['Nis ', 'Apr '],
  ['May ', 'May '],
  ['Tem ', 'Jul '],
];

PHRASES.sort((a, b) => b[0].length - a[0].length);

function translateStr(s) {
  if (typeof s !== 'string') return s;
  let out = s;
  for (const [from, to] of PHRASES) {
    out = out.split(from).join(to);
  }
  return out;
}

/** Keep design-assets paths intact while translating panel HTML */
function protectAssetUrls(html, transform) {
  const stash = [];
  const masked = html.replace(/src="(\.\/design-assets\/[^"]+)"/g, (_m, url) => {
    const i = stash.length;
    stash.push(url);
    return `src="__ASSET_URL_${i}__"`;
  });
  let out = transform(masked);
  stash.forEach((url, i) => {
    out = out.replaceAll(`__ASSET_URL_${i}__`, url);
  });
  return out;
}

const SKIP_TRANSLATE_KEYS = new Set(['src', 'url', 'pdfSrc', 'pptxSrc', 'youtube']);

function shouldSkipTranslate(key, val) {
  if (SKIP_TRANSLATE_KEYS.has(key)) return true;
  if (typeof val === 'string' && (/^\.\/design-assets\//.test(val) || /^https?:\/\//i.test(val) || /^mailto:/i.test(val) || /^tel:/i.test(val))) {
    return true;
  }
  return false;
}

function deepTranslate(val, key = '') {
  if (typeof val === 'string') {
    return shouldSkipTranslate(key, val) ? val : translateStr(val);
  }
  if (Array.isArray(val)) return val.map((item) => deepTranslate(item, key));
  if (val && typeof val === 'object') {
    const o = {};
    for (const k of Object.keys(val)) o[k] = deepTranslate(val[k], k);
    return o;
  }
  return val;
}

/** Exact caption overrides (after phrase pass) */
const CAPTION_MAP = {
  'SOLUK birincilik görseli': 'SOLUK first prize image',
  'SOLUK birincilik görseli #2': 'SOLUK first prize image #2',
  "İnegöl'de yeni bir SOLUK — afiş": 'A fresh SOLUK in İnegöl — poster',
  'SecureLift ekip fotoğrafı': 'SecureLift team photo',
  'SecureLift web arayüzü / proje görseli': 'SecureLift web interface / project image',
  'Proje özeti — animasyon videosu': 'Project summary — animation video',
  'Afiyetle Blog — ekran görüntüsü 1': 'Afiyetle Blog — screenshot 1',
  'Afiyetle Blog — ekran görüntüsü 2': 'Afiyetle Blog — screenshot 2',
  'Afiyetle Blog — ekran görüntüsü 3': 'Afiyetle Blog — screenshot 3',
  'Afiyetle Blog — ekran görüntüsü 4': 'Afiyetle Blog — screenshot 4',
  'DURU × Örnek Yemek Sanayi — proje görseli': 'DURU × Örnek Yemek Sanayi — project image',
  'Ulunaz.ai — ekip fotoğrafı': 'Ulunaz.ai — team photo',
  'Ulunaz.ai — arayüz / görsel 1': 'Ulunaz.ai — interface / image 1',
  'Ulunaz.ai — görsel 2': 'Ulunaz.ai — image 2',
  'Ulunaz.ai — görsel 3': 'Ulunaz.ai — image 3',
  'Ulunaz.ai — görsel 4': 'Ulunaz.ai — image 4',
  'EchoBlade — önizleme görseli': 'EchoBlade — preview image',
  'Web3 Hackathon ekip/proje görseli': 'Web3 Hackathon team/project image',
  'OPENHAVEN RENTAL — ekran 1': 'OPENHAVEN RENTAL — screen 1',
  'OPENHAVEN RENTAL — ekran 2': 'OPENHAVEN RENTAL — screen 2',
  'OPENHAVEN RENTAL — ekran 3': 'OPENHAVEN RENTAL — screen 3',
  'OPENHAVEN RENTAL — ekran 4': 'OPENHAVEN RENTAL — screen 4',
  'Hacker Challenge — ekran görüntüsü 1': 'Hacker Challenge — screenshot 1',
  'Hacker Challenge — ekran görüntüsü 2': 'Hacker Challenge — screenshot 2',
  'Hacker Challenge — ekran görüntüsü 3': 'Hacker Challenge — screenshot 3',
  'Hacker Challenge — ekran görüntüsü 4': 'Hacker Challenge — screenshot 4',
  'Hacker Challenge — ekran görüntüsü 5': 'Hacker Challenge — screenshot 5',
  'Archive Automation — proje teması / arayüz': 'Archive Automation — project theme / interface',
  'Bursa Uludağ Üniversitesi — kampüs / üniversite fotoğrafı': 'Bursa Uludağ University — campus photo',
  'Onur Belgesi': 'Honors Certificate',
  'SiberVatan eğitim görselim': 'SiberVatan training visual',
  'Öztekinler Mesleki ve Teknik Anadolu Lisesi': 'Öztekinler Vocational and Technical High School',
  'UluSiber – Uludağ Üniversitesi Siber Güvenlik Topluluğu': 'UluSiber – Uludağ University Cybersecurity Community',
  'UYBIST siber ekip görseli': 'UYBIST cyber team visual',
  'Echo — CTI / tehdit istihbaratı deneyimi': 'Echo — CTI / threat intelligence experience',
  'Anticverse — deneyim görseli': 'Anticverse — experience visual',
  'Uludağ Üniversitesi — sunucu kurulum / IT deneyimi': 'Uludağ University — server setup / IT experience',
  'Organizasyon komite başkanlığı': 'Organization committee chair',
  'Meram Belediyesi — bilgi işlem stajı': 'Meram Municipality — IT internship',
  'İnegöl Belediyesi — gönüllü staj': 'İnegöl Municipality — volunteer internship',
  'İnegöl Belediyesi · TEKNOFEST iş birliği': 'İnegöl Municipality · TEKNOFEST collaboration',
  'Sertifika görseli (yükleyin)': 'Certificate image (upload)',
  'Python Essentials sertifika görseli': 'Python Essentials certificate image',
  'Bir Fikir Bir İnegöl ödül görseli': 'One Idea One İnegöl award image',
  'Yazılım ve Teknoloji Okulu sertifikası': 'Software and Technology School certificate',
  'Türkiye Siber Vatan Programı 2025 sertifikası': 'Turkey Cyber Homeland Program 2025 certificate',
  'SİBERVATAN BOOTCAMP Katılım Sertifikası': 'SIBERVATAN BOOTCAMP Participation Certificate',
  'Türkiye Siber Vatan Programı 2025 Dönemi katılım belgesi': 'Turkey Cyber Homeland Program 2025 term participation certificate',
  'SKYDAYS katılım sertifikası': 'SKYDAYS participation certificate',
  'Introduction to Cybersecurity sertifikası': 'Introduction to Cybersecurity certificate',
  'İleri Seviye Girişimcilik Eğitimi sertifikası': 'Advanced Entrepreneurship Training certificate',
  'Ağ ve Uygulama Sızma Testi eğitimi sertifikası': 'Network and Application Penetration Testing certificate',
  'Responsive Web Design sertifikası': 'Responsive Web Design certificate',
  'W-energy Temel Girişimcilik Programı sertifikası': 'W-energy Basic Entrepreneurship Program certificate',
  'SecureLift web arayüz görseli': 'SecureLift web interface visual',
  'Film editi — ön izleme': 'Film edit — preview',
  'Tipografi afişi': 'Typography poster',
  'Masal kitabı PDF önizleme': "Children's storybook PDF preview",
  'Kurumsal zarf tasarımı': 'Corporate envelope design',
  'Alternatif zarf yerleşimi': 'Alternative envelope layout',
  'Kurumsal kartvizit': 'Corporate business card',
  'Antetli kağıt tasarımı': 'Letterhead design',
  'JUSTIF / PAGO rapor önizleme görseli': 'JUSTIF / PAGO report preview image',
  'gs-auto-clicker / Aurotun Stealer rapor önizleme görseli': 'gs-auto-clicker / Aurotun Stealer report preview image',
};

function applyCaptionMap(val) {
  if (Array.isArray(val)) return val.map(applyCaptionMap);
  if (val && typeof val === 'object') {
    const o = {};
    for (const [k, v] of Object.entries(val)) {
      if (k === 'caption' && typeof v === 'string' && CAPTION_MAP[v]) {
        o[k] = CAPTION_MAP[v];
      } else {
        o[k] = applyCaptionMap(v);
      }
    }
    return o;
  }
  return val;
}

function translateDesignPanel(html) {
  return protectAssetUrls(html, (h) => translateStr(h)
    .replace(/SecureLift web arayuzu/gi, 'SecureLift web interface')
    .replace(/SecureLift tipografi afisi/gi, 'SecureLift typography poster')
    .replace(/SecureLift proje afisi/gi, 'SecureLift project poster')
    .replace(/Masal kitabı PDF/g, "Children's storybook PDF")
    .replace(/Kurumsal zarf/g, 'Corporate envelope')
    .replace(/Kartvizit/g, 'Business card'));
}

function translateCertsPanel(html) {
  return protectAssetUrls(html, (h) => {
    h = h
    .replace('Bir Fikir Bir İnegöl – Fikir Yarışması', 'One Idea One İnegöl – Idea Competition')
    .replace('Yazılım ve Teknoloji Okulu', 'Software and Technology School')
    .replace('Türkiye Siber Vatan Programı 2025', 'Turkey Cyber Homeland Program 2025')
    .replace('SKYDAYS – Siber Güvenlik Etkinliği', 'SKYDAYS – Cybersecurity Event')
    .replace('İleri Seviye Girişimcilik Eğitimi', 'Advanced Entrepreneurship Training')
    .replace('Ağ ve Uygulama Sızma Testi', 'Network and Application Penetration Testing')
    .replace('W-energy Temel Girişimcilik Programı', 'W-energy Basic Entrepreneurship Program')
    .replace('Siber Kulüpler Birliği', 'Cyber Clubs Union')
    .replace('Yıldız Teknik Üniversitesi', 'Yıldız Technical University')
    .replace('⚡ 1.LİK ÖDÜLÜ — SOLUK PROJESİ', '⚡ 1ST PRIZE — SOLUK PROJECT')
    .replace('📅 Şubat – Mart 2025', '📅 February – March 2025')
    .replace('📅 Aralık 2024 – Halen', '📅 December 2024 – Present')
    .replace(/📅 Mart /g, '📅 March ')
    .replace(/📅 Şubat/g, '📅 February')
    .replace(/📅 Nisan /g, '📅 April ')
    .replace(/📅 Kasım /g, '📅 November ')
    .replace(/📅 Eylül /g, '📅 September ')
    .replace(/📅 Haziran /g, '📅 June ')
    .replace(/📅 Ocak /g, '📅 January ')
    .replace(/📅 Aralık /g, '📅 December ')
    .replace(/📅 Mayıs /g, '📅 May ')
    .replace(/Halen/g, 'Present')
    .replace('ÖDÜL<br>GÖRSELİ', 'AWARD')
    .replace('📜<br>GÖRSEL', '');
    return translateStr(h);
  });
}

function translateExpPanel(html) {
  return protectAssetUrls(html, (h) => translateStr(h)
    .replace(/HALEN/g, 'PRESENT')
    .replace(/AKTİF/g, 'ACTIVE')
    .replace(/TAMAMLANDI/g, 'COMPLETED')
    .replace(/\[ DETAY → \]/g, '[ DETAILS → ]')
    .replace('Yönetim Kurulu Üyesi', 'Board Member')
    .replace('Zararlı Yazılım Analisti & Tersine Mühendis | Üye', 'Malware Analyst & Reverse Engineer | Member')
    .replace('Zararlı Yazılım Analizi Stajyeri – Siber Tehdit İstihbaratı', 'Malware Analysis Intern – Cyber Threat Intelligence')
    .replace('Ar-Ge Siber Ekip Liderliği', 'R&D Cyber Team Lead')
    .replace("DevFest'24 Yönetim Ekibi Gönüllü Üyesi", "DevFest'24 Volunteer – Organizing Team")
    .replace('Server Kurulum, Onarım ve Koruma Elemanı', 'Server Setup, Maintenance & Security Officer')
    .replace('Organizasyon Komite Başkanı', 'Organization Committee Chair')
    .replace('Bilgi İşlem Stajyeri', 'IT Intern')
    .replace('Bursa & Uludağ Üniversitesi Temsilcisi', 'Bursa & Uludağ University Representative')
    .replace(/📅 Ocak 2026 – Devam Ediyor/g, '📅 January 2026 – Ongoing')
    .replace(/📅 Eylül 2025 – Şubat 2026/g, '📅 September 2025 – February 2026')
    .replace(/📅 Ağustos 2025 – Ocak 2026/g, '📅 August 2025 – January 2026')
    .replace(/📅 Mart 2025 – Ekim 2025 · Tamamlandı/g, '📅 March 2025 – October 2025 · Completed')
    .replace(/📅 Ekim 2024 – Ekim 2025/g, '📅 October 2024 – October 2025')
    .replace(/📅 Ocak 2023 – Haziran 2024/g, '📅 January 2023 – June 2024')
    .replace(/📅 Mart 2023 – Haziran 2024/g, '📅 March 2023 – June 2024')
    .replace(/📅 Mayıs 2023 – Ocak 2024/g, '📅 May 2023 – January 2024')
    .replace(/📅 Ocak 2023 – Nisan 2023/g, '📅 January 2023 – April 2023')
    .replace(/📅 Eylül 2021 – Haziran 2022/g, '📅 September 2021 – June 2022')
    .replace(/5 ay · Bursa, Türkiye/g, '5 mo · Bursa, Turkey')
    .replace("Uludağ Üniversitesi Siber Güvenlik Topluluğu'nun yönetim kurulunda üye olarak görev yapıyorum. Topluluğun stratejik kararlarına katkıda bulunuyorum.", "I serve on the board of Uludağ University's Cybersecurity Community (UluSiber), contributing to strategic decisions and community initiatives.")
    .replace('Zararlı yazılım analizi ve tersine mühendislik alanlarında aktif olarak çalışmalar yürüttüm. Siber tehdit istihbaratı üzerine araştırmalar yaptım.', 'I actively worked on malware analysis and reverse engineering, researching cyber threat intelligence (CTI).')
    .replace('Siber tehdit istihbaratı alanında staj yaparak gerçek dünya zararlı yazılım örneklerini analiz ettim. Tehdit raporları hazırladım.', 'As a CTI intern, I analyzed real-world malware samples and prepared threat reports.')
    .replace('UYBIST bünyesinde Ar-Ge siber güvenlik ekibini kurdum ve dönem sonuna kadar yönettim; mentorluk ve teknik çalışmaları tamamladım.', 'At UYBIST I built and led the R&D cybersecurity team through the term, including mentoring and technical delivery.')
    .replace("Bursa'daki en büyük geliştirici etkinliklerinden biri olan DevFest'in organizasyonunda aktif rol üstlendim.", "I took an active role organizing DevFest, one of Bursa's largest developer events.")
    .replace('Üniversite bünyesinde sunucu kurulumu ve bakımı; Ubuntu ortamında Hadoop, ZooKeeper ve güvenlik odaklı işlemler dahil operasyonlar gerçekleştirdim.', 'I performed server setup and maintenance at the university, including Hadoop, ZooKeeper, and security-focused operations on Ubuntu.')
    .replace('Gönüllü stajyer; belediye ile ortak projelerde aktif rol. BAYKOCA teknoloji şirketiyle TEKNOFEST gibi yarışmalar için proje geliştirme süreçlerine katkı.', 'Volunteer intern supporting municipal IT; contributed to TEKNOFEST-oriented project development with BAYKOCA.')
    .replace('Belediye bilgi işlem departmanında ilk profesyonel deneyimimi kazandım. Ağ altyapısı ve yazılım desteği sağladım.', 'I gained my first professional experience in municipal IT, providing network infrastructure and software support.')
    .replace('<span class="tag">Yönetim</span>', '<span class="tag">Management</span>')
    .replace('<span class="tag">Topluluk</span>', '<span class="tag">Community</span>')
    .replace('<span class="tag">Tersine Mühendislik</span>', '<span class="tag">Reverse Engineering</span>')
    .replace('<span class="tag">Liderlik</span>', '<span class="tag">Leadership</span>')
    .replace('<span class="tag">Ar-Ge</span>', '<span class="tag">R&D</span>')
    .replace('<span class="tag">Temsilcilik</span>', '<span class="tag">Representation</span>')
    .replace('<span class="tag">Staj</span>', '<span class="tag">Internship</span>'));
}

function translateProjectsPanel(html) {
  return protectAssetUrls(html, (h) => translateStr(h)
    .replace('SOLUK proje görseli', 'SOLUK project image')
    .replace('SecureLift web arayüz görseli', 'SecureLift web interface visual')
    .replace('DURU × Örnek Yemek Sanayi proje görseli', 'DURU × Örnek Yemek Sanayi project image')
    .replace('Ulunaz.ai ekip fotoğrafı', 'Ulunaz.ai team photo')
    .replace('EchoBlade hackathon görseli', 'EchoBlade hackathon visual')
    .replace('OPENHAVEN RENTAL görseli', 'OPENHAVEN RENTAL visual')
    .replace('Hacker Challenge görseli', 'Hacker Challenge visual')
    .replace('Archive Automation görseli', 'Archive Automation visual'));
}

function translateSkillsPanel(html) {
  return protectAssetUrls(html, (h) => translateStr(h)
    .replace('SİBER GÜVENLİK ARAÇLARI', 'CYBERSECURITY TOOLS')
    .replace('PROGRAMLAMA & WEB GELİŞTİRME', 'PROGRAMMING & WEB DEVELOPMENT')
    .replace('KİŞİSEL YETKİNLİKLER', 'SOFT SKILLS')
    .replace('PROGRAMLAMA', 'PROGRAMMING')
    .replace('WEB & ARAÇLAR', 'WEB & TOOLS')
    .replace('GELİŞTİRME ORTAMI', 'DEVELOPMENT ENVIRONMENT')
    .replace('Takım Liderliği', 'Team Leadership')
    .replace('Proje Yönetimi', 'Project Management')
    .replace('Teknik Rapor Yazımı', 'Technical Report Writing')
    .replace('Sunum & İletişim', 'Presentation & Communication')
    .replace('Problem Çözme', 'Problem Solving')
    .replace('Araştırma & Geliştirme', 'Research & Development'));
}

function translateReportsPanel(html) {
  return protectAssetUrls(html, (h) => {
    h = h
      .replace('ANALİZ RAPORLARI', 'ANALYSIS REPORTS')
      .replace('title="Detay için tıklayın"', 'title="Click for details"')
      .replace('YÜKSEK<br>RİSK', 'HIGH<br>RISK')
      .replace('ORTA<br>RİSK', 'MEDIUM<br>RISK')
      .replace('JUSTIF / PAGO — Analiz Raporu', 'JUSTIF / PAGO — Analysis Report')
      .replace('XWORM — Analiz Raporu (EN)', 'XWORM — Analysis Report (EN)')
      .replace('Zararlı Yazılım İncelemesi · Özet görsel', 'Malware Examination · Summary visual')
      .replace('Zararlı Yazılım · Rapor önizleme', 'Malware · Report preview')
      .replace('📅 Rapor görseli · Tıkla', '📅 Report preview · Click')
      .replace('alt="JUSTIF PAGO analiz raporu önizleme"', 'alt="JUSTIF PAGO analysis report preview"')
      .replace('alt="XWORM EN analiz raporu önizleme"', 'alt="XWORM EN analysis report preview"')
      .replace(
        'JUSTIF / PAGO analiz çalışmasına ait önizleme görseli. Özet ve bağlam için karta tıklayarak detay penceresini açabilir; görseli tam boyutta yine detaydan veya doğrudan bağlantıdan izleyebilirsiniz.',
        'Preview image for the JUSTIF / PAGO analysis. Click the card to open the detail view for summary and context; view the image full size from the detail panel.'
      )
      .replace(
        'XWORM (EN) analiz raporuna ait önizleme görseli. Zararlı yazılım ve rapor hakkında açıklamalar için karta tıklayarak detay penceresini açabilirsiniz.',
        'Preview image for the XWORM (EN) analysis report. Click the card to open the detail view for malware and report notes.'
      )
      .replace('<span class="report-tag">RAPOR</span>', '<span class="report-tag">REPORT</span>')
      .replace('[ 🔍 DETAY PENCERESİ — KARTA TIKLA ]', '[ 🔍 DETAIL VIEW — CLICK CARD ]')
      .replace(/\[ DETAY → \]/g, '[ DETAILS → ]');
    return translateStr(h);
  });
}

/** Manual desc / content overrides for quality */
const OVERRIDES = {
  panel: {
    edu: {
      title: 'EDUCATION',
      sub: 'EDUCATION // ACADEMIC BACKGROUND',
      content: panelDataTR.edu.content
        .replace('ÜNİVERSİTE & UZMANLAŞMA', 'UNIVERSITY & SPECIALIZATION')
        .replace(/\[ DETAY → \]/g, '[ DETAILS → ]')
        .replace('Yönetim Bilişim Sistemleri – Lisans', 'Management Information Systems – Bachelor\'s')
        .replace('📅 Eylül 2022 – Temmuz 2026 [DEVAM EDİYOR]', '📅 September 2022 – July 2026 [IN PROGRESS]')
        .replace('Siber Güvenlik Uzmanlaşma Eğitimi', 'Cybersecurity Specialization Program')
        .replace('📅 Aralık 2024 – Halen', '📅 December 2024 – Present')
        .replace('📅 Mezuniyet: 2022', '📅 Graduation: 2022'),
    },
    skills: {
      title: 'TECHNICAL SKILLS',
      sub: 'SKILLS // CYBERSECURITY + WEB DEVELOPMENT',
      content: translateSkillsPanel(panelDataTR.skills.content),
    },
    refs: { title: 'REFERENCES' },
    design: {
      title: 'DESIGN WORK',
      sub: 'DESIGN // CREATIVE WORK — WEB · PRINT · POSTER',
      content: translateDesignPanel(panelDataTR.design.content),
    },
    certs: {
      title: 'CERTIFICATES',
      sub: 'CERTIFICATES // 12+ CERTIFICATES — 2022→2026',
      content: translateCertsPanel(panelDataTR.certs.content),
    },
    projects: {
      title: 'PROJECTS',
      sub: 'PROJECTS // COMPETITIONS & GITHUB',
      content: translateProjectsPanel(panelDataTR.projects.content),
    },
    reports: {
      title: 'MALWARE ANALYSIS REPORTS',
      sub: 'REPORTS // MALWARE ANALYSIS & REVERSE ENGINEERING',
      content: translateReportsPanel(panelDataTR.reports.content),
    },
    exp: {
      content: translateExpPanel(panelDataTR.exp.content),
    },
  },
  project: {
    soluk: {
      desc: `At the İnegöl Municipality "One Idea One İnegöl" competition, our SOLUK project won first place with the concept "Air Quality Measurement via E-Mobility".\n\nWe aimed to monitor urban air quality in real time using sensors integrated into e-scooters and turn that data into a sustainable, eco-friendly solution.`,
      images: [
        { src: './design-assets/soluk-birincilik.png', caption: 'SOLUK first prize image' },
        { src: './design-assets/soluk-birincilik2.png', caption: 'SOLUK first prize image #2' },
        { src: './design-assets/İ N E G Ö L ’ D E Y E N İ B İ R “ S O L U K ” !.png', caption: 'A fresh SOLUK in İnegöl — poster' },
      ],
    },
    securelift: {
      desc: `SecureLift was born as a proactive system that predicts elevator failures before they occur—especially in high-traffic settings like dormitories. We competed at TEKNOFEST 2024 in the Technologies for Humanity category with the ProLoper team; as captain I led strategic planning, technical reporting, and system architecture.\n\nWe designed the stack end-to-end with IoT in mind: sensor data, connectivity, and reliable field measurement together. Learning elevator mechanics, standards, and failure dynamics was demanding; I shared that load with ProLoper teammates and took the lead on planning and reporting.\n\nThe name ProLoper blends "Proactive" and "Developer"—building solutions that intervene before problems hit society, not only writing code. With SecureLift we delivered strong technical work and a clear brand stance.`,
      images: [
        { src: './design-assets/securelift-ekip.png', caption: 'SecureLift team photo' },
        { src: './design-assets/web-securelift.png', caption: 'SecureLift web interface / project image' },
      ],
      videos: [{ src: './design-assets/securelift.mp4', caption: 'Project summary — animation video' }],
    },
    yemek: {
      desc: `Afiyetle Blog is a user-friendly web app for sharing, editing, and adding photos to recipes, with required login and a polished UI for recipes and comments.\n\nBuilt with Sude Naz Kol and İlayda Yıldız for Web Programming; I focused on UI and business logic.\n\nSetup: clone the repo, open in Visual Studio, restore NuGet packages, and run locally.\n\nData model: User (hashed passwords), Recipe (name, category, ingredients, instructions, image path), Comment tables.`,
      images: [
        { src: './design-assets/afiyetle-blog1.png', caption: 'Afiyetle Blog — screenshot 1' },
        { src: './design-assets/afiyetle-blog2.png', caption: 'Afiyetle Blog — screenshot 2' },
        { src: './design-assets/afiyetle-blog3.png', caption: 'Afiyetle Blog — screenshot 3' },
        { src: './design-assets/afiyetle-blog4.png', caption: 'Afiyetle Blog — screenshot 4' },
      ],
    },
    duru_ornek_yemek: {
      desc: `With a vision for a sustainable production ecosystem, we ran a comprehensive assessment and modernization study at Örnek Yemek Sanayi's facilities. The project focused on water recovery, composting organic waste, and corporate awareness.\n\nWe proposed an environmental model targeting ~288 tons of fresh water saved annually and nearly 20 tons of organic waste processed. AI supported decision-making; thermal sanitization raised hygiene and efficiency. The work shows a holistic approach beyond cost savings.\n\nMain PDF is viewable below; download DURU_2.pptx for the extra deck. I worked with Sude Naz Kol and İlayda Yıldız on presentation and field analysis.`,
      images: [{ src: './design-assets/duru-foto.png', caption: 'DURU × Örnek Yemek Sanayi — project image' }],
      pptxSectionTitle: 'EXTRA PRESENTATION (PowerPoint — DURU_2)',
    },
    ulunaz: {
      desc: `Ulunaz.ai is a RAG-based AI assistant for Bursa Uludağ University İnegöl Faculty of Business, built with UYBIST R&D teammates.\n\nWhat makes it unique is the character built around campus dog "Nazlı"—turning a cold chatbot into a familiar campus figure students connect with.\n\nTechnically we used Next.js, TypeScript, Tailwind, Gemini 2.0 Flash and DeepSeek with a faculty knowledge base—from exam schedules to transport guides in Nazlı's voice.\n\nIt shows how AI can be part of a community, not only a data pipe.`,
      images: [
        { src: './design-assets/ulunaz-team.png', caption: 'Ulunaz.ai — team photo' },
        { src: './design-assets/ulunaz.png', caption: 'Ulunaz.ai — interface / image 1' },
        { src: './design-assets/ulunaz2.png', caption: 'Ulunaz.ai — image 2' },
        { src: './design-assets/ulunaz3.png', caption: 'Ulunaz.ai — image 3' },
        { src: './design-assets/ulunaz4.png', caption: 'Ulunaz.ai — image 4' },
      ],
    },
    echoblade: {
      desc: `On May 26–27 I joined the Web3 Hackathon hosted by Bursa Technical University with Koza DAO.\n\nIn 36 hours our team built a Sui-based game, went deep technically, met new people, and strengthened fast product teamwork.\n\nRead the summary in EchoBlade.pdf on this page.`,
      pdfSectionTitle: 'PROJECT PDF (EchoBlade)',
      images: [
        { src: './design-assets/EchoBlade-foto.png', caption: 'EchoBlade — preview image' },
        { src: './design-assets/echoblade.png', caption: 'Web3 Hackathon team/project image' },
      ],
    },
    openhaven: {
      desc: `OPENHAVEN RENTAL was built with Ahmet Kutay Ergin. The idea: help agents in the field manage listings, clients, and map addresses in one Android Flutter/Dart flow with Firebase Firestore.\n\nLogin → home (listings + add) → clients in Firestore → add property with image URL preview → map page for quick "how do I get there?"\n\nRun locally: Flutter/Dart installed, \`flutter pub get\`, \`flutter run\` on Android.\n\nI focused on UI flows, data modeling, and Firebase integration for a cohesive, ready-to-use feel.`,
      images: [
        { src: './design-assets/open1.png', caption: 'OPENHAVEN RENTAL — screen 1' },
        { src: './design-assets/open2.png', caption: 'OPENHAVEN RENTAL — screen 2' },
        { src: './design-assets/open3.png', caption: 'OPENHAVEN RENTAL — screen 3' },
        { src: './design-assets/open4.png', caption: 'OPENHAVEN RENTAL — screen 4' },
      ],
      links: [
        { label: '⌥ GitHub', url: 'https://github.com/bulbulsena/OPENHAVEN-RENTAL' },
        { label: '▶ App overview (YouTube Shorts)', url: 'https://www.youtube.com/shorts/n-ZLWBpN3Do' },
        { label: '▶ Code walkthrough (YouTube Shorts)', url: 'https://www.youtube.com/shorts/72LATE7EdKM' },
      ],
    },
    hacker: {
      desc: `Hacker Challenge is a C# assessment-style game for hiring: attention, memory, and math speed through a "hack the terminal" theme.\n\nPart 1: compare images for 30s (+10 / −5). Part 2: solve math for 60s. Scores roll up on a level screen.\n\nI designed the game loop, scoring, and OOP structure end to end.`,
      images: [
        { src: './design-assets/hacker1.png', caption: 'Hacker Challenge — screenshot 1' },
        { src: './design-assets/hacker2.png', caption: 'Hacker Challenge — screenshot 2' },
        { src: './design-assets/hacker3.png', caption: 'Hacker Challenge — screenshot 3' },
        { src: './design-assets/hacker4.png', caption: 'Hacker Challenge — screenshot 4' },
        { src: './design-assets/hacker5.png', caption: 'Hacker Challenge — screenshot 5' },
      ],
      links: [
        { label: '⌥ GitHub', url: 'https://github.com/bulbulsena/HACKER-CHALLENGE' },
        { label: '▶ YouTube video', url: 'https://www.youtube.com/watch?v=yiVkcpNWhLQ' },
      ],
    },
    archive: {
      desc: `Archive Automation NYP organizes, compresses, and securely archives files in C#/.NET with BouncyCastle encryption, automated processing, and tracking. MIT licensed; I worked mainly on the backend in a team of three.`,
      images: [{ src: './design-assets/arsiv_otomasyonu.png', caption: 'Archive Automation — project theme / interface' }],
    },
  },
  item: {
    edu_uludag: {
      desc: `I completed the Management Information Systems bachelor's program at Bursa Uludağ University, covering software development, systems analysis, databases, and enterprise information systems.\n\nI deepened my technical base through cybersecurity and malware-focused coursework and projects. My thesis focuses on malware analysis.`,
    },
    edu_siber: {
      desc: `I joined SiberVatan's intensive cybersecurity specialization program supported by BEBKA, with advanced hands-on training in penetration testing, web security, and malware analysis through real attack/defense scenarios.`,
    },
    edu_lise: {
      desc: `I graduated valedictorian from Öztekinler Vocational High School in Information Technologies, strengthening programming, networking, and hardware fundamentals toward my cybersecurity goals. I also obtained instructor credentials to teach and deepen expertise in parallel.`,
    },
    ref_melih: {
      desc: `Prof. Dr. Melih Engin is a faculty member in MIS and my department advisor, bridging theory and practice. He guided multiple projects and helped me grow analytically and academically.`,
    },
    ref_erdal: {
      desc: `Assoc. Prof. Dr. Erdal Özdoğan is my thesis advisor and cybersecurity instructor—my closest academic mentor in security. His guidance shaped my thesis and he shares field experience openly with students.`,
    },
    exp_zayotem: {
      sub: 'Malware Analyst & Reverse Engineer | Member · September 2025 – February 2026',
      desc: `I actively worked on malware analysis and reverse engineering. I researched cyber threat intelligence (CTI), analyzing real-world threat actors' tactics, techniques, and procedures (TTPs).\n\nUsing static and dynamic analysis methodologies, I conducted in-depth examinations of malware samples. I contributed to defense mechanisms through threat reports and YARA rules I authored.`,
      tags: ['Completed', 'Malware', 'CTI', 'Reverse Engineering'],
    },
    cert_datascience: {
      sub: 'Cisco Networking Academy · March 2026',
      images: [],
      desc: `I successfully completed Cisco Networking Academy's "Introduction to Data Science" certificate program. The program covered core data science concepts, data analysis methodologies, and hands-on data processing with Python.`,
      skills: ['Data Analysis', 'Python', 'Statistics', 'Data Visualization', 'Machine Learning Fundamentals'],
      tags: ['2026', 'Cisco', 'Data Science', 'Python'],
    },
    cert_python: {
      sub: 'Cisco Networking Academy · March 2026',
      desc: `I completed Cisco Networking Academy Python Essentials 1 and 2. I gained extensive practical experience in core Python syntax, object-oriented programming, file handling, error management, and modular programming.\n\nI can actively use Python for cybersecurity tool development and automation scripts.`,
      skills: ['Python Programming', 'OOP', 'File I/O', 'Modular Programming', 'Automation'],
      tags: ['2026', 'Cisco', 'Python', 'Programming'],
      links: [
        { label: '🐍 Verify Python Essentials 1', url: 'https://www.credly.com/badges/952e3039-4463-4e4b-a522-34adb144c23c/linked_in_profile' },
        { label: '🐍 Verify Python Essentials 2', url: 'https://www.credly.com/badges/adf08a20-cc07-4eea-a326-0f5b98878869/linked_in_profile' },
      ],
    },
    cert_soluk_odul: {
      title: 'ONE IDEA ONE İNEGÖL – 1ST PRIZE',
      sub: 'TÜMMİAD · April 2025 · SOLUK Project',
      images: [{ src: './design-assets/birfikir.png', caption: 'One Idea One İnegöl award image' }],
      desc: `At the "One Idea One İnegöl" competition organized by TÜMMİAD (All Entrepreneurs and Businesspeople Association), I won first place with the SOLUK project.\n\nSOLUK is a mobile-focused application that monitors urban air quality in real time and informs citizens instantly. The project was selected first based on technical innovation, environmental awareness, and social impact.`,
      skills: ['Ideation', 'Entrepreneurship', 'Mobile App', 'Environmental Tech', 'Presentation'],
      tags: ['2025', '1st Prize', 'SOLUK', 'TÜMMİAD', 'Competition'],
      links: [{ label: '🏆 View SOLUK project', action: 'openProj', projId: 'soluk' }],
    },
    cert_yazilim: {
      title: 'SOFTWARE AND TECHNOLOGY SCHOOL',
      sub: 'Coderspace · March 2025',
      desc: `I successfully completed the Software and Technology School program organized by Coderspace in March 2025. I received training in modern software development practices, version control, agile methodologies, and full-stack development.\n\nI gained real project experience through mentorship from industry professionals. Credential ID: e83283a2-9a49-4448-ac5e-6e8e3e0f60ea.`,
      skills: ['Full-Stack Development', 'Git/GitHub', 'Agile', 'Modern Software Practices'],
      tags: ['2025', 'Coderspace', 'Software', 'Training'],
      links: [{ label: '💻 Verify Coderspace certificate', url: 'https://coderspace.io/sertifikalar/e83283a2-9a49-4448-ac5e-6e8e3e0f60ea' }],
    },
    cert_siber_vatan: {
      title: 'TURKEY CYBER HOMELAND PROGRAM 2025',
      sub: 'Siber Vatan · 2024–2025 Certificate Set',
      desc: `I completed intensive cybersecurity training during the Turkey Cyber Homeland Program 2025 term. Throughout the program I did hands-on work in penetration testing, web application security, network security, and malware analysis.\n\nI also completed the SIBERVATAN BOOTCAMP participation process, strengthening my technical skills through CTF and real-scenario-focused practice. The bootcamp certificate image is included in this entry.`,
      tags: ['2024-2025', 'SiberVatan', 'BEBKA', 'Ongoing'],
      links: [
        { label: '🛡 Verify Siber Vatan 2025 (ID: 85230975976062)', url: 'https://drdogrulama.sanayi.gov.tr/tr/verify/85230975976062/' },
        { label: '🛡 Verify Siber Vatan welcome (ID: 64312455533886)', url: 'https://drdogrulama.sanayi.gov.tr/tr/verify/64312455533886/' },
      ],
    },
    cert_skydays: {
      title: "SKYDAYS: TURKEY'S LARGEST CYBERSECURITY EVENT — PARTICIPATION CERTIFICATE",
      sub: 'Yıldız Technical University · SKYLAB · March 2025',
      images: [{ src: './design-assets/SKYDAYS.PNG', caption: 'SKYDAYS participation certificate' }],
      desc: `I received a participation certificate for the SKYDAYS Cybersecurity Event organized by Yıldız Technical University SKYLAB. I learned current insights from industry experts on malware analysis, reverse engineering, and CTI. I also had opportunities for networking and exploring new technologies.`,
      tags: ['2025', 'YTÜ', 'SKYLAB', 'Event'],
    },
    cert_cisco_cyber: {
      sub: 'Cisco Networking Academy · December 2024',
      desc: `I completed Cisco Networking Academy's "Introduction to Cybersecurity" certificate program. I received comprehensive theoretical training on cyber threat types, security architecture, network security fundamentals, and entering a cybersecurity career.\n\nThis certificate is one of the cornerstones of my cybersecurity education journey.`,
      skills: ['Cybersecurity Fundamentals', 'Threat Types', 'Network Security', 'Security Architecture'],
      tags: ['2024', 'Cisco', 'Cybersecurity', 'Foundations'],
      links: [{ label: '🌐 Verify on Credly', url: 'https://www.credly.com/badges/54fac7a8-7b58-46cd-b95f-5d7454d4cc0f/linked_in_profile' }],
    },
    cert_kosgeb: {
      title: 'ADVANCED ENTREPRENEURSHIP TRAINING',
      sub: 'KOSGEB · November 2023',
      desc: `I successfully completed the Advanced Entrepreneurship Training organized by KOSGEB (Small and Medium Enterprises Development Organization).\n\nI received comprehensive training in business plan preparation, financial management, marketing strategies, and the startup ecosystem. Credential ID: KSB01UGE0112161383.`,
      skills: ['Entrepreneurship', 'Business Plan', 'Finance', 'Marketing', 'Startup Ecosystem'],
      tags: ['2023', 'KOSGEB', 'Entrepreneurship'],
    },
    cert_sizmatesti: {
      title: 'NETWORK AND APPLICATION PENETRATION TESTING',
      sub: 'Cyber Clubs Union · Ankara University · September 2023',
      desc: `Within the Cybersecurity Summer Camp / Network and Application Penetration Testing training held on September 7–10, 2023, under the patronage of the Ministry of National Defense and the Digital Transformation Office, hosted by Ankara University, and supported by the Turkey Cybersecurity Cluster, I participated in the program organized by the Cyber Clubs Union and completed it successfully.\n\nIn this training I gained hands-on experience in network reconnaissance, web application security, penetration testing methodologies, and reporting processes.`,
      skills: ['Penetration Testing', 'Network Recon', 'Web App Security', 'Vulnerability Analysis', 'Ethical Hacking'],
      tags: ['2023', 'Pentest', 'Penetration Testing', 'Cyber Clubs Union'],
    },
    cert_freecodecamp: {
      sub: 'freeCodeCamp · May 2023',
      desc: `I completed freeCodeCamp's 300+ hour Responsive Web Design certification program. I gained extensive practical experience in HTML5, CSS3, Flexbox, CSS Grid, responsive design principles, and accessibility.\n\nI demonstrated my ability to design modern web interfaces by building five required projects.`,
      skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'CSS Grid', 'Accessibility'],
      tags: ['2023', 'freeCodeCamp', 'Web Design', 'Frontend'],
      links: [{ label: '🌐 Verify certificate', url: 'https://www.freecodecamp.org/certification/bullbullsena/responsive-web-design' }],
    },
    exp_ulusiber: { desc: `I serve on the board of UluSiber (Uludağ University Cybersecurity Community), contributing to strategy, events, and raising security awareness among students.` },
    exp_uybist: { desc: `I founded and led UYBIST's cybersecurity R&D team (Mar–Oct 2025), mentoring members and coordinating research until handover.` },
    exp_echo: { desc: `As a CTI intern I analyzed malware with PEStudio, DIE, x32dbg, IDA, Process Hacker, and Wireshark; documented IOCs, C2 traffic, and impersonation risks on social/ad platforms; validated Acunetix findings.` },
    exp_gdg: { desc: `Volunteer on DevFest'24 organizing team—logistics, speaker coordination, and attendee experience at one of Bursa's largest dev events.` },
    exp_anticverse: { desc: `Community representative for Bursa and Uludağ University, bridging students and Anticverse events.` },
    exp_uludag_server: { desc: `Server setup, maintenance, and security at the university on Ubuntu, including Hadoop/ZooKeeper components and distributed ops experience.` },
    exp_uybist_org: { desc: `Chaired UYBIST's organization committee, planning panels and symposia and strengthening leadership and coordination skills.` },
    exp_meram: { desc: `First professional IT internship at Meram Municipality—network setup, software support, and helpdesk fundamentals.` },
    exp_inegol: { desc: `Volunteer IT intern at İnegöl Municipality; supported municipal systems and TEKNOFEST-oriented projects with BAYKOCA.` },
    report_justif_pago: {
      title: 'JUSTIF / PAGO — GuLoader Malware Analysis',
      sub: 'GuLoader · NSIS Dropper · Static & Dynamic Analysis · DLLLoader Chain',
      images: [{ src: './design-assets/JUSTIF_PAGO.png', caption: 'JUSTIF / PAGO report preview image' }],
      desc: `The JUSTIF.PAGO.exe sample is GuLoader family malware deployed through an NSIS (Nullsoft Scriptable Install System) dropper/loader chain. The analysis uncovered a two-stage execution chain and multi-layered obfuscation techniques.\n\n<b>Static Analysis Findings</b>\nCompiled as PE32 (i386), the file shows overall entropy of ~91%; overlay entropy ~7.999 points to compressed or encrypted content. Meaningless strings in version metadata (CompanyName: "marmoreally", InternalName: "skattedepartementerne dumbfounding.exe") indicate metadata manipulation. After extraction: Nonassented, Ferritanteners, and $PLUGINSDIR folders; files with extensions .sub, .rho, .pol, .kon. nsDialogs.dll and System.dll under $PLUGINSDIR confirm an NSIS-based structure.\n\n<b>Dynamic Analysis Findings</b>\nThe sample uses runtime API resolution (GetModuleHandleA → GetProcAddress) to hide its import table. At runtime it dynamically loads system modules including UXTHEME, USERENV, SETUPAPI, PROPSYS, DWM, and CRYPTBASE. Temporary paths are created via GetTempFileNameW under AppData\\Local\\Temp\\; installation output is written to AppData\\Roaming\\Microsoft\\Windows\\Templates\\vegetal. In the anti-analysis layer, fixed strings "Inst", "soft", and "Null" are validated in memory; on failure the process terminates itself.\n\n<b>Stage Two: DLLLoader32 Load Chain</b>\nWhen installation completes, a loader component (DLLLoader32_XXXX.exe) is dropped under $PLUGINSDIR with a different name on each run. This component receives the DLL path via Named File Mapping (shared memory) instead of the command line, establishing a modular, low-visibility chain: parent → mapping → loader → LoadLibraryW. The import table includes IsDebuggerPresent, MapViewOfFile, OpenFileMappingW, and TerminateProcess.`,
      skills: ['Static PE Analysis', 'Dynamic Analysis', 'Anti-Analysis Detection', 'Entropy Analysis', 'Loader Chain Tracking', 'IOC Extraction', 'CTI Reporting'],
      tags: ['GuLoader', 'NSIS Dropper', 'DLLLoader', 'Anti-Debug', 'Malware', 'Loader'],
    },
    report_xworm: {
      title: 'gs-auto-clicker.exe — Aurotun Stealer Analysis (EN)',
      sub: 'AutoIt Stealer · Process Hollowing · C2 Detection · MITRE ATT&CK Mapping',
      images: [{ src: './design-assets/XWORM-EN.pdf kopyası.png', caption: 'gs-auto-clicker / Aurotun Stealer report preview image' }],
      desc: `The gs-auto-clicker.exe sample is a comprehensive information stealer identified as "Aurotun Stealer", concealed behind the appearance of a legitimate automation tool. Static and dynamic analysis produced complementary findings.\n\n<b>Static Analysis Findings</b>\nCompiled as PE32 (i386, MSVC 2008), the resource section (.rsrc) contains Native API calls associated with Process Hollowing: NtCreateSection, NtMapViewOfSection, NtUnmapViewOfSection, NtGetContextThread, NtContinue. This sequence indicates malicious code can be written into and executed from a legitimate process memory space. Static analysis also shows AddVectoredExceptionHandler/RemoveVectoredExceptionHandler for anti-debugging and queries to \\KnownDlls and \\KnownDlls32 consistent with DLL hijacking preparation. Targeted assets include Electrum, ElectronCash, Jaxx Liberty, geckowallet (crypto wallets), Chromium-based browsers, Discord, and Telegram.\n\n<b>Dynamic Analysis Findings</b>\nAt runtime the sample queries the system DLL inventory via \\KnownDlls32 and attempts to seize exception handler control through fake.dll. The main malicious flow is started in a separate thread via CreateThread and ResumeThread to hinder detection. For persistent identification it reads MachineGuid and ActiveComputerName under SOFTWARE\\Microsoft\\Cryptography. Collected data is formatted with a GONSERVER= template prefix and exfiltrated over TCP to C2 server 84.200.17.240:7712.\n\n<b>MITRE ATT&CK Mapping</b>\nFindings map to T1497 (Sandbox Evasion), T1059 (Scripting Interpreter), T1574.002 (DLL Side-Loading), T1548 (Abuse Elevation Control Mechanism), T1518.001 (Security Software Discovery), T1573 (Encrypted Channel), T1571 (Non-Standard Port), T1056 (Input Capture), and T1005 (Data from Local System). The report is written in English and includes 8 defensive recommendations and a YARA rule.`,
      skills: ['Static PE Analysis', 'Dynamic Analysis', 'Process Hollowing Detection', 'C2 Infrastructure Analysis', 'MITRE ATT&CK Mapping', 'YARA Rule Writing', 'IOC Extraction', 'Technical Reporting (EN)'],
      tags: ['Aurotun Stealer', 'AutoIt', 'Process Hollowing', 'C2', 'Crypto-Targeted', 'Anti-Debug', 'MITRE ATT&CK'],
    },
    design_web1: {
      title: 'SECURELIFT WEB INTERFACE',
      sub: 'ProLoper · HTML/CSS Front-end',
      images: [{ src: './design-assets/poster-project.png', caption: 'SecureLift web interface visual' }],
      desc: `Web interface I designed for the ProLoper team's SecureLift project. I structured information architecture, visual layout, and component hierarchy to support the goal of predicting elevator failures in advance.\n\nThe UI uses HTML/CSS with modern web design principles, readable typography, and consistent color use to prioritize user experience.`,
      skills: ['UI/UX Design', 'HTML/CSS Layout', 'Responsive Design', 'Information Architecture', 'Typography'],
      tags: ['SecureLift', 'ProLoper', 'Web UI'],
    },
    design_web2: {
      title: 'GRAPHIC ANIMATION CLASS — FILM EDIT',
      sub: 'CARS film selection · Adobe After Effects · YouTube',
      videos: [{ src: './design-assets/KA-CHOW.mp4', caption: 'Film edit — preview' }],
      desc: `For my Graphic Animation class film edit I chose CARS and built rhythm, transitions, and scene flow suited to its fast, dynamic racing culture.\n\nI focused on Adobe After Effects and published the final video on YouTube.`,
      skills: ['Film Editing', 'Motion Graphics', 'Timing & Easing', 'Adobe After Effects', 'Composition'],
      tags: ['CARS', 'Film Edit', 'After Effects', 'YouTube'],
      links: [{ label: '▶ YouTube video', url: 'https://www.youtube.com/watch?v=6_juFlb5qV4' }],
    },
    design_web3: {
      title: 'SECURELIFT TYPOGRAPHY POSTER',
      sub: 'Photoshop · Elevator-themed typography',
      images: [{ src: './design-assets/afis-2.png', caption: 'Typography poster' }],
      desc: `Because SecureLift is about predicting elevator failures, the typography poster uses a strong elevator theme in composition.\n\nI turned the project idea into typographic storytelling with vertical layout and layers, finished in Adobe Photoshop.`,
      skills: ['Typography Poster', 'Concept Design', 'Composition', 'Adobe Photoshop'],
      tags: ['SecureLift', 'Typography', 'Poster'],
    },
    design_dergi: {
      title: "CHILDREN'S STORYBOOK DESIGN",
      sub: 'Story + visual design · PDF',
      pdfPreviews: [{ src: './design-assets/masalKitab%C4%B1mSena.pdf#page=1&view=FitH', caption: "Children's storybook PDF preview" }],
      desc: `In my children's storybook project I wrote the story first, then designed all visuals in Adobe Photoshop.\n\nCharacter tone and color choices were planned for the target age group and reading flow.`,
      skills: ['Storytelling', 'Visual Storytelling', 'Publication Design', 'Adobe Photoshop'],
      tags: ['Storybook', 'Children', 'Publication'],
      links: [{ label: '📘 Storybook PDF', url: './design-assets/masalKitab%C4%B1mSena.pdf' }],
    },
    design_brosur: {
      title: 'PROLOPER LOGO DESIGN',
      sub: 'Brand design · Green/Black theme',
      images: [{ src: './design-assets/logo-color.png', caption: 'ProLoper logo' }],
      desc: `For the ProLoper logo I aimed for a reliable, technical, modern feel with green and black as primary colors.\n\nI kept the form simple for a mark that works across sizes and backgrounds.`,
      skills: ['Logo Design', 'Color Strategy', 'Minimal Form', 'Brand Identity'],
      tags: ['Logo', 'ProLoper', 'Branding'],
    },
    design_proje_afis: {
      title: 'SECURELIFT PROJECT POSTER',
      sub: 'Poster design · ProLoper',
      images: [{ src: './design-assets/web-securelift.png', caption: 'Project poster artwork' }],
      desc: `Project poster for SecureLift with strong visual hierarchy, headline layout, and accent colors to communicate the core message at a glance.`,
      skills: ['Poster Design', 'Visual Hierarchy', 'Poster Composition'],
      tags: ['SecureLift', 'Poster', 'ProLoper'],
    },
    design_afis1: {
      title: 'CORPORATE ENVELOPE DESIGN',
      sub: 'ProLoper · Planned corporate identity',
      images: [
        { src: './design-assets/zarf-1.png', caption: 'Corporate envelope design' },
        { src: './design-assets/zarf-2.png', caption: 'Alternative envelope layout' },
      ],
      desc: `Envelope design for the planned ProLoper corporate identity set, aligned with brand colors and print requirements.`,
      skills: ['Corporate Identity', 'Print Template', 'Brand Consistency'],
      tags: ['Envelope', 'ProLoper', 'Planned'],
    },
    design_afis2: {
      title: 'BUSINESS CARD DESIGN',
      sub: 'ProLoper · Planned corporate identity',
      images: [{ src: './design-assets/kartvizit.png', caption: 'Corporate business card' }],
      desc: `Planned ProLoper business card with clear typography hierarchy, print-ready layout, and brand alignment.\n\n"ProLoper" blends proactive and developer—teams building society-focused solutions, not only code.`,
      skills: ['Corporate Identity Design', 'Brand Consistency', 'Print Design'],
      tags: ['ProLoper', 'Business Card', 'Corporate Identity'],
    },
    design_animasyon: {
      title: 'LETTERHEAD DESIGN',
      sub: 'ProLoper · Planned corporate identity',
      images: [{ src: './design-assets/antetli-kagit.png', caption: 'Letterhead design' }],
      desc: `Planned ProLoper letterhead focusing on corporate color, logo placement, and formal document identity.`,
      skills: ['Corporate Identity', 'Print Material', 'Document Design'],
      tags: ['Letterhead', 'ProLoper', 'Planned'],
    },
    cert_wenergy: {
      title: 'W-ENERGY BASIC ENTREPRENEURSHIP PROGRAM',
      desc: `I completed the W-Energy Basic Entrepreneurship Program by Yönderle Academy, covering leadership, team building, innovation management, and introductory business development—my first step into entrepreneurship.`,
      skills: ['Entrepreneurship Fundamentals', 'Leadership', 'Innovation', 'Teamwork'],
      tags: ['2022', 'Entrepreneurship', 'Yönderle', 'W-Energy'],
      links: [{ label: '💡 Verify certificate', url: 'https://sertifika.learneco.co/tr/verify/28017814417770' }],
    },
  },
};

function mergeOverride(base, override) {
  if (!override) return base;
  const out = { ...base };
  for (const k of Object.keys(override)) {
    if (override[k] && typeof override[k] === 'object' && !Array.isArray(override[k]) && typeof base[k] === 'object' && base[k] && !Array.isArray(base[k])) {
      out[k] = mergeOverride(base[k], override[k]);
    } else {
      out[k] = override[k];
    }
  }
  return out;
}

function buildStore(tr, overrides) {
  const auto = applyCaptionMap(deepTranslate(tr));
  const out = {};
  for (const key of Object.keys(auto)) {
    out[key] = applyCaptionMap(mergeOverride(auto[key], overrides?.[key]));
  }
  return out;
}

const en = {
  panel: buildStore(panelDataTR, OVERRIDES.panel),
  project: buildStore(projectDataTR, OVERRIDES.project),
  item: buildStore(itemDataTR, OVERRIDES.item),
};

const outJs = `/* Auto-generated English portfolio data — build-i18n-en.mjs */
window.PORTFOLIO_EN = ${JSON.stringify(en, null, 0)};
`;

fs.writeFileSync('i18n-en.js', outJs);
console.log('Wrote i18n-en.js', (outJs.length / 1024).toFixed(1), 'KB');
