import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

// The Matrix Variables
const roles = ['Software Engineer', 'Data Scientist', 'AI Engineer', 'Full Stack Developer', 'React Developer', 'Python Developer', 'Cloud Architect'];
const companies = ['Google', 'TCS', 'Infosys', 'Wipro', 'Amazon', 'Microsoft', 'Top Startups'];

async function seedDatabase() {
  console.log("Starting bulk pSEO generation...");
  let count = 0;

  for (const role of roles) {
    for (const company of companies) {
      const slug = `${role.toLowerCase().replace(/ /g, '-')}-at-${company.toLowerCase()}`;
      const title = `Free AI ATS Resume Scanner for ${role}s at ${company}`;
      const description = `Beat the ${company} Applicant Tracking System. Optimize your resume specifically for ${role} roles and get your application seen by real humans.`;

      try {
        await sql`
          INSERT INTO pseo_pages (slug, title, description) 
          VALUES (${slug}, ${title}, ${description})
          ON CONFLICT (slug) DO NOTHING;
        `;
        count++;
        console.log(`Created: /scanner/${slug}`);
      } catch (err) {
        console.error(`Failed on ${slug}:`, err.message);
      }
    }
  }
  
  console.log(`Successfully generated ${count} new pSEO landing pages!`);
}

seedDatabase();