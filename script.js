const interviewApplications = [];
const rejectedApplications = [];
let currentFilterType = 'btn_filter_all';

const totalStatsDisplay = document.getElementById("total_counter");
const currentCategoryCount = document.getElementById("active_count_display");
const interviewStatsDisplay = document.getElementById("interview_counter");
const rejectedStatsDisplay = document.getElementById("rejected_counter");

const mainContainer = document.getElementById("main_job_list");
const filteredContainer = document.getElementById("filtered_job_list");
const bodyElement = document.querySelector("main");

const filterBtnAll = document.getElementById("btn_filter_all");
const filterBtnInterview = document.getElementById("btn_filter_interview");
const filterBtnRejected = document.getElementById("btn_filter_rejected");

function refreshStatsAndUI() {
  const totalJobCount = mainContainer.children.length;
  totalStatsDisplay.innerText = totalJobCount;

  if (currentFilterType === 'btn_filter_interview') {
    currentCategoryCount.innerText = `${interviewApplications.length} of ${totalJobCount}`;
  } else if (currentFilterType === 'btn_filter_rejected') {
    currentCategoryCount.innerText = `${rejectedApplications.length} of ${totalJobCount}`;
  } else {
    currentCategoryCount.innerText = totalJobCount;
  }

  interviewStatsDisplay.innerText = interviewApplications.length;
  rejectedStatsDisplay.innerText = rejectedApplications.length;
}

refreshStatsAndUI();

function handleFilterSwitch(targetId) {
  [filterBtnAll, filterBtnInterview, filterBtnRejected].forEach(btn => {
    btn.classList.remove("bg-indigo-600", "text-white", "hover:bg-indigo-700", "border-none");
    btn.classList.add("bg-white", "text-slate-600", "hover:bg-slate-50", "border", "border-slate-200");
  });

  const activeBtn = document.getElementById(targetId);
  currentFilterType = targetId;

 
  activeBtn.classList.remove("bg-white", "text-slate-600", "hover:bg-slate-50", "border", "border-slate-200");
  activeBtn.classList.add("bg-indigo-600", "text-white", "hover:bg-indigo-700", "border-none");

  if (targetId === 'btn_filter_interview') {
    mainContainer.classList.add('hidden');
    filteredContainer.classList.remove('hidden');
    renderInterviewApplications();
  } else if (targetId === 'btn_filter_all') {
    mainContainer.classList.remove('hidden');
    filteredContainer.classList.add('hidden');
  } else if (targetId === 'btn_filter_rejected') {
    mainContainer.classList.add('hidden');
    filteredContainer.classList.remove('hidden');
    renderRejectedApplications();
  }
  refreshStatsAndUI();
}

bodyElement.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("action_mark_interview")) {
    const card = target.closest('.job_card');
    const jobData = {
      companyName: card.querySelector(".company_name").innerText,
      jobTitle: card.querySelector(".job_title").innerText,
      salaryInfo: card.querySelector(".salary_info").innerText,
      jobDescription: card.querySelector(".job_description").innerText,
      status: 'Interview'
    };

   
    const mainCard = Array.from(mainContainer.children).find(c =>
      c.querySelector('.company_name').innerText === jobData.companyName
    );
    if (mainCard) {
      const statusChip = mainCard.querySelector('.application_status');
      statusChip.innerText = 'Interview';
      statusChip.className = 'inline-block px-4 py-1.5 rounded-full border border-emerald-200 text-sm font-bold bg-emerald-50 text-emerald-600 application_status';
    }

    if (!interviewApplications.find(item => item.companyName === jobData.companyName)) {
      interviewApplications.push(jobData);
    }


    const rIndex = rejectedApplications.findIndex(item => item.companyName === jobData.companyName);
    if (rIndex !== -1) rejectedApplications.splice(rIndex, 1);

    if (currentFilterType === 'btn_filter_interview') renderInterviewApplications();
    if (currentFilterType === 'btn_filter_rejected') renderRejectedApplications();
    refreshStatsAndUI();
  }

  else if (target.classList.contains("action_mark_rejected")) {
    const card = target.closest('.job_card');
    const jobData = {
      companyName: card.querySelector(".company_name").innerText,
      jobTitle: card.querySelector(".job_title").innerText,
      salaryInfo: card.querySelector(".salary_info").innerText,
      jobDescription: card.querySelector(".job_description").innerText,
      status: 'Rejected'
    };

    const mainCard = Array.from(mainContainer.children).find(c =>
      c.querySelector('.company_name').innerText === jobData.companyName
    );
    if (mainCard) {
      const statusChip = mainCard.querySelector('.application_status');
      statusChip.innerText = 'Rejected';
      statusChip.className = 'inline-block px-4 py-1.5 rounded-full border border-rose-200 text-sm font-bold bg-rose-50 text-rose-600 application_status';
    }

    if (!rejectedApplications.find(item => item.companyName === jobData.companyName)) {
      rejectedApplications.push(jobData);
    }

 
    const iIndex = interviewApplications.findIndex(item => item.companyName === jobData.companyName);
    if (iIndex !== -1) interviewApplications.splice(iIndex, 1);

    if (currentFilterType === 'btn_filter_interview') renderInterviewApplications();
    if (currentFilterType === 'btn_filter_rejected') renderRejectedApplications();
    refreshStatsAndUI();
  }


  else if (target.closest('.action_delete_job')) {
    const card = target.closest('.job_card');
    const companyName = card.querySelector(".company_name").innerText;


    const iIndex = interviewApplications.findIndex(item => item.companyName === companyName);
    if (iIndex !== -1) interviewApplications.splice(iIndex, 1);

    const rIndex = rejectedApplications.findIndex(item => item.companyName === companyName);
    if (rIndex !== -1) rejectedApplications.splice(rIndex, 1);

   
    document.querySelectorAll('.job_card').forEach(c => {
      if (c.querySelector('.company_name').innerText === companyName) {
        c.remove();
      }
    });

    if (currentFilterType === 'btn_filter_interview') renderInterviewApplications();
    if (currentFilterType === 'btn_filter_rejected') renderRejectedApplications();
    refreshStatsAndUI();
  }
});

