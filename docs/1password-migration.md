# 1Password migration

This repo's plaintext secrets are moving into 1Password. Follow the runbook at `~/dev/scripts/op-migrate/README.md`, using the spec in `docs/op-migration.json`. The spec is a draft until step 2 confirms it.

- 1Password account: `totavi.1password.com`
- Vault: `Totavi-Dev`
- Documents: `.google-client-secret.json` as `totavi-google-oauth-client`, `.google-token.json` as `notafintech-google-oauth`

## Notes for this repo

- This is the notafintech site (notafintech.co). It's a Totavi site, so it uses the Totavi account and `Totavi-Dev`.
- `.google-client-secret.json` is the same OAuth client ghost uses, stored once as `totavi-google-oauth-client`. Whichever repo imports first creates it, and the other one's `import` skips it.
- `.google-token.json` refreshes itself, so `verify` ignores `token` and `expiry`.
- `.seo-creds/google-api.json.notafintech-backup` holds config only (property IDs and a path), not secrets. Leave it alone.
- See the changelog note about sharing `~/.config/claude-seo/` with ayso-website. Don't change that flow; just report it.

## Done when

- `python3 ~/dev/scripts/op-migrate/op-migrate.py verify docs/op-migration.json` prints MATCH for everything.
- The repo's scripts still work with the secrets coming from 1Password.
- You have reported back to the user, and the user has decided about deleting the plaintext files and committing. Update `~/dev/scripts/op-migrate/STATUS.md` when you're done.

## Result (2026-10-25)

Both documents are in `Totavi-Dev` and `verify` prints MATCH. Nothing in this repo reads the files, so there are no templates or npm scripts. If the files are missing, recreate them (mode 600) with:

```bash
OP_ACCOUNT=totavi.1password.com python3 ~/dev/scripts/op-migrate/op-migrate.py fetch docs/op-migration.json
```
