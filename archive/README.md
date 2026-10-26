# Archived Modules (Temporary Storage)

This directory contains modules that have been removed from the active website per user request and preserved for future implementation or refactoring.

## Contents

### 1. `login_system/`
- **`AuthModal.tsx`**: Full authentication modal supporting Google/Apple OAuth mock flows, email/password login and registration, OTP verification, and error states.
- **`UserDashboard.tsx`**: Customer account dashboard showing user profile, previous order history, and account settings.
- **`authService.ts`**: Authentication session management, mock user stores, session storage persistence, and audit logging.

### 2. `admin_panel/`
- **`AdminPortal.tsx`**: Minimalist, cream-palette administrative dashboard with metrics, order management, customer directory, audit logs, and system controls.

### 3. `shop_product_pages/`
- **`ProductDetailPage.tsx`**: Dedicated product detail view for Kiyoki air purifiers (X3, X5, X8), including technical specifications, interactive controls, media showcase, and purchase options.

---

## Restoring to Active Site

When ready to re-integrate any of these modules:
1. Move the desired files back into `src/components/` (and `src/services/` for `authService.ts`).
2. Update `src/App.tsx` and `src/components/Header.tsx` to mount the routes, states, and UI triggers.
