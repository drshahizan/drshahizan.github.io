window.PROMPT_CATEGORIES = [
  {
    id: 'komunikasi', icon: '📧', name: 'Komunikasi Rasmi', prompts: [
      {n:1,title:'E-mel Rasmi',text:`Bertindak sebagai Setiausaha Profesional di Universiti Teknologi Malaysia (UTM).

Sediakan draf e-mel rasmi kepada [penerima] berkaitan [tujuan].

Gunakan bahasa Melayu yang profesional, sopan dan ringkas.

Sertakan:
• Tajuk e-mel
• Pendahuluan
• Isi utama
• Tindakan yang diperlukan
• Penutup rasmi

Jika sesuai, hasilkan juga versi Bahasa Inggeris.`},
      {n:2,title:'Surat Rasmi',text:`Bertindak sebagai pegawai pentadbiran UTM.

Sediakan surat rasmi mengenai [perkara] kepada [agensi/individu].

Gunakan format surat rasmi universiti, bahasa profesional dan jelas.`},
      {n:3,title:'Hebahan Program',text:`Sediakan hebahan rasmi mengenai [program].

Hasilkan dalam tiga versi:
• E-mel
• WhatsApp
• Telegram

Pastikan mesej ringkas tetapi profesional.`},
      {n:4,title:'Jemputan Mesyuarat',text:`Sediakan e-mel jemputan mesyuarat kepada semua ahli mesyuarat.

Sertakan:
• tujuan mesyuarat
• tarikh
• masa
• tempat
• agenda ringkas
• dokumen yang perlu dibawa
• pengesahan kehadiran.`},
      {n:5,title:'Balasan E-mel Profesional',text:`Berdasarkan e-mel berikut, hasilkan balasan yang profesional, sopan dan diplomatik.

Jika terdapat permintaan, nyatakan tindakan susulan yang sesuai.`}
    ]
  },
  {
    id: 'mesyuarat', icon: '📅', name: 'Pengurusan Mesyuarat', prompts: [
      {n:6,title:'Agenda Mesyuarat',text:`Bertindak sebagai setiausaha UTM.

Sediakan agenda mesyuarat lengkap beserta objektif, agenda, pembentang dan anggaran masa.`},
      {n:7,title:'Minit Mesyuarat',text:`Berdasarkan transkrip yang diberikan, hasilkan minit mesyuarat rasmi UTM.

Jangan mereka maklumat baharu.`},
      {n:8,title:'Senarai Tindakan (Action Items)',text:`Berdasarkan minit mesyuarat berikut, hasilkan jadual tindakan.

Paparkan:
• Tugasan
• Pegawai Bertanggungjawab
• Tarikh Akhir
• Status
• Keutamaan`},
      {n:9,title:'Ringkasan Keputusan Mesyuarat',text:`Ringkaskan semua keputusan yang telah dipersetujui dalam mesyuarat.

Hasilkan dalam bentuk bullet supaya mudah diedarkan kepada ahli mesyuarat.`},
      {n:10,title:'Semakan Minit',text:`Semak minit mesyuarat berikut.

Pastikan:
• tiada keputusan tertinggal
• tindakan jelas
• tarikh tepat
• bahasa rasmi
• format konsisten.`}
    ]
  },
  {
    id: 'dokumen', icon: '📄', name: 'Pengurusan Dokumen', prompts: [
      {n:11,title:'Ringkasan Dokumen',text:`Ringkaskan dokumen berikut kepada perkara utama, keputusan, tindakan susulan dan tarikh penting.`},
      {n:12,title:'Terjemahan Dokumen',text:`Terjemahkan dokumen berikut daripada Bahasa Melayu kepada Bahasa Inggeris.

Kekalkan istilah rasmi universiti.`},
      {n:13,title:'Semakan Dokumen',text:`Semak dokumen berikut.

Kenal pasti:
• tatabahasa
• ejaan
• ayat berulang
• maklumat tidak konsisten
• nama pegawai
• jawatan
• tarikh
• nombor rujukan.`},
      {n:14,title:'Penulisan Laporan',text:`Berdasarkan maklumat berikut, hasilkan laporan rasmi menggunakan format:

• Pendahuluan
• Objektif
• Aktiviti
• Dapatan
• Rumusan
• Cadangan`},
      {n:15,title:'Semakan Polisi / Pekeliling',text:`Ringkaskan pekeliling berikut.

Nyatakan:
• perubahan utama
• implikasi kepada fakulti
• tindakan yang perlu diambil
• tarikh kuat kuasa.`}
    ]
  },
  {
    id: 'program', icon: '🎓', name: 'Pengurusan Program dan Pentadbiran', prompts: [
      {n:16,title:'Kertas Kerja Program',text:`Sediakan kertas kerja lengkap bagi program berikut mengikut format UTM.`},
      {n:17,title:'Checklist Program',text:`Hasilkan checklist lengkap penganjuran program bermula daripada perancangan sehingga laporan akhir.`},
      {n:18,title:'Tentatif Program',text:`Berdasarkan maklumat berikut, hasilkan tentatif program yang profesional.

Sertakan:
• masa
• aktiviti
• pegawai bertugas
• lokasi.`},
      {n:19,title:'Jadual Harian Pegawai',text:`Susunkan jadual harian pegawai berdasarkan senarai mesyuarat, janji temu dan tugasan.

Kenal pasti konflik jadual dan cadangkan penyelesaian.`},
      {n:20,title:'Senarai Semak Sebelum Majlis',text:`Sediakan checklist lengkap sebelum sesuatu majlis berlangsung.

Sertakan:
• tempahan bilik
• jamuan
• sijil
• banner
• VIP
• cenderamata
• jurugambar
• dokumentasi
• publisiti.`}
    ]
  },
  {
    id: 'data', icon: '📊', name: 'Analisis Data dan Produktiviti', prompts: [
      {n:21,title:'Analisis Data',text:`Analisis data berikut.

Hasilkan:
• Ringkasan
• Trend
• Perbandingan
• Cadangan tindakan.`},
      {n:22,title:'Dashboard Pengurusan',text:`Berdasarkan data berikut, hasilkan dashboard pengurusan.

Cadangkan carta yang sesuai dan rumusan eksekutif.`},
      {n:23,title:'Penyediaan Slaid Taklimat',text:`Sediakan rangka slaid pembentangan mengenai [tajuk].

Untuk setiap slaid nyatakan tajuk, isi utama, visual dan nota pembentang.`},
      {n:24,title:'Perancangan Tugasan Mingguan',text:`Berdasarkan senarai tugasan berikut, susunkan pelan kerja mingguan mengikut keutamaan.

Bahagikan kepada:
• Segera
• Penting
• Boleh ditangguhkan
• Delegasi

Cadangkan anggaran masa bagi setiap tugasan.`},
      {n:25,title:'Pembantu AI Peribadi Setiausaha',text:`Bertindak sebagai pembantu peribadi digital kepada seorang setiausaha di Universiti Teknologi Malaysia (UTM).

Berdasarkan tugasan, e-mel, mesyuarat dan jadual yang diberikan, bantu saya:
• mengenal pasti keutamaan kerja
• mencadangkan tindakan susulan
• menyediakan peringatan tugasan
• menyusun jadual harian
• mencadangkan cara meningkatkan produktiviti

Berikan jawapan yang praktikal, profesional dan sesuai dengan persekitaran pentadbiran universiti.`}
    ]
  },
  {
    id: 'poster', icon: '🎨', name: 'Reka Bentuk Poster dan Bahan Promosi', prompts: [
      {n:26,title:'Poster Program',text:`Bertindak sebagai pereka grafik profesional di Universiti Teknologi Malaysia (UTM).

Hasilkan konsep poster bagi program berikut:

Tajuk:
Tarikh:
Masa:
Tempat:
Penganjur:
Sasaran:

Cadangkan:
• Tajuk yang menarik
• Susun atur poster
• Skema warna mengikut identiti korporat UTM
• Ikon atau ilustrasi yang sesuai
• Call-to-Action (CTA)
• Prompt lengkap untuk menjana poster menggunakan Google Gemini.`},
      {n:27,title:'Poster Hebahan Dalaman',text:`Sediakan kandungan poster hebahan dalaman mengenai [tajuk].

Gunakan bahasa yang ringkas, profesional dan mudah difahami oleh warga universiti.

Cadangkan reka bentuk moden berserta prompt lengkap untuk Google Gemini.`},
      {n:28,title:'Infografik',text:`Tukarkan maklumat berikut kepada sebuah infografik yang menarik.

Susun kandungan mengikut:
• Tajuk
• Fakta utama
• Statistik
• Ikon
• Warna
• Susun atur

Hasilkan prompt lengkap untuk Google Gemini.`},
      {n:29,title:'Banner Digital',text:`Sediakan kandungan banner digital bagi program berikut.

Cadangkan:
• Tajuk utama
• Tagline
• Visual utama
• Warna
• Saiz sesuai untuk paparan skrin LED dan media sosial.

Hasilkan prompt lengkap untuk Google Gemini.`},
      {n:30,title:'Kandungan Media Sosial',text:`Bertindak sebagai pegawai komunikasi korporat UTM.

Sediakan kandungan promosi untuk:
• Facebook
• Instagram
• LinkedIn
• Telegram

Sertakan kapsyen, hashtag yang sesuai dan cadangan visual.

Hasilkan prompt lengkap untuk Google Gemini.`}
    ]
  },
  {
    id: 'video', icon: '🎬', name: 'Penghasilan Video dan Multimedia', prompts: [
      {n:31,title:'Video Promosi Program',text:`Bertindak sebagai penerbit video profesional.

Sediakan storyboard video promosi berdurasi 60 saat mengenai [tajuk program].

Bahagikan kepada beberapa babak dan nyatakan:
• Visual
• Naratif
• Teks di skrin
• Muzik latar
• Durasi setiap babak

Hasilkan prompt lengkap untuk Google Gemini.`},
      {n:32,title:'Video Ucapan Aluan',text:`Sediakan skrip video ucapan aluan selama 1 hingga 2 minit untuk [nama pegawai] sempena [program].

Sertakan:
• Pembukaan
• Isi utama
• Penutup
• Cadangan visual
• Cadangan sudut kamera

Hasilkan prompt lengkap untuk Google Gemini.`},
      {n:33,title:'Video Ringkasan Aktiviti',text:`Berdasarkan laporan program berikut, hasilkan storyboard video sorotan aktiviti berdurasi 90 saat.

Sertakan:
• Susunan babak
• Naratif
• Teks di skrin
• Muzik yang sesuai
• Transition

Hasilkan prompt lengkap untuk Google Gemini.`},
      {n:34,title:'Skrip Voice Over',text:`Tulis skrip voice over profesional bagi video mengenai [tajuk].

Gunakan bahasa yang mudah difahami, formal dan sesuai untuk warga universiti.

Anggaran tempoh bacaan ialah [60 saat / 90 saat / 2 minit].`},
      {n:35,title:'Video Resume atau Video Korporat',text:`Bertindak sebagai penerbit video korporat.

Hasilkan storyboard lengkap bagi video berdurasi 2 minit mengenai [tajuk].

Sertakan:
• Pembukaan yang menarik
• Jalan cerita
• Babak demi babak
• Naratif
• Visual
• Pergerakan kamera
• Muzik latar
• Penutup yang memberi impak

Hasilkan prompt lengkap yang boleh terus digunakan dalam Google Gemini untuk menjana video.`}
    ]
  }
];
