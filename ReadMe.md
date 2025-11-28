# VeniqaManagement - Comprehensive Technical Architecture & Developer Guide

## 1. Executive Summary & Architectural Vision

VeniqaManagement Is A Full-Stack Web Store Solution Engineered To Demonstrate A Strictly Decoupled Architecture Between A Reactive Client-Side Application And An Event-Driven Server-Side API. The System Is Designed To Handle Complex Workflows, Including Real-Time Cart Aggregation, International Logistics Calculations, And Multi-Provider Payment Orchestration, While Maintaining A Developer-Friendly Setup via Local SQLite Persistence.

The Core Design Philosophy Prioritizes Separation Of Concerns. The Frontend Acts As A Pure Consumer Of Data, While The Backend Encapsulates All Business Rules, Pricing Logic, And Data Integrity Checks.

## 2. Runtime Environments & Execution Protocols

The Project Is Distinctly Divided Into Two Runtimes, Managed By Independent Configuration Files.

### 2.1 Server-Side Runtime
* **Configuration Source**: `Backend/package.json`
* **Entry Point**: `app.js`
* **Port**: Defaults To 3001
* **Execution Commands**:
    * `npm install`: Hydrates The Directory With Dependencies Such As `express`, `sequelize`, `sqlite3`, `bcryptjs`, And `helmet`.
    * `npm start`: Triggers The `node app.js` Command To Initialize The HTTP Server And Sync The Database Schema.

### 2.2 Client-Side Runtime
* **Configuration Source**: `Frontend/package.json`
* **Entry Point**: `src/main.ts`
* **Port**: Defaults To 5173
* **Execution Commands**:
    * `npm install`: Hydrates The Directory With Dependencies Such As `vue`, `vuex`, `axios`, And `tailwindcss`.
    * `npm run dev`: Launches The Vite Development Server With Hot Module Replacement.

## 3. Backend Architecture & Service Layer Design

The Backend Is Built On Node.js And Express, Utilizing A Layered Architecture To Separate HTTP Handling From Business Logic.

### 3.1 Core Application Configuration
The `app.js` File Serves As The Central Bootstrap For The Application.
* **Security Middleware**: Integrates `helmet` To Secure HTTP Headers And Prevent Leakage Of Sensitive Server Information.
* **CORS Policy**: The `cors` Middleware Is Configured To Accept Requests From True Origins And Allows Credentials, Enabling The `x-user-id` Custom Header To Pass Through.
* **Route Aggregation**: The App Mounts Distinct Routers For `/auth`, `/user`, `/catalog`, `/shopping`, `/orders`, And `/ui`.

### 3.2 Authentication Service
Security Is Managed Without Traditional Sessions, Using A Stateless Token Approach.
* **Password Security**: Utilizes `bcryptjs` To Hash Passwords With A Salt Round Of 10 Before Persistence.
* **Token Generation**: Uses `uuid` Version 4 To Generate Unique Strings For Email Confirmation Tokens And Password Reset Tokens.
* **Flow**: When A User Signs Up, A Confirmation Token Is Generated And Logged To The Console. The Account Remains Unverified Until The Token Is Validated via The `/confirmEmail` Endpoint.

### 3.3 Shopping Cart Service
This Service Handles The Complexity Of Dynamic Pricing And Weight Aggregation.
* **Aggregation Logic**: The `calculateCart` Function Iterates Through Item IDs Stored In The User's Cart.
* **Real-Time Validation**: It Fetches The Latest `price` And `weight` From The `Product` Table During Every Cart Read Operation. This Prevents Stale Data Or Client-Side Manipulation.
* **Data Structure**: The Cart Is Persisted As A JSON Object Containing `items` Array, `totalWeight` Object, And `subTotalPrice` Object.

### 3.4 Order & Logistics Service
The Most Complex Service In The System, Handling The Transition From Cart To Finalized Order.
* **Tariff Calculation**: The Logic Inspects The `tariff` Field Of Each Product. If Present, It Queries The `Tariff` Table For The Destination Country's Rate And Calculates The Duty Cost.
* **Shipping Logic**:
    * Utilizes A Hardcoded Data Source In `data/shippingRates.js`.
    * **Specific Rules**: Countries Like Bangladesh And Nepal Have Tiered Weight-Based Pricing.
    * **Fallback**: Global Destinations Default To A Flat Fee.
* **Validation**: The `isCheckoutValid` Function Compares The Checkout Snapshot Against Current Prices To Ensure No Discrepancy Greater Than 0.01 Exists Before Payment.

## 4. Database Schema & Data Modeling

