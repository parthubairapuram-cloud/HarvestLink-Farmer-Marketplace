# HarvestLink — Farmer Marketplace (HACK-P309)

**Grow local. Buy fresh. Keep value with farmers.**

HarvestLink is a full-stack marketplace prototype that connects farmers directly with households, retailers, restaurants and wholesalers. Farmers publish produce and availability; buyers discover, compare and request orders; farmers manage order status and stock.

## Problem addressed
Farmers can struggle to reach buyers and communicate availability, quantity and prices. HarvestLink provides transparent listings and a simple order lifecycle without requiring a complex logistics network in the first version.

## Implemented features
- Farmer and buyer account registration/login with hashed passwords and signed HTTP-only session cookies.
- Farmer product listings with category, unit, stock, price, location, availability date and pickup/delivery options.
- Marketplace browsing, search, category filtering and price sorting.
- Buyer order requests with quantity and fulfilment validation.
- Stock reduction when an order is requested; stock restoration if the farmer cancels.
- Farmer dashboard for inventory and incoming orders.
- Order lifecycle: requested → accepted → ready → completed; cancellation allowed from requested/accepted.
- Buyer order history.\n- Admin moderation workspace to hide or restore duplicate/inappropriate listings.
- Prototype uses no online payments and collects no card details.

## Technology
- Next.js 14 App Router + React + TypeScript
- Next.js Route Handlers (REST API)
- MongoDB Atlas + Mongoose
- Zod validation, bcryptjs password hashing, jose JWT sessions
- Tailwind CSS + Lucide icons
- Vercel deployment

## Architecture
```text
Browser (Next.js UI)
       |
       v
Next.js Route Handlers (/api/*)  <-- HTTP-only signed session cookie
       |
       v
Mongoose models + business validation
       |
       v
MongoDB Atlas (Users, Products, Orders)
```

## Run locally
1. Install Node.js 18.17+.
2. Clone this repository and install dependencies:
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd harvestlink-marketplace
   npm install
   ```
3. Create a MongoDB Atlas database and allow network access for your development IP. Copy the connection string.
4. Copy `.env.example` to `.env.local`, then set:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=use-a-random-secret-at-least-32-characters-long
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
5. Seed five farmer profiles and fifteen example listings:
   ```bash
   npm run seed
   ```
6. Start the application:
   ```bash
   npm run dev
   ```
7. Open http://localhost:3000.

### Demo account
After seeding, farmer login:
- Email: `ananya@harvestlink.demo`
- Password: `Harvest123!`

Register a buyer account from the UI to test placing orders. Change the demo password before any public or real-world use.

## Vercel deployment
1. Push the project to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the Next.js framework preset.
3. In **Project → Settings → Environment Variables**, add:
   - `MONGODB_URI` — MongoDB Atlas connection string
   - `JWT_SECRET` — a long random secret (32+ characters)
   - `NEXT_PUBLIC_APP_URL` — your deployed Vercel URL, e.g. `https://your-project.vercel.app`
4. Deploy. The app uses Next.js route handlers, so frontend and API deploy together.
5. Run the seed script once from your local machine using the production `MONGODB_URI`:
   ```bash
   npm run seed
   ```
6. Open the deployed URL and test registration, login, listings and the full order lifecycle.

**MongoDB Atlas note:** Configure Network Access appropriately for Vercel deployment. For a hackathon prototype, Atlas' `0.0.0.0/0` allowlist may be used if your team accepts the exposure trade-off; use strong database credentials and least-privilege access. Never commit `.env.local`.

## REST API
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register farmer/buyer |
| POST | `/api/auth/login` | Public | Login |
| POST | `/api/auth/logout` | Session | Logout |
| GET | `/api/products` | Public | Browse active inventory |
| POST | `/api/products` | Farmer | Publish produce |
| PATCH | `/api/products/:id` | Admin | Hide/restore a listing |\n| POST | `/api/orders` | Buyer | Request order and reserve stock |
| PATCH | `/api/orders/:id` | Owning farmer | Advance order status / cancel |

### Example order request
```json
{
  "productId": "PRODUCT_MONGODB_ID",
  "quantity": 4,
  "fulfillment": "pickup",
  "note": "Please keep the tomatoes ready by 5 PM."
}
```
The server validates role, stock and fulfilment option, then records the order and decreases available stock.

## Database collections
- **users**: name, email, password hash, role, contact/location and farm profile.
- **products**: farmer reference, product details, unit, quantity, price, location, availability and fulfilment options.
- **orders**: buyer/farmer references, item snapshot, total, fulfilment, note and status.

## Testing checklist
- [ ] Register a farmer and log in.\n- [ ] Log in as admin and hide/restore a listing.
- [ ] Publish a product and confirm it appears in marketplace.
- [ ] Register/log in as buyer and request a quantity within stock.
- [ ] Attempt to request more than available stock (expect HTTP 409).
- [ ] Confirm stock decreases after order.
- [ ] Farmer accepts → marks ready → completes order.
- [ ] Cancel an eligible order and confirm stock is restored.
- [ ] Attempt farmer-only and buyer-only actions with the wrong role (expect HTTP 403).

## Limitations and future scope
- No real payment gateway or card collection; use cash-on-pickup/off-platform settlement for prototype demonstrations.
- Delivery is a farmer-declared option only; no logistics partner integration.
- No live chat, multilingual UI, price-trend analytics or traceability yet.
- For production, add email/phone verification, rate limiting, audit logs, stronger inventory transaction handling, admin moderation UI and automated tests.

## Team details
Update this section with the four actual team members' full names, roll numbers, branch and section, plus each person's real contribution before submission. Do not invent team details.

## Screenshots and evidence
Add genuine screenshots of your running application under `screenshots/` and API test evidence under `tests/` before final submission. The hackathon guide asks for actual application screenshots and test results; do not present mock screenshots as evidence.
