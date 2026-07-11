import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Trash2, Pencil } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "../../firebase/firestore";
import { getAllNotes } from "../../services/studentNotesService";

export default function ManageNotes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadNotes() {
    try {
      const data = await getAllNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "notes", id));

      setNotes((prev) => prev.filter((note) => note.id !== id));

      alert("Note deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete note.");
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Notes...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Manage Notes
      </h1>

      {notes.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
          <h2 className="text-xl font-semibold">
            No notes found.
          </h2>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
                <FileText
                  size={30}
                  className="text-white"
                />
              </div>

              <h2 className="text-xl font-bold">
                {note.title}
              </h2>

              <p className="mt-2 text-slate-500">
                Class {note.class}
              </p>

              <p className="text-slate-500">
                {note.subject}
              </p>

              <p className="text-slate-500">
                {note.chapter}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-note/${note.id}`)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white transition hover:bg-amber-600"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(note.id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}