import { useEffect, useState } from "react";
<h2>Best Matches</h2>

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
      <input type="file" onChange={handleUpload} />
  }, []);
  <div style={{
  position: "fixed",
  bottom: "20px",
  right: "20px"
}}>
  Chat
</div>


  return (
    <div>
      <h1>Job Feed</h1>
      {jobs.map((job, index) => (
        <div key={index}>
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>
        </div>
      ))}
    </div>
  );
  <button onClick={() => window.open("https://example.com")}>
  Apply
</button>


}

export default App;

const [search, setSearch] = useState("");
<input onChange={(e) => setSearch(e.target.value)} />
jobs.filter(job => job.title.includes(search))

const handleUpload = async (e) => {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData
  });

  alert("Resume uploaded!");
};
{jobs.map((job, index) => (
  <div key={index}>
    <h2>{job.title}</h2>
    <p>{job.location}</p>

    <p>{job.match}</p>
  </div>
))}
const getColor = (score) => {
  if (score > 70) return "green";
  if (score > 40) return "yellow";
  return "gray";
};
const bestJobs = jobs.slice(0, 3);
const [filters, setFilters] = useState({});
const [input, setInput] = useState("");
return (
  <>
  <input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Ask jobs..."
/>

<button onClick={sendMessage}>Send</button>
</>
);
const sendMessage = async () => {
  const res = await fetch("http://localhost:3000/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });

  const data = await res.json();

  if (data.action === "update_filters") {
    setFilters(data.filters);
  }

  if (data.action === "help") {
    alert(data.message);
  }
};
const filteredJobs = jobs.filter((job) => {
  if (filters.role && !job.title.includes(filters.role)) return false;
  if (filters.workMode && job.location !== filters.workMode) return false;
  return true;
});
<button onClick={() => handleApply(job)}>
  Apply
</button>
const [selectedJob, setSelectedJob] = useState(null);

const handleApply = (job) => {
  window.open("https://example.com", "_blank"); // job link
  setSelectedJob(job);

  setTimeout(() => {
    const answer = window.confirm(
      `Did you apply to ${job.title}?`
    );

    if (answer) {
      saveApplication(job, "Applied");
    }
  }, 3000);
};
const saveApplication = (job, status) => {
  const existing = JSON.parse(localStorage.getItem("applications")) || [];

  const newApp = {
    ...job,
    status,
    date: new Date().toLocaleString()
  };

  localStorage.setItem("applications", JSON.stringify([...existing, newApp]));
};
<h2>My Applications</h2>
const apps = JSON.parse(localStorage.getItem("applications")) || [];
{apps.map((app, index) => (
  <div key={index}>
    <h3>{app.title}</h3>
    <p>Status: {app.status}</p>
    <p>Date: {app.date}</p>
  </div>
))}
<select onChange={(e) => updateStatus(index, e.target.value)}>
  <option>Applied</option>
  <option>Interview</option>
  <option>Offer</option>
  <option>Rejected</option>
</select>
const updateStatus = (index, newStatus) => {
  const apps = JSON.parse(localStorage.getItem("applications")) || [];

  apps[index].status = newStatus;

  localStorage.setItem("applications", JSON.stringify(apps));
};
<p>Applied → Interview → Offer</p>
