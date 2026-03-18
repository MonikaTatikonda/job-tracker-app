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
