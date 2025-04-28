const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const TEL_REGEX = /^\d{2,3}-?\d{3,4}-?\d{4}$/


function callCreateIssueHello() {
  axios.get('https://lxxofjjdpxrprtapiwww.supabase.co/functions/v1/createissue').then(console.log);
}

function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  const { company, email, phone, content } = data;

  if (company.trim().length <= 1) {
    alert('회사/단지명을 확인해주세요.');
    document.querySelector('#company').focus();
    return;
  }
  if (!EMAIL_REGEX.test(email)) {
    alert('이메일을 확인해주세요.');
    document.querySelector('#email').focus();
    return;
  }
  if (!TEL_REGEX.test(phone)) {
    alert('전화번호를 확인해주세요.');
    document.querySelector('#phone').focus();
    return;
  }
  if (content.trim().length < 10) {
    alert('문의사항을 10자이상 입력해주세요');
    document.querySelector('#content').focus();
    return;
  }

  console.log(data);
  // 주석 제거하면 바로 사용 가능
  // axios.post('https://lxxofjjdpxrprtapiwww.supabase.co/functions/v1/createissue', data).then(console.log);
}

window.addEventListener('DOMContentLoaded', async ()=> {
  // functions
});

