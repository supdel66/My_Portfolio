import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ijqwfagyyirlrvsexqmo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcXdmYWd5eWlybHJ2c2V4cW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MjI3NDMsImV4cCI6MjA3NTI5ODc0M30.I-SZkRD9QVy6Nb6-CBQyPgZdvjD8hAg4fUfBdW9ljh8');

try {
    const { data, error } = await supabase.storage.from('visitors').list();
    console.log("Data length:", data ? data.length : "none");
    if (data && data.length > 0) {
        console.log("First item:", data[0].name);
    }
    if (error) {
        console.error("Supabase Error:", error);
    }
} catch (err) {
    console.error("Caught error:", err.message || err);
}
