import { useState } from "react";
import { uploadHomework } from "../../services/homeworkService";

export default function UploadHomework() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    class: "",
    subject: "",
    chapter: "",
    title: "",
    description: "",
    dueDate: "",
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
      !formData.description ||
      !formData.dueDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await uploadHomework(formData);

      alert("Homework published successfully!");

      setFormData({
        class: "",
        subject: "",
        chapter: "",
        title: "",
        description: "",
        dueDate: "",
        file: null,
      });

      e.target.reset();

    } catch (error) {

      console.error(error);

      alert("Failed to publish homework.");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="p-8">

      <h1 className="mb-8 text-3xl font-bold">

        Upload Homework

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl bg-white p-8 shadow-lg"
      >

        {/* Class */}

        <select
          name="class"
          value={formData.class}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        >

          <option value="">

            Select Class

          </option>

          {[6, 7, 8, 9, 10].map((cls) => (

            <option
              key={cls}
              value={cls}
            >

              Class {cls}

            </option>

          ))}

        </select>

        {/* Subject */}

        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        >

          <option value="">

            Select Subject

          </option>

          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>Computer</option>

        </select>

        {/* Chapter */}

        <input
          name="chapter"
          placeholder="Chapter"
          value={formData.chapter}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        {/* Title */}

        <input
          name="title"
          placeholder="Homework Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        {/* Description */}

        <textarea
          rows={6}
          name="description"
          placeholder="Homework Instructions"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        {/* Due Date */}

        <div>

          <label className="mb-2 block font-semibold">

            Due Date

          </label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Attachment */}

        <div>

          <label className="mb-2 block font-semibold">

            Attachment (Optional)

          </label>

          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

          <p className="mt-2 text-sm text-slate-500">

            Leave empty if the homework doesn't require a worksheet.

          </p>

        </div>

        {/* Submit */}

        <button
          disabled={loading}
          className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >

          {loading
            ? "Publishing..."
            : "Publish Homework"}

        </button>

      </form>

    </div>
  );
}