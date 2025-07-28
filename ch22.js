// العناصر الأساسية
const modal = document.getElementById("backProjectModal");
const openModalBtn = document.getElementById("btn"); // container فيه <p>
const closeModalBtn = document.querySelector(".close-btn");

const pledgeRadios = document.querySelectorAll(".select-pledge");
const pledgeForms = document.querySelectorAll(".pledge-form");
const continueBtns = document.querySelectorAll(".continue-btn");

// زر العودة لأعلى
const scrollTopBtn = document.getElementById("scrollTopBtn");

// شريط التقدّم
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// بيانات التبرع الأولي
let currentAmount = 89914;
const targetAmount = 100000;

// ---------------------------
// وظائف المودال
// ---------------------------
openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// ---------------------------
// إظهار الحقل عند اختيار pledge
// ---------------------------
pledgeRadios.forEach((radio, index) => {
    radio.addEventListener("change", () => {
        pledgeForms.forEach((form, i) => {
            form.classList.toggle("hidden", i !== index);
        });
    });
});

// ---------------------------
// تحديث التقدم
// ---------------------------
function updateProgress(amount) {
    const percentage = Math.min((amount / targetAmount) * 100, 100);
    progressBar.style.width = percentage + "%";
    progressText.textContent = `${Math.floor(percentage)}% Funded`;
}

updateProgress(currentAmount); // أول مرة

// ---------------------------
// زر Continue
// ---------------------------
continueBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const input = btn.previousElementSibling; // input الذي قبل الزر
        const value = parseInt(input.value);

        if (isNaN(value) || value < 1) {
            alert("Please enter a valid pledge amount.");
            return;
        }

        currentAmount += value;
        updateProgress(currentAmount);

        alert("✅ Done! Thank you for your support!");
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });
});


scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
