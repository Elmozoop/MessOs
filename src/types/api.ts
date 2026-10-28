/**
 * API Type Definitions
 * Future backend integration types
 * Currently unused but prepared for when backend is added
 */

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  meta?: {
    timestamp: string;
    version: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  hostel: string;
  room: string;
  createdAt: string;
  updatedAt: string;
}

export interface MealConfirmation {
  id: string;
  studentId: string;
  mealId: string;
  willAttend: boolean;
  confirmedAt: string;
}

export interface MealSchedule {
  id: string;
  name: string;
  date: string;
  menu: string[];
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface WasteLog {
  id: string;
  date: string;
  wasteKg: number;
  attendance: number;
  recordedBy: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  hostel: string;
  room: string;
}
