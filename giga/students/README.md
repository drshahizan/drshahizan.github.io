# Update the student directory

The directory is static. To add or change participant links, edit `student-data.js` and publish the updated website.

Each entry uses this format:

```js
{ name: 'STUDENT NAME', institution: 'UTM', pagesUrl: 'https://username.github.io/', githubUrl: 'https://github.com/username' }
```

Keep `pagesUrl` or `githubUrl` as an empty string when a link has not been provided. The page will display “Not provided”. The directory contains only the names, institutions and portfolio links intended for display. Do not add identity-card numbers, email addresses, phone numbers, addresses or other private roster fields.
