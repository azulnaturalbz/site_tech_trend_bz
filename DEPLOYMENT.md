# Deployment

## Production

- Custom domain: `https://techtrend.silvatech.bz/`
- Amplify branch URL: `https://main.d3sx0a6fn647zu.amplifyapp.com/`
- Amplify app: `site-tech-trend-bz`
- Amplify app ID: `d3sx0a6fn647zu`
- AWS account: `944327601374`
- Region: `us-east-1`
- GitHub repo: `https://github.com/azulnaturalbz/site_tech_trend_bz`

## DNS

- Hosted zone: `silvatech.bz.`
- Hosted zone ID: `Z009690338YVFSSHMVS2A`
- Site record: `techtrend.silvatech.bz CNAME d3bt07b9r8bzeg.cloudfront.net`
- Amplify domain status verified as `AVAILABLE` on `2026-07-06`.

## Manual Deploy

```bash
npm run build
python3 ~/.codex/skills/client-site-builder/scripts/package_static_site.py dist /tmp/site_tech_trend_bz_amplify.zip
aws --profile silvatech --region us-east-1 amplify create-deployment --app-id d3sx0a6fn647zu --branch-name main
```

Upload the zip to the signed URL returned by Amplify, then run `start-deployment` with the returned job ID.
