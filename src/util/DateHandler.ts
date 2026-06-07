import { format, parseISO } from "date-fns";

class DateHandler {
  /**
   * Formats a database date string (e.g. "2026-05-24 16:55:43.966059+00")
   * into "dd/MM/yyyy HH'h'mm" format (e.g. "24/05/2026 16h55").
   * 
   * @param dateInput - The date string or Date object
   * @returns Formatted date string
   */
  static formatReleaseDate(dateInput: string | Date): string {
    if (!dateInput) return "";
    
    try {
      const parsedDate = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
      
      if (isNaN(parsedDate.getTime())) {
        return "";
      }
      
      return format(parsedDate, "dd/MM/yyyy HH'h'mm");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  }
}

export { DateHandler };