Persistence Is Managed By Sequelize With A SQLite Backend. The Schema Makes Heavy Use Of JSON Columns To Store Flexible Data Structures.

### 4.1 User Domain
* **User Model**:
    * **Fields**: `email`, `password`, `name`, `referralToken`.
    * **JSON Columns**:
        * `addresses`: Stores Detailed Address Structures.
        * `cart`: Stores The Current Session State.

### 4.2 Product Domain
* **Product Model**:
    * **Fields**: `store`, `brand`, `name`, `itemUrl`, `storeSku`, `category`, `tariff`, `active`.
    * **JSON Columns**:
        * `price`: Stores Amount And Currency.
        * `weight`: Stores Quantity And Unit.
        * `thumbnailUrls`: Stores Image Arrays.
        * `detailedImageUrls`: Stores Detailed Image Arrays.
        * `customizationOptions`: Defines Product Variants.

### 4.3 Transaction Domain
* **Checkout Model**: Represents A Temporary Intent To Purchase.
* **Order Model**: Represents A Finalized Transaction.
    * **Fields**: `overallStatus`, `userEmail`.
    * **JSON Columns**: `cart`, `mailingAddress`, `paymentInfo`, `auditLog`.

## 5. Frontend Architecture & Client-Side Logic

The Frontend Is A Single Page Application Built With Vue 3, Utilizing The Composition API For Reusability.

### 5.1 Build Pipeline & Proxy Configuration
The `vite.config.ts` File Defines The Build Process.
* **Proxying**: To Bypass CORS During Development, Requests Are Proxied To The Backend Server.
* **Alias Resolution**: The `@` Symbol Is Mapped To The `src` Directory.

### 5.2 Network Layer & Event Hub
The Application Implements A Global Event Bus To Handle Network States.
* **Event Hub**: `utils/eventHub.ts` Exports A Simple Pub/Sub Mechanism.
* **Axios Interceptors**: `plugins/axios.ts`
    * **Request Interceptor**: Emits `beforeRequest` And Injects The `x-user-id` Header From Local Storage.
    * **Response Interceptor**: Emits `afterResponse` Or `responseError` To Trigger UI Feedback.

### 5.3 State Management
The Store Is Modularized To Handle Specific Domains.
* **Modules**: `auth`, `cart`, `products`, `user`.
* **Persistence**: The `vuex-persist` Plugin Monitors The `auth` And `cart` Modules And Synchronizes Them With `window.localStorage`.

## 6. API Endpoint Documentation

The Backend Exposes The Following RESTful Routes.

### 6.1 Authentication
* `POST /signup`: Registers A New User.
* `POST /login`: Authenticates And Returns User Details.
* `GET /confirmEmail/:token`: Validates Account.
* `GET /isSessionActive`: Checks Token Validity.

### 6.2 Catalog
* `POST /search`: Retrieves Products Based On Search Terms And Category Filters.
* `GET /getProductDetails`: Fetches Full Metadata For A Single Product ID.

### 6.3 Shopping
* `POST /addToCart`: Adds Item And Recalculates Totals.
* `PUT /updateCart`: Modifies Item Quantities.
* `GET /getCart`: Retrieves The Current Computed Cart.
* `DELETE /deleteFromCart`: Removes Items.

### 6.4 User
* `POST /address`: Saves A New Shipping Address.
* `GET /address`: Lists All Saved Addresses.
* `POST /orderList`: Retrieves User's Order History With Pagination.

### 6.5 Orders
* `POST /createCheckout`: Converts A Cart To A Checkout Intent.
* `GET /isCheckoutValid`: Validates Pricing Integrity.
* `POST /completeCheckout`: Finalizes The Order And Clears The Cart.
* `POST /completeCheckoutUsingKhalti`: Specific Endpoint For Nepal-Based Payments.

## 7. Developer Setup Guide

Follow These Instructions To Initialize The Environment Locally.

1.  **Backend Initialization**:
    * Navigate To `Backend/`.
    * Execute `npm install`.
    * Execute `npm start`.
    * Verify Server Is Running On Port 3001.

2.  **Frontend Initialization**:
    * Navigate To `Frontend/`.
    * Execute `npm install`.
    * Execute `npm run dev`.
    * Open Browser To The Provided Localhost URL.

3.  **Database Inspection**:
    * The System Automatically Creates `Backend/shopping.sqlite`.
    * Use A SQLite Viewer To Inspect Tables And Verify Schema Synchronization.

### 7.3 Production Build & Optimization
For Production Deployment, The Frontend Must Be Compiled From Vue/TypeScript Into Static HTML, CSS, And JavaScript Assets.

