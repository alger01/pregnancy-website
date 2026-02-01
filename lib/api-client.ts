/**
 * Extracts error message from API response
 * @param response - The fetch Response object
 * @returns Promise that resolves to the error message string
 */
export async function getErrorMessageFromResponse(response: Response): Promise<string> {
  try {
    const data = await response.json()
    // Check if the response has a message field (our API format)
    if (data.message) {
      return data.message
    }
    // Fallback to error field if message doesn't exist
    if (data.error) {
      return data.error
    }
    // Fallback to status text
    return response.statusText || "An error occurred"
  } catch {
    // If JSON parsing fails, return status text
    return response.statusText || "An error occurred"
  }
}

/**
 * Handles API errors and extracts the error message
 * @param error - The error object from catch block
 * @param response - Optional response object if available
 * @returns Promise that resolves to the error message string
 */
export async function handleApiError(error: unknown, response?: Response): Promise<string> {
  if (response) {
    return await getErrorMessageFromResponse(response)
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return "An unexpected error occurred"
}

