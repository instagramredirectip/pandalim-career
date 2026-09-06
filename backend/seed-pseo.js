import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

// The Matrix Variables
const roles = [
  'Software Engineer',
  'Data Scientist',
  'AI Engineer',
  'Full Stack Developer',
  'React Developer',
  'Python Developer',
  'Cloud Architect',
  'Product Manager',
  'Front End Developer',
  'Marketing Manager'
];

const companies = [
  'Google',
  'Amazon',
  'Microsoft',
  'Meta',
  'Netflix',
  'TCS',
  'Infosys',
  'Wipro',
  'Top Startups'
];

const specialPages = [
  {
    slug: 'tcs-freshers',
    title: 'TCS Freshers Resume ATS Optimization',
    description: 'Optimize your entry-level resume for the TCS NQT and iON ATS screening. Highlight academic projects, core Java/C++/Python skills, and problem-solving certifications.'
  },
  {
    slug: 'infosys-roles',
    title: 'Infosys Specialist Programmer & SE Resume ATS Optimization',
    description: 'Tailor your resume for Infosys InfyTQ, HackWithInfy, and Specialist Programmer hiring ATS filters. Maximize keyword score for high-paying enterprise engineering bands.'
  }
];

async function seedDatabase() {
  console.log("Starting bulk pSEO generation...");
  let count = 0;

  // 1. Role + Company Combinations
  for (const role of roles) {
    for (const company of companies) {
      const slug = `${role.toLowerCase().replace(/ /g, '-')}-at-${company.toLowerCase().replace(/ /g, '-')}`;
      const title = `Free AI ATS Resume Scanner for ${role}s at ${company}`;
      const description = `Beat the ${company} Applicant Tracking System. Optimize your resume specifically for ${role} roles and get your application seen by real humans.`;

      try {
        await sql`
          INSERT INTO pseo_pages (slug, title, description) 
          VALUES (${slug}, ${title}, ${description})
          ON CONFLICT (slug) DO NOTHING;
        `;
        count++;
      } catch (err) {
        console.error(`Failed on ${slug}:`, err.message);
      }
    }
  }

  // 2. Standalone Roles
  for (const role of roles) {
    const slug = role.toLowerCase().replace(/ /g, '-');
    const title = `Free AI ATS Resume Scanner for ${role}s`;
    const description = `Optimize your ${role} resume for modern ATS algorithms. Scan for missing critical keywords, calculate match score, and beat recruiter screening filters for free.`;

    try {
      await sql`
        INSERT INTO pseo_pages (slug, title, description) 
        VALUES (${slug}, ${title}, ${description})
        ON CONFLICT (slug) DO NOTHING;
      `;
      count++;
    } catch (err) {
      console.error(`Failed on ${slug}:`, err.message);
    }
  }

  // 3. Special Niches
  for (const item of specialPages) {
    try {
      await sql`
        INSERT INTO pseo_pages (slug, title, description) 
        VALUES (${item.slug}, ${item.title}, ${item.description})
        ON CONFLICT (slug) DO NOTHING;
      `;
      count++;
    } catch (err) {
      console.error(`Failed on ${item.slug}:`, err.message);
    }
  }
  
  console.log(`Successfully generated ${count} pSEO landing pages in database!`);
}

seedDatabase();