---
label: "Access, Account & API"
icon: ":globe_with_meridians:"
order: 98
permalink: /non-rvc/mvsep/access-and-setup/
---
# Using MVSep: Access, Account & Setup

Because MVSep runs in the cloud, there is **nothing to install**. However, configuring your account and output settings properly makes a big difference in quality and convenience.

## 1. Create a free account (Recommended)

1. Go to [mvsep.com](https://mvsep.com/) and register a free account.
2. **Why register?**
   - **Lossless audio**: unregistered users only get lossy **MP3** files. Registered accounts unlock **WAV 16-bit** and **FLAC 16-bit** output.
   - **No CAPTCHA** and **faster queue priority**.
   - **124-band Polar & BS-Roformer models** are accessible to free users (BS variants allow up to 5 separations/day per model).

## 2. Useful settings on MVSep

- **Output format**: always choose **WAV** (or **FLAC**) before starting separation if you plan to train an RVC model or chain multiple cleanup steps.
- **Post-processing / chaining**: log in and go to **Advanced settings → Home Screen**, then enable **"Show post-processing algorithm"** if you want to chain a cleanup model right after separation.
- **Slow upload/download?** MVSep provides regional mirrors — if the main site is slow for file transfers, switch to the mirror option.

## 3. Prepaid credits & Full API (Optional)

If you process long files (up to 100 minutes / 1 GB), want **WAV 32-bit float / FLAC 24-bit**, or want to avoid peak-hour queues:
- **Credit packs** never expire (starting around \$3 for 60 credits, \$5 for 200 credits, \$10 for 600 credits).
- Standard models cost **1 credit per minute** of audio; heavy ensembles use multipliers (`2×`–`6×`).
- **API access**: logged-in users can generate an API token in their account to automate batch separations from Python scripts via `https://mvsep.com/api`.
