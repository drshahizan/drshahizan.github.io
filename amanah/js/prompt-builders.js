/* Pembina prompt: Kerja, Studio, Multimedia, Analisis Data.
   Berjalan sepenuhnya dalam pelayar; tiada data dihantar atau disimpan. */
(function () {
  const v = (d, k) => (d.get(k) || '').toString().trim();
  const or = (x, alt) => x || alt;
  const KAWALAN =
    'KAWALAN\n' +
    '- Jangan mereka fakta, nama, tarikh, angka, peraturan atau keputusan.\n' +
    '- Jika maklumat tiada atau bercanggah, tulis "Tidak dinyatakan dalam sumber" atau "Perlu pengesahan".\n' +
    '- Bezakan fakta bersumber daripada cadangan atau andaian.\n' +
    '- Jangan minta atau paparkan data peribadi, maklumat sulit atau terperingkat.\n' +
    '- Hasil ialah draf; pegawai bertanggungjawab menyemak dan meluluskan sebelum digunakan.';

  const STUDIO_SPEC = {
    'Infografik': 'Satu halaman. Maksimum 3–5 mesej utama, angka yang disahkan sahaja, hierarki visual yang jelas dan nota sumber di bahagian bawah.',
    'Slaid': 'Sasarkan [BILANGAN] slaid. Satu idea bagi setiap slaid, tajuk yang menyatakan mesej, dan nota penceramah ringkas.',
    'Audio': 'Ringkasan audio berbentuk perbualan yang jelas. Mulakan dengan konteks, terangkan perkara utama, dan akhiri dengan tindakan atau perkara untuk disahkan.',
    'Video': 'Ringkasan video dengan urutan babak yang logik: pengenalan, perkara utama, contoh dan rumusan.',
    'Peta Minda': 'Satu konsep pusat, cabang utama mengikut tema, dan sub-cabang yang merujuk kepada sumber.',
    'Kad Imbas': 'Sasarkan [BILANGAN] kad. Satu konsep atau fakta bagi setiap kad; jawapan ringkas dengan rujukan sumber.',
    'Kuiz': 'Sasarkan [BILANGAN] soalan aneka pilihan pada aras [ASAS/SEDERHANA/MAHIR]. Setiap soalan ada satu jawapan betul, pengalih yang munasabah dan penjelasan bersumber.',
    'Laporan': 'Laporan berstruktur: ringkasan eksekutif, latar belakang, dapatan bersumber, isu/percanggahan, dan tindakan yang dicadangkan.'
  };

  const ANALISIS = {
    'Deep Research': (d) =>
      `Gunakan Deep Research untuk menyediakan laporan penyelidikan tentang: ${v(d,'topik')}.\n\n` +
      `SOALAN / KEPERLUAN\n${v(d,'soalan')}\n\n` +
      `AUDIENS\n${v(d,'audiens')}\n\n` +
      `SUMBER\nUtamakan ${or(v(d,'sumber'), 'sumber rasmi kerajaan, institusi pendidikan tinggi dan penerbitan berwasit')}. Senaraikan setiap rujukan dengan tajuk, penerbit, tarikh dan pautan. Bezakan sumber rasmi daripada pendapat atau berita.\n\n` +
      `KAEDAH\n1. Rancang soalan kecil sebelum mencari.\n2. Bandingkan sekurang-kurangnya dua sumber bagi dapatan penting.\n3. Nyatakan tarikh maklumat dan tandakan maklumat yang mungkin lapuk.\n4. Asingkan dapatan, tafsiran dan cadangan.\n\n` +
      `FORMAT HASIL\n${v(d,'format')}. Mulakan dengan ringkasan dapatan utama (maksimum 5 perkara).`,
    'Canvas': (d) =>
      `Gunakan Canvas untuk membina ${v(d,'format').toLowerCase()} tentang: ${v(d,'topik')}.\n\n` +
      `KEPERLUAN\n${v(d,'soalan')}\n\n` +
      `AUDIENS\n${v(d,'audiens')}\n\n` +
      `DATA / SUMBER\n${or(v(d,'sumber'), 'Hanya fail yang saya lampirkan dalam perbualan ini.')}\n\n` +
      `KAEDAH\n1. Mula dengan profil data: lajur, bilangan baris, nilai kosong dan pendua. Jangan baiki data secara senyap.\n2. Tunjukkan formula atau langkah kiraan bagi setiap angka.\n3. Gunakan kadar berwajaran (jumlah pembilang ÷ jumlah penyebut), bukan purata kadar.\n4. Jika membina carta atau aplikasi kecil, labelkan paksi, unit, sumber dan nota batas data.\n5. Biarkan saya menyemak dan mengedit hasil dalam Canvas sebelum versi akhir.`,
    'Gems': (d) =>
      `Bina arahan untuk satu Gem (pembantu tersuai) dengan nama: "${v(d,'topik')}".\n\n` +
      `PERANAN\nAnda ialah pembantu untuk ${v(d,'audiens')}. Tugas utama: ${v(d,'soalan')}\n\n` +
      `PENGETAHUAN / SUMBER\n${or(v(d,'sumber'), 'Fail rujukan yang dimuat naik ke Gem ini sahaja.')}\nJangan jawab di luar sumber; jika tiada, nyatakan "Tidak dinyatakan dalam sumber" dan cadangkan pihak untuk dirujuk.\n\n` +
      `CARA MENJAWAB\n- Format: ${v(d,'format')}.\n- Sertakan rujukan sumber bagi setiap fakta.\n- Tanya soalan penjelasan jika permintaan kabur.\n- Jangan minta nama, nombor matrik, IC atau data peribadi pengguna.\n- Jangan membuat keputusan rasmi; arahkan kes individu kepada pegawai berkenaan.`,
    'Guided Learning': (d) =>
      `Gunakan Guided Learning untuk membimbing saya memahami: ${v(d,'topik')}.\n\n` +
      `KONSEP / KEPERLUAN\n${v(d,'soalan')}\n\n` +
      `PROFIL PELAJAR\n${v(d,'audiens')}\n\n` +
      `SUMBER\n${or(v(d,'sumber'), 'Terangkan menggunakan contoh daripada kerja pentadbiran akademik.')}\n\n` +
      `CARA MEMBIMBING\n1. Mulakan dengan menyemak apa yang saya sudah tahu.\n2. Terangkan satu konsep pada satu masa dengan contoh kerja sebenar.\n3. Beri satu soalan semakan selepas setiap konsep dan tunggu jawapan saya.\n4. Betulkan salah faham dengan penjelasan, bukan sekadar jawapan.\n5. Akhiri dengan rumusan dan ${v(d,'format').toLowerCase()}.`
  };

  const BUILD = {
    kerja: (d) =>
      `Anda ialah pembantu pentadbiran bagi bidang ${v(d,'bidang').toLowerCase()} di sebuah universiti awam.\n\n` +
      `TUGASAN\n${v(d,'tugasan')}\n\n` +
      `TUJUAN DAN PENERIMA\nHasil ini untuk ${v(d,'penerima')}.\n\n` +
      `SUMBER YANG DIBENARKAN\n${or(v(d,'sumber'), 'Hanya maklumat dalam perbualan ini.')} Rujuk pekeliling, kalendar, sistem dan keputusan rasmi yang terkini; jika tidak diberikan, nyatakan perkara yang perlu disemak.\n\n` +
      (v(d,'konteks') ? `KONTEKS (telah dinyahpengenal)\n${v(d,'konteks')}\n\n` : '') +
      `FORMAT HASIL\n${v(d,'format')}.\n\n` +
      `BAHASA DAN NADA\n${v(d,'bahasa')}; ${v(d,'nada').toLowerCase()}.\n\n` + KAWALAN,

    studio: (d) => {
      const out = v(d,'output');
      return `Hasilkan ${out.toLowerCase()} dalam Studio Gemini Notebook berdasarkan sumber dalam notebook ini sahaja.\n\n` +
        `TUJUAN\n${v(d,'tujuan')}\n\n` +
        `AUDIENS\n${v(d,'audiens')}\n\n` +
        `FOKUS UTAMA\n${v(d,'fokus')}\n\n` +
        `STRUKTUR\n${v(d,'struktur')}. ${STUDIO_SPEC[out] || ''}\n\n` +
        `BUKTI\n${v(d,'bukti')}. Jangan masukkan fakta, angka atau tarikh yang tiada dalam sumber. Tandakan percanggahan antara sumber.\n\n` +
        `GAYA\n${v(d,'gaya')}. Bahasa: ${v(d,'bahasa')}.\n\n` +
        (v(d,'kekangan') ? `KEKANGAN\n${v(d,'kekangan')}\n\n` : '') +
        `SEMAKAN\nAkhiri dengan senarai ringkas perkara yang perlu disahkan oleh pegawai sebelum ${out.toLowerCase()} ini dikongsi.`;
    },

    multimedia: (d) => {
      const jenis = v(d,'jenis');
      if (jenis === 'Muzik Latar') {
        return `Hasilkan muzik latar untuk: ${v(d,'tajuk')}.\n\n` +
          `AUDIENS DAN KONTEKS\n${v(d,'audiens')}\n\n` +
          `MOOD / GENRE\n${v(d,'mesej')}\n\n` +
          `NADA\n${v(d,'gaya')}.\n\n` +
          (v(d,'wajib') ? `ELEMEN WAJIB\n${v(d,'wajib')}\n\n` : '') +
          `SPESIFIKASI\nInstrumental tanpa lirik, sesuai sebagai latar kepada suara penyampai, tempo stabil, tiada bunyi mengejut. Nyatakan cadangan tempoh dan tempo (BPM).\n\n` +
          (v(d,'kekangan') ? `KEKANGAN\n${v(d,'kekangan')}\n\n` : '') +
          `PERINGATAN\nJangan meniru lagu, artis atau melodi yang dikenali. Hasil perlu asli.`;
      }
      return `Reka ${jenis.toLowerCase()} untuk: ${v(d,'tajuk')}.\n\n` +
        `AUDIENS\n${v(d,'audiens')}\n\n` +
        `MESEJ DAN TEKS\n${v(d,'mesej')}\nGunakan teks ini tepat seperti yang ditulis; semak ejaan setiap perkataan dalam imej.\n\n` +
        `GAYA VISUAL\n${v(d,'gaya')}. Warna/tema: ${or(v(d,'warna'), 'ikut kesesuaian mesej')}.\n\n` +
        `SAIZ\n${v(d,'saiz')}.\n\n` +
        `BAHASA TEKS DALAM IMEJ\n${v(d,'bahasa')}.\n\n` +
        (v(d,'wajib') ? `ELEMEN WAJIB\n${v(d,'wajib')}\n\n` : '') +
        `SUSUN ATUR\nHierarki jelas: tajuk utama paling menonjol, maklumat penting (tarikh, masa, tempat) mudah dibaca, ruang kosong yang mencukupi dan kontras teks yang baik.\n\n` +
        (v(d,'kekangan') ? `KEKANGAN\n${v(d,'kekangan')}\n\n` : '') +
        `PERINGATAN\nJangan gunakan logo rasmi, wajah orang sebenar atau watak berhak cipta. Jangan reka angka atau fakta. Jika teks dalam imej tidak tepat, berikan juga versi teks berasingan untuk saya semak.`;
    },

    analisis: (d) => {
      const f = ANALISIS[v(d,'ciri')];
      return f(d) + `\n\nBAHASA\n${v(d,'bahasa')}.\n\n` +
        (v(d,'kekangan') ? `KEKANGAN\n${v(d,'kekangan')}\n\n` : '') +
        'KAWALAN\n- Jangan mereka data, rujukan atau angka.\n- Tandakan had data dan andaian.\n- Jangan buat dakwaan sebab-akibat tanpa bukti.\n- Jangan masukkan data peribadi atau sulit.\n- AI memberi analisis dan cadangan sahaja; keputusan rasmi dibuat oleh pegawai bertanggungjawab.';
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form[data-builder]').forEach((form) => {
      const type = form.dataset.builder;
      const wrap = document.getElementById(form.dataset.output);
      const pre = wrap.querySelector('pre');
      const hint = wrap.querySelector('.builder-hint');
      const showHint = (on) => { if (hint) hint.hidden = !on; pre.hidden = on; wrap.querySelectorAll('.copy-prompt').forEach(b => b.disabled = on); };
      showHint(true);

      // Kemas kini placeholder mengikut pilihan (jika ditetapkan)
      form.querySelectorAll('[data-hints]').forEach((sel) => {
        const map = JSON.parse(sel.dataset.hints);
        const apply = () => {
          const h = map[sel.value] || {};
          Object.entries(h).forEach(([name, ph]) => { const el = form.elements[name]; if (el) el.placeholder = ph; });
        };
        sel.addEventListener('change', apply); apply();
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        pre.textContent = BUILD[type](new FormData(form));
        showHint(false);
        if (window.innerWidth < 900) wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      form.addEventListener('reset', () => setTimeout(() => {
        pre.textContent = ''; showHint(true);
        form.querySelectorAll('[data-hints]').forEach(s => s.dispatchEvent(new Event('change')));
      }));
      wrap.querySelectorAll('[data-clear]').forEach(b => b.addEventListener('click', () => form.reset()));
    });
  });
})();
