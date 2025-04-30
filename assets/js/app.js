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

const icons = document.querySelectorAll('.visual-icon');

icons.forEach((el, idx) => {
  el.style.setProperty('--delay', `${idx * 0.1}s`);
  el.classList.add('active'); // 애니메이션 트리거됨
});

// 스크롤 시 header에 클래스 부여
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});

// article 활성화 (intro 제외, introSub는 포함)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      // entry.target.classList.remove('active'); // 필요 없으면 삭제 가능
    }
  });
}, {
  threshold: 0.2 // 20% 보일 때 작동
});

// #intro만 제외하고, 나머지 article에 observe 설정 (introSub 포함)
document.querySelectorAll('article:not(#intro) section').forEach(section => {
  observer.observe(section);
});

// #intro는 로딩 시 바로 active 클래스 붙이기
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.querySelector('#intro');
  const section = intro ? intro.querySelector('section') : null; // article 안의 section을 찾아서
  if (section) section.classList.add('active'); // section에 active 클래스 추가
});

