const fastify = require("fastify")({ logger: true });

fastify.get("/jobs", async () => {
  return [
    {
      title: "React Developer",
      company: "ABC",
      location: "Remote"
    }
  ];
});

fastify.listen({ port: 3000 }, () => {
  console.log("Server running on port 3000");
});

require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function matchJob(resume, job) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: `Compare resume and job. Give score 0-100.\nResume:${resume}\nJob:${job}`
    }]
  });

  return response.choices[0].message.content;
}
const multer = require("multer");
const pdf = require("pdf-parse");

const upload = multer();

let resumeText = ""; // store resume globally (simple approach)

fastify.post("/upload", async (req, reply) => {
  const data = await req.file();

  const buffer = await data.toBuffer();
  const pdfData = await pdf(buffer);

  resumeText = pdfData.text;

  return { message: "Resume uploaded successfully" };
});

const { ChatOpenAI } = require("@langchain/openai");

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini"
});
async function matchJobWithResume(job) {
  const prompt = `
Compare the following resume and job.

Return:
- score (0-100)
- matching skills
- explanation

Resume:
${resumeText}

Job:
${job.title} ${job.description}
`;

  const response = await llm.invoke(prompt);

  return response.content;
}
fastify.get("/jobs", async () => {
  const jobs = [
    {
      title: "React Developer",
      description: "React, JavaScript, Node.js",
      location: "Remote"
    },
    {
      title: "Python Developer",
      description: "Python, Django",
      location: "Bangalore"
    }
  ];

  const updatedJobs = [];

  for (let job of jobs) {
    const match = await matchJobWithResume(job);

    updatedJobs.push({
      ...job,
      match
    });
  }

  return updatedJobs;
});
fastify.post("/ai", async (req, reply) => {
  const { message } = req.body;

  const result = await handleAI(message);

  return result;
});
async function handleAI(input) {
  const response = await llm.invoke(`
User message: ${input}

Decide action:
- update_filters
- help
- search_jobs

Return JSON:
{
  "action":"update_filters",
  "filters": {},
  "message": ""
}
`);

  return JSON.parse(response.content);
}

  return JSON.parse(response.content);


  // Help
  if (input.includes("where") || input.includes("how")) {
    return {
      action: "help",
      message: "Matching is based on your resume and job skills."
    };
  }

  return {
    action: "search_jobs"
  };

