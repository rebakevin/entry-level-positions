## Docs for params

```markdown
Query Params

job_id
*
n20AgUu1KG0BGjzoAAAAAA==
String
Job Id of the job for which to get details.

Batching of up to 20 Job Ids is supported by separating multiple Job Ids by comma (,). Note that each Job Id in a batch request is counted as a request for quota calculation.

country
(optional)
us
String
Country code of the country from which to return job posting.

Default: us

Allowed values: See https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

language
(optional)
String
Language code in which to return job postings. Leave empty to use the primary language in the specified country (country parameter).

Allowed values: See https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes

fields
(optional)
String
A comma separated list of job fields to include in the response (field projection). By default all fields are returned.

Example: employer_name,job_publisher,job_title,job_country
```

# Code snippet

```jsx
const url = 'https://jsearch.p.rapidapi.com/job-details?job_id=n20AgUu1KG0BGjzoAAAAAA%3D%3D&country=us';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'your_api_key',
		'x-rapidapi-host': 'jsearch.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
```