function showEmptyStateMessage(message) {
  filteredContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-24 px-6 text-center space-y-4 border border-dashed border-slate-200 rounded-4xl bg-white shadow-sm">
            <div class="text-7xl text-slate-100">
                <i class="fa-solid fa-folder-open"></i>
            </div>
            <div>
                <h3 class="text-2xl font-bold text-slate-400">${message}</h3>
                <p class="text-slate-300 mt-2 font-medium">Keep moving forward in your job hunt!</p>
            </div>
        </div>
    `;
}

function renderInterviewApplications() {
  if (interviewApplications.length === 0) {
    showEmptyStateMessage("No interview invites yet.");
    return;
  }
  filteredContainer.innerHTML = '';
  interviewApplications.forEach(job => {
    const div = document.createElement('div');
    div.className = "job_card relative flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow gap-6";
    div.innerHTML = `
            <div class="space-y-4 w-full md:w-auto pr-10">
                <div>
                    <h3 class="company_name text-2xl md:text-3xl font-bold text-slate-900">${job.companyName}</h3>
                    <p class="job_title text-lg md:text-xl text-indigo-600 font-medium mt-1">${job.jobTitle}</p>
                </div>
                <p class="salary_info text-slate-500 font-medium">${job.salaryInfo}</p>
                <div class="inline-block px-4 py-1.5 rounded-full border border-emerald-200 text-sm font-bold bg-emerald-100 text-emerald-700 application_status">${job.status}</div>
                <p class="job_description text-slate-600 leading-relaxed max-w-2xl">${job.jobDescription}</p>
                <div class="flex flex-wrap gap-3 pt-2">
                    <button class="btn btn-sm rounded-full bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 px-5 font-bold action_mark_interview">Interview</button>
                    <button class="btn btn-sm rounded-full bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 px-5 font-bold action_mark_rejected">Rejected</button>
                </div>
            </div>
            <div class="absolute top-6 right-6">
                <button class="btn btn-ghost btn-circle text-slate-300 hover:text-rose-500 transition-colors action_delete_job">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>`;
    filteredContainer.appendChild(div);
  });
}

function renderRejectedApplications() {
  if (rejectedApplications.length === 0) {
    showEmptyStateMessage("No rejected applications found.");
    return;
  }
  filteredContainer.innerHTML = '';
  rejectedApplications.forEach(job => {
    const div = document.createElement('div');
    div.className = "job_card relative flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow gap-6";
    div.innerHTML = `
            <div class="space-y-4 w-full md:w-auto pr-10">
                <div>
                    <h3 class="company_name text-2xl md:text-3xl font-bold text-slate-900">${job.companyName}</h3>
                    <p class="job_title text-lg md:text-xl text-indigo-600 font-medium mt-1">${job.jobTitle}</p>
                </div>
                <p class="salary_info text-slate-500 font-medium">${job.salaryInfo}</p>
                <div class="inline-block px-4 py-1.5 rounded-full border border-rose-200 text-sm font-bold bg-rose-100 text-rose-700 application_status">${job.status}</div>
                <p class="job_description text-slate-600 leading-relaxed max-w-2xl">${job.jobDescription}</p>
                <div class="flex flex-wrap gap-3 pt-2">
                    <button class="btn btn-sm rounded-full bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 px-5 font-bold action_mark_interview">Interview</button>
                    <button class="btn btn-sm rounded-full bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 px-5 font-bold action_mark_rejected">Rejected</button>
                </div>
            </div>
            <div class="absolute top-6 right-6">
                <button class="btn btn-ghost btn-circle text-slate-300 hover:text-rose-500 transition-colors action_delete_job">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>`;
    filteredContainer.appendChild(div);
  });
}
