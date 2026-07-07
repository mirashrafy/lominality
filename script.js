const header = document.querySelector("[data-header]");
const leadForm = document.querySelector("[data-lead-form]");
const formStatus = document.querySelector("[data-form-status]");
const revealItems = document.querySelectorAll(".reveal");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(leadForm);
  const name = formData.get("name") || "there";

  formStatus.textContent = `Thanks, ${name}. Your request is ready for backend submission.`;
  leadForm.reset();
});
