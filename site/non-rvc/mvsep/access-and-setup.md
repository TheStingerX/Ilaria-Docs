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
- **Slow upload/download?** MVSep provides regional mirrors - if the main site is slow for file transfers, switch to the mirror option.

## 3. Prepaid credits & Full API (Optional)

If you process long files (up to 100 minutes / 1 GB), want **WAV 32-bit float / FLAC 24-bit**, or want to avoid peak-hour queues:
- Standard models cost **1 credit per minute** of audio; heavy ensembles use multipliers (`2×`–`6×`).
- **API access**: logged-in users can generate an API token in their account to automate batch separations from Python scripts via `https://mvsep.com/api`.

## Credit pack prices

MVSEP offers up to 50 free separations per day without a card. Premium uses prepaid credits.

| Price (USD) | Credits | Approx. songs (4 min) | USD per minute |
| ---: | ---: | ---: | ---: |
| 3 | 60 | ≈ 15 | 0.05 |
| 5 | 200 | ≈ 50 | 0.025 |
| 10 | 600 | ≈ 150 | 0.0167 |
| 30 | 2,000 | ≈ 500 | 0.015 |
| 50 | 4,000 | ≈ 1,000 | 0.0125 |
| 100 | 8,500 | ≈ 2,125 | 0.0118 |
| 200 | 18,000 | ≈ 4,500 | 0.0111 |
| 500 | 50,000 | ≈ 12,500 | 0.01 |
| 1,000 | 110,000 | ≈ 27,500 | 0.0091 |

Estimates assume one separation per song with a standard model at 1 credit per minute. A 4-minute song costs 4 credits. An Ensemble model at 2× uses 8 credits for the same track, so a pack of 60 covers about 7 full songs instead of 15. Extra options and additional passes can increase usage.

[MVSEP plans](https://sg.mvsep.com/en/plans) · [How credits are calculated](https://mvsep.com/en/credits)
