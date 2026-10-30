# Deployment checklist

- [ ] MongoDB Atlas database created and connection tested.
- [ ] `MONGODB_URI` configured in Vercel (Production and Preview as needed).
- [ ] `JWT_SECRET` configured with a long random value.
- [ ] `NEXT_PUBLIC_APP_URL` configured to the Vercel domain.
- [ ] No `.env.local` committed.
- [ ] Vercel build succeeds.
- [ ] Seed run once against intended database.
- [ ] Farmer registration/login and listing creation tested on live URL.
- [ ] Buyer registration/login and order placement tested on live URL.
- [ ] Stock conflict and order status transitions tested.
- [ ] Demo video, actual screenshots, API test evidence and team details added.
