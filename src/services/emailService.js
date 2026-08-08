import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const STUDENT_PORTAL_URL =
  "https://manthan-nova.vercel.app/";

export async function sendStudentCredentialsEmail({
  studentName,
  loginEmail,
  temporaryPassword,
  recipientEmail,
}) {
  if (!recipientEmail) {
    throw new Error(
      "Recipient email is required."
    );
  }

  const templateParams = {
    to_email: recipientEmail,
    student_name: studentName,
    login_email: loginEmail,
    temporary_password: temporaryPassword,
    portal_url: STUDENT_PORTAL_URL,
    message:
      "Your Manthan Nova student account has been created. Please use these credentials to log in to the Manthan Nova Student Portal.",
  };

  return await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    {
      publicKey: EMAILJS_PUBLIC_KEY,
    }
  );
}