## Docs for params

```markdown
Query Params

company
*
Amazon
String
The company name for which to get salary information (e.g. Amazon).

job_title
*
software developer
String
Job title for which to get salary estimation.

location
(optional)
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