import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getHomeworkById,
  updateHomework,
} from "../../services/studentHomeworkService";

export default function EditHomework() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    class: "",
    subject: "",
    chapter: "",
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    async function loadHomework() {
      const homework =
        await getHomeworkById(id);

      if (!homework) {
        alert("Homework not found.");

        navigate("/admin/manage-homework");

        return;
      }

      setFormData({
        class: homework.class,
        subject: homework.subject,
        chapter: homework.chapter,
        title: homework.title,
        description:
          homework.description,
        dueDate: homework.dueDate,
      });

      setLoading(false);
    }

    loadHomework();
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

    try {
      await updateHomework(
        id,
        formData
      );

      alert(
        "Homework updated successfully."
      );

      navigate(
        "/admin/manage-homework"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update homework."
      );

    }
  }

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Homework...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="mb-8 text-3xl font-bold">

        Edit Homework

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

          {[6, 7, 8, 9, 10].map(
            (cls) => (
              <option
                key={cls}
                value={cls}
              >
                Class {cls}
              </option>
            )
          )}

        </select>

        {/* Subject */}

        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        >

          <option>
            Mathematics
          </option>

          <option>
            Science
          </option>

          <option>
            English
          </option>

          <option>
            Computer
          </option>

        </select>

        {/* Chapter */}

        <input
          name="chapter"
          value={formData.chapter}
          onChange={handleChange}
          placeholder="Chapter"
          className="w-full rounded-xl border p-4"
        />

        {/* Title */}

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Homework Title"
          className="w-full rounded-xl border p-4"
        />

        {/* Description */}

        <textarea
          rows={6}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Homework Instructions"
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

        {/* Save */}

        <button
          className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >

          Save Changes

        </button>

      </form>

    </div>
  );
}