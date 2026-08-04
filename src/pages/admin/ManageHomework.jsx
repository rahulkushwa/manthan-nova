import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Trash2,
  Pencil,
  CalendarDays,
  Download,
} from "lucide-react";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firestore";

import { getAllHomework } from "../../services/studentHomeworkService";

export default function ManageHomework() {
  const navigate = useNavigate();

  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHomework() {
    try {
      const data = await getAllHomework();

      setHomeworks(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    loadHomework();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this homework?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(
        doc(db, "homeworks", id)
      );

      setHomeworks((prev) =>
        prev.filter(
          (homework) =>
            homework.id !== id
        )
      );

      alert("Homework deleted successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to delete homework.");

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

        Manage Homework

      </h1>

      {homeworks.length === 0 ? (

        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

          <h2 className="text-xl font-semibold">

            No homework available.

          </h2>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {homeworks.map((homework) => (

            <div
              key={homework.id}
              className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">

                <FileText
                  size={30}
                  className="text-white"
                />

              </div>

              <h2 className="text-xl font-bold">

                {homework.title}

              </h2>

              <p className="mt-2 text-slate-500">

                Class {homework.class}

              </p>

              <p className="text-slate-500">

                {homework.subject}

              </p>

              <p className="text-slate-500">

                {homework.chapter}

              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-red-600">

                <CalendarDays size={16} />

                Due :

                <span className="font-semibold">

                  {homework.dueDate}

                </span>

              </div>

              <p className="mt-4 line-clamp-3 text-slate-600">

                {homework.description}

              </p>

              {homework.attachmentUrl && (

                <a
                  href={homework.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >

                  <Download size={18} />

                  View Attachment

                </a>

              )}

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() =>
                    navigate(
                      `/admin/edit-homework/${homework.id}`
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white transition hover:bg-amber-600"
                >

                  <Pencil size={18} />

                  Edit

                </button>

                <button
                  onClick={() =>
                    handleDelete(homework.id)
                  }
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