# Entry Level Positions

[Watch the Demo Video](https://youtu.be/_hOUKFYqvNs)

## Functionalities
- **Searching for jobs**: Easily find entry-level software engineering positions.
- **Saving/bookmarking jobs**: Keep track of the jobs you liked.
- **Direct Application**: Direct links to take you to the official application form.
- **Embedded demo video**: Watch the guidance video directly on the home page.
- **Responsive & Accessible**: Fully responsive design with dark/light theme support.
- **Usage Tracking**: Tracks API requests to notify you before hitting rate limits.

## How to run it locally
1. **Clone the repo**:
   ```bash
   git clone https://github.com/rebakevin/entry-level-positions.git
   ```
2. **Open the file**:
   Simply open `index.html` in your browser.

## Credits
Powered by the [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch).

## Steps to deploy with Nginx
*Assuming you already have the Nginx load balancer server set up and both web-01 and web-02 servers up and running.*

1. **Clone the repo**:
   On your web-01 and web-02 servers, clone the repository into the `/var/www/html` folder.
   ```bash
   cd /var/www/html
   git clone https://github.com/rebakevin/entry-level-positions.git .
   ```

2. **Update Nginx Configuration**:
   Edit the default site configuration in `sites-enabled` to point the root to your repo folder.
   ```bash
   sudo vim /etc/nginx/sites-enabled/default
   ```

3. **Update Sites Available**:
   Edit the configuration in `sites-available` as well.
   ```bash
   sudo vim /etc/nginx/sites-available/default
   ```

4. **Restart Nginx**:
   Restart the server to apply changes.
   ```bash
   sudo service nginx restart
   ```

## Challenges & Solutions
### Deployment
Configuring the Nginx server to correctly serve a Single Page Application (SPA) presented initial routing challenges. I overcame this by ensuring the root paths were correctly pointed in the Nginx configuration and debugging file visibility issues (like ensuring `config.js` was tracked) to guarantee a smooth deployment across multiple servers.

### UI Design
Creating a "premium" feel while displaying dense information was a significant design challenge. I focused on using generous whitespace, a refined color palette, and modern typography to ensure the interface didn't feel compacted. Implementing a seamless dark/light mode switch further enhanced the user experience and accessibility.
