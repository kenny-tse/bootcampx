const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const maxLimit = process.argv[3]

const values = [`%${cohortName}%`, maxLimit];
const queryString = `
  SELECT DISTINCT teachers.name AS teacher, 
  cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON assistance_requests.teacher_id = teachers.id
  JOIN students ON students.id = assistance_requests.student_id
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  ORDER BY teachers.name
  LIMIT $2;
  `;

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(object => {
      console.log(`${object.cohort}: ${object.teacher}`);
    })
  })
  .catch(err => console.error('query error', err.stack));