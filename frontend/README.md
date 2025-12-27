# React TypeScript Boilerplate

Boilerplate template để khởi tạo nhanh một dự án React với TypeScript, bao gồm các cấu hình cơ bản và best practices sẵn có.

## 🎯 Mục tiêu

Template này được tạo ra để giúp bạn bắt đầu một dự án React + TypeScript một cách nhanh chóng với:

- Cấu hình sẵn các công cụ cần thiết (Vite, ESLint, Prettier)
- Cấu trúc thư mục rõ ràng và dễ mở rộng
- Path aliases để import code dễ dàng
- Routing với React Router
- State management với Zustand
- HTTP client với Axios
- Toast notifications

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Vite 6** - Build tool và dev server
- **React Router DOM v7** - Routing
- **Zustand 5** - State management
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

## 🚀 Cách bắt đầu

### Yêu cầu

- Node.js >= 18 (khuyến nghị >= 20)
- Yarn hoặc npm

### Cài đặt

```bash
# Cài đặt dependencies
yarn install
# hoặc
npm install
```

### Chạy development server

```bash
yarn dev
# hoặc
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build cho production

```bash
yarn build
# hoặc
npm run build
```

### Preview production build

```bash
yarn preview
# hoặc
npm run preview
```

## 📁 Cấu trúc thư mục

```
src/
├── apis/              # Axios client configuration
├── assets/            # Static assets (images, fonts)
├── components/        # Reusable components
├── constants/         # Application constants
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── interfaces/        # TypeScript interfaces
├── pages/             # Page components
├── router/            # Routing configuration
├── stores/            # Zustand stores
├── utils/             # Utility functions
└── main.tsx           # Application entry point
```

## ⚙️ Cấu hình

### Environment Variables

Tạo file `.env` trong thư mục root:

```env
VITE_API_URL=http://localhost:5000
```

### Path Aliases

Dự án sử dụng path aliases để import code dễ dàng:

```typescript
import { ROUTES_APP } from "@constants";
import { AuthProvider } from "@contexts/AuthProvider";
import useAuth from "@hooks/useAuth";
```

Các alias được cấu hình trong `vite.config.ts`:

- `@apis` → `./src/apis`
- `@assets` → `./src/assets`
- `@components` → `./src/components`
- `@constants` → `./src/constants`
- `@contexts` → `./src/contexts`
- `@hooks` → `./src/hooks`
- `@interfaces` → `./src/interfaces`
- `@pages` → `./src/pages`
- `@router` → `./src/router`
- `@stores` → `./src/stores`
- `@utils` → `./src/utils`

## 🔄 Scripts

- `yarn dev` - Chạy development server
- `yarn build` - Build cho production
- `yarn preview` - Preview production build
- `yarn lint` - Kiểm tra linting errors
- `yarn lint:fix` - Tự động fix linting errors
- `yarn format` - Format code với Prettier
