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

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // 한 번만 작동하게
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('article:not(#intro) section.upslide').forEach(section => {
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  const currentScroll = window.scrollY + window.innerHeight;

  if (currentScroll > sectionTop + (section.offsetHeight * 0.1)) {
    // 이미 화면에 충분히 노출된 상태면 바로 active
    section.classList.add('active');
  } else {
    // 아직 노출 안됐으면 observer로 감시
    observer.observe(section);
  }
});


// #intro만 제외하고, 나머지 article에 observe 설정 (introSub 포함)
document.querySelectorAll('article:not(#intro) section.upslide').forEach(section => {
  observer.observe(section);
});


document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.installation-drop-btn button');
  const list = document.querySelector('.installation-list');

  // 처음에는 펼쳐져 있도록 설정
  button.setAttribute('aria-expanded', 'true');
  list.classList.add('active');  // 'active' 클래스 추가하여 펼쳐놓기

  // 클릭 시 토글 처리
  button.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';

    // 토글 상태 변경
    this.setAttribute('aria-expanded', !isExpanded);
    list.classList.toggle('active', !isExpanded);
  });
});


document.querySelectorAll('.faq-question-btn').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));

    // 부모 li.section-card.faq에 .active 토글
    const faqItem = button.closest('.faq-list-item');
    if (faqItem) {
      faqItem.classList.toggle('active', !expanded);
    }
  });
});


