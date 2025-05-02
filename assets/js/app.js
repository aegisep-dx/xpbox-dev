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
document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // 1. 비주얼 아이콘 애니메이션 순차 실행
  // =========================
  const icons = document.querySelectorAll('.visual-icon');
  icons.forEach((el, idx) => {
    el.style.setProperty('--delay', `${idx * 0.1}s`);
    el.classList.add('active');
  });


  // =========================
  // 2. 헤더 active 처리 (스크롤 시 or 초기 로딩 시)
  // =========================
  const header = document.querySelector('header');
  const mainVisual = document.querySelector('.main-visual');

  function checkHeaderActivation() {
    const visualHeight = mainVisual.offsetHeight - 40;
    const scrollTop = window.scrollY;

    if (scrollTop > visualHeight) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  }

  window.addEventListener('scroll', checkHeaderActivation);
  checkHeaderActivation(); // 초기 실행

  document.querySelectorAll('header a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        const targetOffset = targetEl.offsetTop;

        // upslide 중 target보다 위에 있는 모든 섹션에 active 부여
        document.querySelectorAll('section.upslide').forEach(section => {
          if (section.offsetTop < targetOffset) {
            section.classList.add('active');
          }
        });

        // 타겟도 약간의 delay 후 active 부여
        if (targetEl.classList.contains('upslide')) {
          setTimeout(() => {
            targetEl.classList.add('active');
          }, 300); // 스크롤 완료 예상 시간
        }
      }
    });
  });


  // =========================
  // 3. IntersectionObserver를 이용한 .upslide 활성화
  // =========================
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // 한 번만 실행
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('article:not(#intro) section.upslide').forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const currentScroll = window.scrollY + window.innerHeight;

    // 스크롤된 위치에 이미 보이는 경우 바로 active
    if (currentScroll >= sectionTop + (section.offsetHeight * 0.1)) {
      section.classList.add('active');
    } else {
      observer.observe(section);
    }
  });


  // =========================
  // 4. 설치 가이드 드롭다운 초기 상태 및 토글
  // =========================
  const installBtn = document.querySelector('.installation-drop-btn button');
  const installList = document.querySelector('.installation-list');

  if (installBtn && installList) {
    installBtn.setAttribute('aria-expanded', 'true');
    installList.classList.add('active');

    installBtn.addEventListener('click', () => {
      const isExpanded = installBtn.getAttribute('aria-expanded') === 'true';
      installBtn.setAttribute('aria-expanded', !isExpanded);
      installList.classList.toggle('active', !isExpanded);
    });
  }


  // =========================
  // 5. FAQ 아코디언
  // =========================
  document.querySelectorAll('.faq-question-btn').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));

      const faqItem = button.closest('.faq-list-item');
      if (faqItem) {
        faqItem.classList.toggle('active', !expanded);
      }
    });
  });
  
  //모달 이벤트
  const btnLawDetail = document.getElementById("btnLawDetail"); //
  const btnCheckModal = document.getElementById("btnCheckModal"); // 
  const modalDim = document.querySelector(".modal-dim"); // 클래스 기반으로 선택
  const lawModal = document.getElementById("lawModal"); 
  const checkModal = document.getElementById("checkModal");
  const closeBtns = document.querySelectorAll(".close-btn");

  // 모달 열기
  btnLawDetail.addEventListener("click", () => {
    modalDim.classList.add("active");
    lawModal.classList.add("active");
  });

  btnCheckModal.addEventListener("click", () => {
    modalDim.classList.add("active");
    checkModal.classList.add("active");
  });

  // 모달 닫기 (모든 close-btn에 적용)
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalDim.classList.remove("active");
      document.querySelectorAll(".modal-pop").forEach((modal) => {
        modal.classList.remove("active");
      });
    });
  });


});


// TODO 현재 새로고침하면 active활성화 된 부분때문에 번쩍하는 경우가 생깁니다. 번쩍하지 않게, 최상단으로 이동 혹은 기존 스크롤  위치에서도 문제없이 번쩍안하고 노출되게 가능할까요?
window.addEventListener('load', () => {
  // // 세션 데이터 초기화 (새로고침 시 이전 세션 상태를 지움)
  // sessionStorage.removeItem('activeSection');

  // // 페이지 로딩 후 맨 위로 스크롤
  // setTimeout(() => {
  //   window.scrollTo(0, 0);
  // }, 0);  // 0ms 지연

  document.querySelectorAll('article:not(#intro) section.upslide').forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const currentScroll = window.scrollY + window.innerHeight;

    if (currentScroll >= sectionTop + (section.offsetHeight * 0.1)) {
      section.classList.add('active');
    } else {
      observer.observe(section);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('scrollTrack');
  const clones = track.cloneNode(true); // 전체 트랙을 복제
  track.parentElement.appendChild(clones); // 복제 트랙 추가

  let pos = 0;
  const speed = 0.5; // 느리게 움직일수록 작게 설정

  function animate() {
    pos -= speed;
    if (Math.abs(pos) >= track.offsetWidth) {
      pos = 0; // 다시 처음으로
    }

    track.style.transform = `translateX(${pos}px)`;
    clones.style.transform = `translateX(${pos}px)`;

    requestAnimationFrame(animate);
  }

  animate();
});


