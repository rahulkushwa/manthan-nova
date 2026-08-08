import { useState } from "react";
import {
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

export default function StudentForm({
  onSubmit,
  initialData = {},
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    loginEmail:
      initialData.loginEmail || "",
    parentEmail:
      initialData.parentEmail || "",
    temporaryPassword: "",

    phone: initialData.phone || "",

    parentName:
      initialData.parentName || "",

    parentPhone:
      initialData.parentPhone || "",

    class: initialData.class || "",

    board:
      initialData.board || "CBSE",

    school:
      initialData.school || "",

    address:
      initialData.address || "",

    admissionDate:
      initialData.admissionDate ||
      new Date()
        .toISOString()
        .split("T")[0],

    status:
      initialData.status || "active",

    role: "student",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function generatePassword() {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@$";

    let password = "MN@";

    for (let i = 0; i < 6; i++) {
      password +=
        chars[
          Math.floor(
            Math.random() *
              chars.length
          )
        ];
    }

    setFormData((prev) => ({
      ...prev,
      temporaryPassword: password,
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

{/* ================= Student Information ================= */}

<h2 className="mb-6 text-2xl font-bold text-slate-900">
  Student Information
</h2>

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
    name="loginEmail"
    type="email"
    placeholder="Student Login Email"
    value={formData.loginEmail}
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

</div>

{/* ================= Parent Information ================= */}

<h2 className="mt-10 mb-6 text-2xl font-bold text-slate-900">
  Parent Information
</h2>

<div className="grid gap-6 md:grid-cols-2">

  <input
    name="parentName"
    placeholder="Parent Name"
    value={formData.parentName}
    onChange={handleChange}
    className="rounded-xl border p-4"
  />

  <input
    name="parentEmail"
    type="email"
    placeholder="Parent Email"
    value={formData.parentEmail}
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

</div>

{/* ================= Account Information ================= */}

<h2 className="mt-10 mb-6 text-2xl font-bold text-slate-900">
  Account Information
</h2>

<div className="grid gap-6 md:grid-cols-2">

  <div className="relative">

    <input
      type={
        showPassword
          ? "text"
          : "password"
      }
      name="temporaryPassword"
      placeholder="Temporary Password"
      value={formData.temporaryPassword}
      onChange={handleChange}
      className="w-full rounded-xl border p-4 pr-12"
      required
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword(!showPassword)
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>

  </div>

  <button
    type="button"
    onClick={generatePassword}
    className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 p-4 font-semibold text-white transition hover:bg-amber-600"
  >
    <RefreshCw size={18} />
    Generate Password
  </button>

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
    <option value="active">
      Active
    </option>

    <option value="inactive">
      Inactive
    </option>
  </select>

</div>

      <div className="mt-8">

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border p-4"
        />

      </div>

      <div className="mt-8 flex justify-end">

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          Save Student
        </button>

      </div>

    </form>
  );
}