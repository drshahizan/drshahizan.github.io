document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('kuiz-kendiri');
  const result=document.getElementById('kuiz-result');
  const resetButton=document.getElementById('kuiz-reset');
  if(!form||!result)return;
  const fieldsets=[...form.querySelectorAll('fieldset[data-correct]')];

  const clearMarks=()=>{
    fieldsets.forEach(fieldset=>{
      fieldset.style.borderColor='#e8dedf';
      fieldset.style.background='#fff';
    });
  };

  form.addEventListener('submit',event=>{
    event.preventDefault();
    let answered=0;
    let score=0;
    fieldsets.forEach(fieldset=>{
      const correct=fieldset.dataset.correct;
      const checked=fieldset.querySelector('input[type="radio"]:checked');
      if(checked){
        answered++;
        const isRight=checked.value===correct;
        if(isRight)score++;
        fieldset.style.borderColor=isRight?'#2f7d4f':'#a3273c';
        fieldset.style.background=isRight?'#f1f8f3':'#fdf1f2';
      } else {
        fieldset.style.borderColor='#d5a928';
        fieldset.style.background='#fffaf0';
      }
    });
    if(answered<fieldsets.length){
      result.textContent=`Sila jawab semua ${fieldsets.length} soalan sebelum menyemak. (${answered}/${fieldsets.length} dijawab)`;
      result.style.color='#a3273c';
      return;
    }
    result.textContent=`Skor anda: ${score} daripada ${fieldsets.length} betul.`;
    result.style.color=score===fieldsets.length?'#2f7d4f':'#7a0026';
  });

  resetButton?.addEventListener('click',()=>{
    form.reset();
    clearMarks();
    result.textContent='';
  });
});
