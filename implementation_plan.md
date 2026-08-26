# Maya Exports — Complete Backend Implementation Plan

## Background

The frontend is a React/Vite app with a full Admin Panel (`AdminPanel.jsx` + `AdminDashboard.jsx`) currently using hardcoded local state from `adminData.js`. The backend must replace this with a real API so the Admin Panel can perform full CRUD against MongoDB Atlas.

---

## Entity Analysis (from frontend)

### Product fields (from `adminData.js` + `products.js`)
`id, name, category, categoryId, productType (subcategory), description, fabric (details/specifications), colors[], sizes[], moq, export, image, images[], status (Active|Draft), updatedAt`

### Category fields
`id, name, slug, description, image, subcategories[], status (Active|Draft)`

### Customer fields
`id, name, company, email, phone, country, address, notes, orders (count), spend, status (Active|Prospect), joined`

### Order fields
`id, customerId, customer (company name), country, products (label), productId, quantity, value, status (Pending|Processing|Shipped|Delivered|Cancelled), date, shipping`

### Inquiry fields (from Contact + Admin)
`id, customerId, productId, name, company, country, product (name), quantity, message, status (New|Contacted|In Progress|Converted|Closed), date`

### Contact Submission fields (from Contact.jsx)
`fullName, company, email, phone, country, interest (product interest), subject, message`

---

## Proposed Backend Folder Structure

```
backend/
├── .env
├── .env.example
├── package.json
├── server.js                    # Entry point
├── config/
│   ├── db.js                    # MongoDB Atlas connection
│   └── redis.js                 # Redis client setup
├── models/
│   ├── Category.js
│   ├── Product.js
│   ├── Customer.js
│   ├── Order.js
│   ├── Inquiry.js
│   └── ContactSubmission.js
├── controllers/
│   ├── categoryController.js
│   ├── productController.js
│   ├── customerController.js
│   ├── orderController.js
│   ├── inquiryController.js
│   ├── contactController.js
│   └── dashboardController.js
├── routes/
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── customerRoutes.js
│   ├── orderRoutes.js
│   ├── inquiryRoutes.js
│   ├── contactRoutes.js
│   └── dashboardRoutes.js
├── middleware/
│   ├── errorHandler.js          # Centralized error handling
│   ├── asyncHandler.js          # Async wrapper utility
│   ├── validateObjectId.js      # MongoDB ObjectId param validation
│   └── rateLimiter.js           # Express rate limiting
├── validators/
│   ├── categoryValidator.js
│   ├── productValidator.js
│   ├── customerValidator.js
│   ├── orderValidator.js
│   ├── inquiryValidator.js
│   └── contactValidator.js
├── services/
│   ├── cacheService.js          # Redis cache helpers
│   └── uploadService.js         # Image upload handling (multer)
└── utils/
    ├── apiResponse.js           # Standardized response format
    ├── generateId.js            # Custom ID generation (ORD-XXXX, INQ-XXX)
    └── logger.js                # Winston logger
```

---

## API Endpoints

### Dashboard `GET /api/dashboard/stats`
Returns: totalProducts, totalCategories, totalCustomers, totalOrders, openOrders, pendingOrders, processingOrders, shippedOrders, deliveredOrders, cancelledOrders, recentOrders[], newInquiries, activeInquiries

### Categories
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/categories | Get all categories (cached in Redis) |
| GET | /api/categories/:id | Get single category |
| POST | /api/categories | Create category |
| PUT | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |

### Products
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/products | Get all products (filter, search, pagination) |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product (with image upload) |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

### Customers
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/customers | Get all customers |
| GET | /api/customers/:id | Get customer + orders + inquiries |
| POST | /api/customers | Create customer |
| PUT | /api/customers/:id | Update customer |
| DELETE | /api/customers/:id | Delete customer |

### Orders
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/orders | Get all orders (filter by status) |
| GET | /api/orders/:id | Get order details |
| POST | /api/orders | Create order |
| PUT | /api/orders/:id | Update order |
| PATCH | /api/orders/:id/status | Update order status only |
| DELETE | /api/orders/:id | Delete order |

### Inquiries
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/inquiries | Get all inquiries |
| GET | /api/inquiries/:id | Get inquiry details |
| POST | /api/inquiries | Create inquiry |
| PUT | /api/inquiries/:id | Update inquiry |
| PATCH | /api/inquiries/:id/status | Update inquiry status only |
| DELETE | /api/inquiries/:id | Delete inquiry |

### Contact Submissions
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/contact | Submit contact form (saved to DB) |
| GET | /api/contact | Get all contact submissions (admin) |

---

## Key Relationships

```
Customer  ──< Orders    (customerId on Order)
Customer  ──< Inquiries (customerId on Inquiry)
Order     >── Product   (productId on Order)
Order     >── Customer  (customerId on Order)
Inquiry   >── Product   (productId on Inquiry)
Inquiry   >── Customer  (customerId on Inquiry)
Product   >── Category  (categoryId on Product)
```

---

## Redis Caching Strategy

| Cache Key | TTL | Invalidated On |
|-----------|-----|----------------|
| `categories:all` | 5 min | Category create/update/delete |
| `products:all` | 2 min | Product create/update/delete |
| `dashboard:stats` | 1 min | Any data change |

---

## Proposed Changes

### Backend (all NEW files)

#### [NEW] `backend/server.js`
#### [NEW] `backend/package.json`
#### [NEW] `backend/.env.example`
#### [NEW] `backend/config/db.js`
#### [NEW] `backend/config/redis.js`
#### [NEW] `backend/models/Category.js`
#### [NEW] `backend/models/Product.js`
#### [NEW] `backend/models/Customer.js`
#### [NEW] `backend/models/Order.js`
#### [NEW] `backend/models/Inquiry.js`
#### [NEW] `backend/models/ContactSubmission.js`
#### [NEW] All controllers, routes, middleware, validators, services, utils

### Frontend (1 bug fix only)
#### [MODIFY] `frontend/src/pages/Contact.jsx`
Fix duplicate `subject` key warning (line 99 + 107)

---

## Verification Plan

### Automated
- `npm run dev` in backend — server starts without errors
- All routes respond correctly via Postman/curl

### Manual
- CRUD operations for each entity via API
- Admin Panel can connect and read/write data
