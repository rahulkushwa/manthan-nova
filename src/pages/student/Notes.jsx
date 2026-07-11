import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { getNotes } from "../../services/studentNotesService";

export default function Notes() {
  const { profile } = useAuth();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    async function fetchNotes() {
      try {
        console.log("Student Profile:", profile);
        console.log("Searching for class:", profile.class);

        const data = await getNotes(profile.class);

        console.log("Notes Returned:", data);

        setNotes(data);
      } catch (error) {
        console.error("Notes Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [profile]);

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Notes...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Study Notes
        </h1>

        {profile && (
          <p className="mt-2 text-slate-500">
            Class {profile.class} • {profile.board}
          </p>
        )}
      </div>

      {notes.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
          <h2 className="text-xl font-semibold">
            No notes available for your class.
          </h2>

          <p className="mt-2 text-slate-500">
            Your teacher hasn't uploaded any notes yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
                <FileText size={30} className="text-white" />
              </div>

              <h2 className="text-xl font-bold">{note.title}</h2>

              <p className="mt-2 text-slate-500">
                Class {note.class}
              </p>

              <p className="text-slate-500">{note.subject}</p>

              <p className="text-slate-500">{note.chapter}</p>

              <p className="mt-4 line-clamp-3 text-slate-600">
                {note.description}
              </p>

              <a
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <Download size={18} />
                Download PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}