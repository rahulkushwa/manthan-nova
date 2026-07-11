import { useState } from "react";

export default function EditNote() {
  const [formData, setFormData] = useState({
    class: "9",
    subject: "Science",
    chapter: "",
    title: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);
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
          {[6,7,8,9,10].map((cls)=>(
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

        <button
          className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}