(function () {
      const header = document.querySelector('header');
      const toggle = document.querySelector('.menu-toggle');
      const nav = document.getElementById('site-nav');

      // Mobile menu toggle
      if (toggle && nav) {
        toggle.addEventListener('click', function (e) {
          e.stopPropagation();
          const open = nav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', String(open));
        });
        // Close on link click
        nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }));
        // Close on outside click
        document.addEventListener('click', function (e) {
          if (!nav.classList.contains('open')) return;
          if (!nav.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
        // Reset when resizing up
        window.addEventListener('resize', function () {
          if (window.innerWidth > 700) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }

      const yearSpan = document.getElementById('current-year');
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }

      // Contact Modal Logic
      const contactModal = document.getElementById('contactModal');
      const openModalBtns = document.querySelectorAll('.open-contact-modal');
      const closeModalBtn = document.getElementById('closeModalBtn');

      function openModal(e) {
        e.preventDefault();
        contactModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }

      function closeModal() {
        contactModal.classList.remove('open');
        document.body.style.overflow = '';
      }

      if (contactModal) {
        openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
        closeModalBtn.addEventListener('click', closeModal);

        // Close on outside click
        contactModal.addEventListener('click', function (e) {
          if (e.target === contactModal) {
            closeModal();
          }
        });

        // Phone Input Formatting
        const phoneInput = document.getElementById('phone');
        const phoneHidden = document.getElementById('phone-hidden');
        const countryCode = document.getElementById('country-code');

        function updatePhoneHidden() {
          const rawNumbers = phoneInput.value.replace(/\D/g, '');
          phoneHidden.value = countryCode.value + ' ' + rawNumbers;
        }

        if (phoneInput) {
          phoneInput.addEventListener('input', function (e) {
            let rawValue = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (rawValue.length > 0) {
              formattedValue = rawValue.substring(0, 4);
            }
            if (rawValue.length > 4) {
              formattedValue += ' ' + rawValue.substring(4, 7);
            }
            if (rawValue.length > 7) {
              formattedValue += ' ' + rawValue.substring(7, 10);
            }
            
            e.target.value = formattedValue;
            updatePhoneHidden();
          });
          
          countryCode.addEventListener('change', updatePhoneHidden);
        }

        // Handle Web3Forms submission via AJAX
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', async function (e) {
          e.preventDefault();
          // Ensure phone hidden field is populated right before submit
          if (typeof updatePhoneHidden === 'function') updatePhoneHidden();

          const submitBtn = contactForm.querySelector('.submit-btn');
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;

          const formData = new FormData(contactForm);
          
          try {
            const response = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              body: formData
            });
            const data = await response.json();
            
            if (data.success) {
              alert('Thank you! Your request has been sent. We will contact you shortly to confirm a spot.');
              closeModal();
              contactForm.reset();
            } else {
              alert('Something went wrong. Please try calling us instead.');
            }
          } catch (error) {
            alert('Something went wrong. Please try calling us instead.');
          } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
        });
      }
    })();
