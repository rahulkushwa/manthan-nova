import { useState } from "react";

export default function StudentForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    parentName: initialData.parentName || "",
    parentPhone: initialData.parentPhone || "",
    class: initialData.class || "",
    board: initialData.board || "CBSE",
    school: initialData.school || "",
    address: initialData.address || "",
    admissionDate:
      initialData.admissionDate ||
      new Date().toISOString().split("T")[0],
    status: initialData.status || "active",
    role: "student",
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
    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-8 shadow-lg"
    >
      <div className="grid gap-6 md:grid-cols-2">

        <input
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-xl border p-4"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-xl border p-4"
          required
        />

        <input
          name="phone"
          placeholder="Student Phone"
          value={formData.phone}
          onChange={handleChange}
          className="rounded-xl border p-4"
        />

        <input
          name="parentName"
          placeholder="Parent Name"
          value={formData.parentName}
          onChange={handleChange}
          className="rounded-xl border p-4"
        />

        <input
          name="parentPhone"
          placeholder="Parent Phone"
          value={formData.parentPhone}
          onChange={handleChange}
          className="rounded-xl border p-4"
        />

        <select
          name="class"
          value={formData.class}
          onChange={handleChange}
          className="rounded-xl border p-4"
          required
        >
          <option value="">Select Class</option>
          {[6, 7, 8, 9, 10].map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>

        <select
          name="board"
          value={formData.board}
          onChange={handleChange}
          className="rounded-xl border p-4"
        >
          <option>CBSE</option>
          <option>ICSE</option>
          <option>WB Board</option>
        </select>

        <input
          name="school"
          placeholder="School Name"
          value={formData.school}
          onChange={handleChange}
          className="rounded-xl border p-4"
        />

        <input
          type="date"
          name="admissionDate"
          value={formData.admissionDate}
          onChange={handleChange}
          className="rounded-xl border p-4"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded-xl border p-4"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

      </div>

      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        rows={4}
        className="mt-6 w-full rounded-xl border p-4"
      />

      <button
        type="submit"
        className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
      >
        Save Student
      </button>
    </form>
  );
}