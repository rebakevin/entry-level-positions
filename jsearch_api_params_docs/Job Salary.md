## Docs for params

```markdown
Query Params

job_title
*
nodejs developer
String
Job title for which to get salary estimation.

location
*
new york
String
Free-text location/area in which to get salary estimation.

location_type
(optional)
ANY
Enum
Specify the type of the location you are looking to get salary estimation for additional accuracy.

Allowed values: ANY, CITY, STATE, COUNTRY

Default: ANY

years_of_experience
(optional)
ALL
Enum
Get job estimation for a specific experience level range (years).

Allowed values: ALL, LESS_THAN_ONE, ONE_TO_THREE, FOUR_TO_SIX, SEVEN_TO_NINE, TEN_TO_FOURTEEN, ABOVE_FIFTEEN

Default: ALL

fields
(optional)
String
A comma separated list of job salary fields to include in the response (field projection). By default all fields are returned.

Example: job_title,median_salary,location
```

## Code snippet

```jsx
const url = 'https://jsearch.p.rapidapi.com/estimated-salary?job_title=nodejs%20developer&location=new%20york&location_type=ANY&years_of_experience=ALL';
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