1.  **Type Checking & Compilation**:
    * Command: `npm run build`
    * **Process**: This Triggers `vue-tsc --build` To Perform A Strict Type Check Across All Files. If Successful, It Runs `vite build`.
    * **Output**: Generates A `dist/` Directory Containing Optimized Assets Ready For Serving.

2.  **Local Production Preview**:
    * Command: `npm run preview`
    * **Function**: Boots Up A Local Static Server To Preview The Contents Of The `dist/` Folder, Ensuring The Build Works As Expected Before Actual Deployment.

### 7.4 Database Management & Reset
Since The Backend Uses SQLite, Database Management Is File-Based.
* **Resetting Data**: To Completely Wipe The Database And Start Fresh, Simply Delete The `Backend/shopping.sqlite` File.
* **Regeneration**: Upon The Next `npm start`, The Sequelize `sync` Method Will Detect The Missing File And Recreate The Tables Automatically.

## 8. Quality Assurance & Code Standards

The Frontend Enforces Code Quality Through Automated Tooling Configured In The Package File.

### 8.1 Static Analysis
* **Command**: `npm run lint`
* **Configuration**: Governed By `eslint.config.ts`.
* **Rules**:
    * Extends `@vue/eslint-config-typescript` And `plugin:vue/flat/essential`.
    * **Custom Override**: The Rule `@typescript-eslint/no-explicit-any` Is Turned Off, Allowing The Use Of Any Types For Flexibility During Rapid Development.

### 8.2 Type Integrity
* **Command**: `npm run type-check`
* **Tool**: Uses `vue-tsc`, A Wrapper Around The TypeScript Compiler That Supports Vue Single File Components.

## 9. Deployment Strategy & Architecture

For A Live Production Environment, The Following Architecture Is Recommended Based On The Project Structure:

### 9.1 Backend Deployment
* **Process Manager**: Use A Tool Like PM2 To Keep The Application Process Alive And Handle Restarts.
* **Environment**: Ensure Node.js Version 20+ Is Installed.
* **Database**: For High-Traffic Production, Consider Switching The Sequelize Dialect From SQLite To Postgres Or MySQL In The Config File To Handle Concurrent Writes Better.

### 9.2 Frontend Deployment
* **Static Serving**: The Contents Of `Frontend/dist` Should Be Served By A High-Performance Web Server Like Nginx Or Apache.
* **Reverse Proxy Configuration**:
    * Serve The Root From The Dist Folder.
    * Proxy Requests Matching API Routes To The Backend Service. This Replaces The Development Proxy Configured In Vite.

## 10. Common Troubleshooting

### 10.1 CORS Errors
* **Symptom**: API Requests Fail With Cross-Origin Request Blocked.
* **Cause**: The Frontend Is Not Running On The Expected Port, Or The Backend CORS Configuration Is Too Restrictive.
* **Fix**: Ensure The Backend Middleware Allows The Specific Origin Of Your Frontend. Currently, It Is Set To Reflect Request Origin, Which Is Permissive For Development.

### 10.2 Database Locking
* **Symptom**: SQLITE_BUSY Database Is Locked.
* **Cause**: SQLite Allows Only One Writer At A Time. High Concurrency Or An Open DB Viewer Can Lock The File.
* **Fix**: Close Any External SQLite Viewers. For Production, Migrate To A Client-Server RDBMS.

## 11. Project Directory Map

A High-Level Overview Of The Critical File Structure For Developers Navigating The Codebase.

```text
VeniqaShopping/
├── Backend/
│   ├── config/             # Configuration
│   ├── controllers/        # Request Handlers
│   ├── data/               # Static Data
│   ├── database/           # Sequelize Models & Connection
│   ├── middleware/         # Auth Verification
│   ├── routes/             # API Route Definitions
│   ├── services/           # Business Logic
│   ├── app.js              # Entry Point
│   └── package.json        # Backend Dependencies
│
└── Frontend/
    ├── public/             # Static Assets
    ├── src/
    │   ├── assets/         # CSS
    │   ├── components/     # Reusable UI
    │   ├── constants/      # API URL Mappings
    │   ├── plugins/        # Axios Configuration
    │   ├── router/         # Vue Router Definitions
    │   ├── store/          # Vuex State Modules
    │   ├── utils/          # Helpers
    │   ├── views/          # Page Components
    │   ├── App.vue         # Root Component
    │   └── main.ts         # Frontend Entry Point
    ├── vite.config.ts      # Build & Proxy Config
    └── package.json        # Frontend Dependencies
```
