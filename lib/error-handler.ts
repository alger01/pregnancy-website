/**
 * Extracts a user-friendly error message from an error object
 * @param error - The error object (can be Error, string, or unknown)
 * @returns A string message that can be safely sent to the client
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === "string") {
    return error
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message)
  }
  return "An unexpected error occurred"
}

/**
 * Determines the appropriate HTTP status code based on error message
 * @param error - The error object
 * @returns HTTP status code
 */
export function getErrorStatus(error: unknown): number {
  const message = getErrorMessage(error).toLowerCase()
  
  if (message.includes("unauthorized") || message.includes("forbidden")) {
    return 401
  }
  if (message.includes("not found")) {
    return 404
  }
  if (message.includes("validation") || message.includes("invalid") || message.includes("required")) {
    return 400
  }
  
  return 500
}

