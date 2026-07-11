import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getNote,
  updateNote,
} from "../../services/studentNotesService";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    class: "",
    subject: "",
    chapter: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    async function loadNote() {
      const note = await getNote(id);

      if (!note) {
        alert("Note not found");
        navigate("/admin/manage-notes");
        return;
      }

      setFormData({
        class: note.class,
        subject: note.subject,
        chapter: note.chapter,
        title: note.title,
        description: note.description,
      });

      setLoading(false);
    }

    loadNote();
  }, [id, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await updateNote(id, formData);

    alert("Note updated successfully.");

    navigate("/admin/manage-notes");
  }

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Note
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
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>Computer</option>
        </select>

        <input
          name="chapter"
          value={formData.chapter}
          onChange={handleChange}
          placeholder="Chapter"
          className="w-full rounded-xl border p-4"
        />

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full rounded-xl border p-4"
        />

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full rounded-xl border p-4"
        />

        <button
          className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}