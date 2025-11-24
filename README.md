# Entry Level Positions

## Functionalities
All features are demonstrated in this short demo.
[Watch the Demo Video](https://youtu.be/_hOUKFYqvNs)
- Searching for jobs
- Saving/bookmarking jobs
- Direct Application
- Embedded demo video
- Responsive & Accessible
- API usage rate tracking

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
Configuring the Nginx server to correctly serve a Single Page Application (SPA) was challenging at first. I overcame this by ensuring the root paths were correctly pointed in the Nginx configuration and debugging file visibility issues (like ensuring `config.js` was tracked) to ensure a smooth deployment across multiple servers.

### UI Design
Coming up with a minimalistic design that delivers real value without unnecessary distractions is always tricky. I had to take a deep breath and take my time to come up with something pretty creative. 
