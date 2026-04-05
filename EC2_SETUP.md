# EC2 one-time setup (Ubuntu) for Fatafat Chai

This guide prepares an Ubuntu EC2 instance to run the **Node.js API** (PM2) and optionally serve the **Vite-built** client behind Nginx or as static files. GitHub Actions deploy uses SSH to pull the repo and restart PM2.

## 1. Connect and update the server

```bash
ssh -i /path/to/key.pem ubuntu@YOUR_EC2_PUBLIC_IP
sudo apt update && sudo apt upgrade -y
```

## 2. Install Node.js 18 with nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
node -v
```

## 3. Install PM2 globally

```bash
npm install -g pm2
pm2 startup
# Run the command PM2 prints (sudo env ...)
```

## 4. Clone the repository

```bash
mkdir -p ~/fatafat-chai
cd ~/fatafat-chai
git clone https://github.com/YOUR_ORG/FATAFAT-CHAI.git .
```

(Use your real repository URL.)

## 5. Environment files

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
nano server/.env
```

Set at least:

| Variable    | Purpose                          |
|------------|-----------------------------------|
| `MONGO_URI` | MongoDB connection string        |
| `JWT_SECRET` | Strong secret for signing JWTs |
| `PORT`     | API port (default `5000`)        |

For production, point `client/.env` `VITE_API_URL` at your public API URL if the client is not served with a reverse proxy to the same host.

## 6. First deploy on the server

```bash
cd ~/fatafat-chai
bash scripts/setup.sh
bash scripts/seed.sh   # requires MongoDB reachable from EC2
npm run build --prefix client
pm2 start server/server.js --name fatafat-api
pm2 save
```

## 7. SSH key for GitHub Actions

On your **laptop**:

```bash
ssh-keygen -t ed25519 -C "github-actions-fatafat" -f ./gha-fatafat -N ""
```

On **EC2**, append the **public** key to `~/.ssh/authorized_keys` for the deploy user (e.g. `ubuntu`).

In the GitHub repository, add **Secrets** (Settings → Secrets and variables → Actions):

| Secret       | Value |
|-------------|--------|
| `EC2_HOST`  | Public DNS or IP of the instance |
| `EC2_USER`  | e.g. `ubuntu` |
| `EC2_SSH_KEY` | Contents of the **private** key file (`gha-fatafat`) |
| `EC2_PORT`  | SSH port, usually `22` |

## 8. Security group rules

In the EC2 security group, allow:

| Port  | Source        | Use |
|-------|---------------|-----|
| 22    | Your IP (or bastion) | SSH |
| 5000  | Your choice   | API (restrict in production; prefer Nginx + HTTPS) |
| 3000  | Your choice   | Dev / preview client (optional) |
| 80/443| 0.0.0.0/0     | If using Nginx + TLS for the site |

Restrict **22** to known IPs when possible.

## 9. MongoDB

Run MongoDB on the same instance (not recommended for production without hardening), use **MongoDB Atlas**, or a private subnet peered to EC2. Set `MONGO_URI` in `server/.env` accordingly.

## 10. GitHub deploy workflow

Pushes to `main` trigger **CI**. When CI succeeds, **Deploy** runs over SSH (`appleboy/ssh-action`), pulls `main`, runs `npm ci` for `server` and `client`, builds the client, and restarts `fatafat-api` with PM2.

Ensure the repo path on the server matches the workflow (`~/fatafat-chai`).
