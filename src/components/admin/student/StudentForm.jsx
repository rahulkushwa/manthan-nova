import { useState } from "react";
import toast from "react-hot-toast";

import { findUserByEmail } from "../../../services/userService";

export default function StudentForm({
  onSubmit,
  initialData = {},
}) {
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

  const [linkedUid, setLinkedUid] = useState(
    initialData.uid || ""
  );

  const [checking, setChecking] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleVerifyAccount() {
    if (!formData.email.trim()) {
      toast.error("Enter email first.");
      return;
    }

    setChecking(true);

    try {
      const user = await findUserByEmail(
        formData.email
      );

      if (!user) {
        toast.error(
          "Firebase account not found."
        );
        setLinkedUid("");
        return;
      }

      setLinkedUid(user.uid);

      toast.success(
        "Firebase account linked successfully."
      );
    } catch (error) {
      console.error(error);
      toast.error(
        "Verification failed."
      );
    } finally {
      setChecking(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!linkedUid) {
      toast.error(
        "Please verify Firebase account first."
      );
      return;
    }

    onSubmit({
      ...formData,
      uid: linkedUid,
    });
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

        {/* Email */}

        <div className="md:col-span-2">

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
            required
          />

          <div className="mt-3 flex items-center gap-4">

            <button
              type="button"
              onClick={handleVerifyAccount}
              disabled={checking}
              className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {checking
                ? "Checking..."
                : "Verify Account"}
            </button>

            {linkedUid && (
              <span className="font-semibold text-green-600">
                ✓ Account Linked
              </span>
            )}

          </div>

        </div>

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
          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
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
        className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
      >
        Save Student
      </button>

    </form>
  );
}