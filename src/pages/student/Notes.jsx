import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";

import { getNotes } from "../../services/studentNotesService";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

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
        Study Notes
      </h1>

      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {notes.map((note) => (

            <div
              key={note.id}
              className="rounded-3xl bg-white p-6 shadow-lg"
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