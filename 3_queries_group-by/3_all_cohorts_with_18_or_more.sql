SELECT cohorts.name as cohort_name, COUNT(students.id) as total_in_cohort
FROM cohorts
JOIN students ON cohorts.id = students.cohort_id
GROUP BY cohorts.name
HAVING COUNT(students.id) >= 18
ORDER BY COUNT(students.id);

