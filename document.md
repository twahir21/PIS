
# 📘 Passenger Information System (PIS) Documentation

## **1. Project Overview**

The **Passenger Information System** provides real-time bus schedule updates, including departure, arrival, and status (on-time/delayed).
Key components:

* **Frontend (Qwik or Next.js)** → Public-facing display (station monitors, mobile web).
* **Backend (Elysia + Bun)** → REST API / GraphQL API for schedules, buses, stations.
* **Database (Postgres + Drizzle ORM)** → Store buses, routes, stations, and schedules.
* **Admin Dashboard (Next.js or Qwik)** → For operators to add, edit, and monitor bus schedules.

---

## **2. Phases of Development**

### **Phase 1: Planning & Design**

* Gather requirements (which stations, how many buses, user roles).
* Create **ERD (Entity Relationship Diagram)** for DB.
* Finalize UI mockups (frontend + admin).

**Deliverables:** Wireframes, DB schema, project roadmap.

---

### **Phase 2: Backend Development**

* Setup **Elysia + Bun** server.
* Setup **Drizzle ORM** with Postgres.
* Implement API endpoints:

  * `GET /buses` → all buses with status
  * `GET /buses/:id` → specific bus details
  * `POST /buses` → add a new bus (admin only)
  * `PUT /buses/:id` → update status/schedule
  * `DELETE /buses/:id` → remove bus

**Deliverables:** Working backend API with auth + validation.

---

### **Phase 3: Database Setup**

* Tables (Postgres + Drizzle migrations):

  * **users** (id, username, password\_hash, role)
  * **buses** (id, plate\_no, from\_city, to\_city, station\_id)
  * **stations** (id, name, location)
  * **schedules** (id, bus\_id, departure, arrival, status)

**Deliverables:** Database schema + migrations.

---

### **Phase 4: Admin Dashboard**

* Built with **Next.js (recommended for ecosystem)** or **Qwik (if you want resumability speed)**.
* Features:

  * Login/logout (JWT/Auth).
  * Manage buses, routes, schedules.
  * View reports (delays, departures).

**Deliverables:** Secure admin panel with CRUD features.

---

### **Phase 5: Public Frontend (Display System)**

* Use **Qwik/Next.js + Tailwind** for responsive UI.
* Live update from backend via **WebSocket / SSE**.
* Show bus timetable like your prototype.

**Deliverables:** Public display site that auto-refreshes in real-time.

---

### **Phase 6: Testing & Deployment**

* Unit tests for backend APIs.
* Integration tests for admin actions.
* Deploy backend on a VPS (Bun + Postgres).
* Deploy frontend (Vercel/Netlify or Docker container).

**Deliverables:** Production-ready system.

---

## **3. 📊 Estimated Budget (TZS)**

| **Category**       | **Details**                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **Tech Stack**     | Backend: Elysia + Bun • DB: PostgreSQL + Drizzle ORM • Frontend: Qwik/Next.js |
| **Timeline**       | **1 week (7 days)**                                                        |
| **Budget**         | **800,000 – 1,200,000 TZS** (scalable)                                     |
| **Deployment**     | Bun server + PostgreSQL (VPS/Cloud)                                        |

---

### **📅 Development Phases Breakdown**  
| **Phase**          | **Tasks**                                                                 | **Days**   |
|--------------------|---------------------------------------------------------------------------|------------|
| **Planning & Setup** | Requirements gathering, DB schema design, project setup                  | Day 1      |
| **Backend**        | API development (CRUD, auth, status tracking), security hardening        | Day 2–3    |
| **Admin Dashboard**| Qwik/Next.js panel for bus/schedule management                           | Day 4      |
| **Public Frontend**| Passenger UI with live schedules, status updates                         | Day 5      |
| **Testing & Deployment** | Integration testing, deployment, optimization                          | Day 6–7    |

---

### **💰 Budget Allocation (Estimated)**  
| **Component**      | **Cost Range (TZS)**   | **Notes**                                  |
|--------------------|------------------------|--------------------------------------------|
| Backend Development| 300,000 – 400,000     | API logic, auth, DB integration           |
| Frontend Development| 250,000 – 350,000    | Admin dashboard + passenger UI             |
| Database Setup     | 100,000 – 150,000     | PostgreSQL hosting, migrations            |
| Deployment         | 50,000 – 100,000      | VPS/Cloud costs (Bun + Postgres)          |
| Contingency        | 100,000 – 200,000     | Unplanned adjustments, testing fixes      |
| **Total**          | **800,000 – 1,200,000** | Scalable based on feature refinements    |

---

### **🔑 Key Notes**  
- **Assumptions**: Solo developer, basic admin features, single deployment environment.  
- **Flexibility**: Budget can adjust for additional features (e.g., real-time alerts, mobile app).  
- **Cost-Savers**: Open-source stack (Bun, Postgres) avoids licensing fees.  

--- 

### **📝 Stakeholder Recommendations**  
1. **Prioritize**: Core features (schedule tracking, admin controls) within the 1-week timeline.  
2. **Scale Later**: Add real-time updates (WebSockets) post-launch if budget allows.  
3. **Hosting**: Use affordable VPS providers (e.g., DigitalOcean, Hetzner).  

Let me know if you'd like a **visual Gantt chart** or **risk assessment** to accompany this! 🚀

## **4. Tech Stack Summary**

* **Backend:** Bun + Elysia (fast, modern, lightweight).
* **Database:** Postgres + Drizzle ORM (safe, type-checked).
* **Frontend (Public):** Qwik or Next.js (with TailwindCSS).
* **Admin Panel:** Next.js/Qwik (with TailwindCSS).
* **Deployment:** VPS (Yatosha VPS Tanzania) or local Tanzanian host.

---