import { useState } from "react";
import { uploadNote } from "../../services/notesService";

export default function UploadNotes() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    class: "",
    subject: "",
    chapter: "",
    title: "",
    description: "",
    file: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.class ||
      !formData.subject ||
      !formData.chapter ||
      !formData.title ||
      !formData.file
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await uploadNote(formData);

      alert("Notes uploaded successfully!");

      setFormData({
        class: "",
        subject: "",
        chapter: "",
        title: "",
        description: "",
        file: null,
      });

      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">

      <h1 className="mb-8 text-3xl font-bold">
        Upload Notes
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl bg-white p-8 shadow-lg"
      >

        <select
          name="class"
          value={formData.class}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        >
          <option value="">Select Class</option>

          {[6, 7, 8, 9, 10].map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>

        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        >
          <option value="">Select Subject</option>

          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>Computer</option>
        </select>

        <input
          name="chapter"
          placeholder="Chapter"
          value={formData.chapter}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <textarea
          rows={5}
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          type="file"
          name="file"
          accept=".pdf"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <button
          disabled={loading}
          className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Notes"}
        </button>

      </form>

    </div>
  );
}