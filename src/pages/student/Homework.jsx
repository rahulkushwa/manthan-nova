import { useEffect, useState } from "react";
import {
  Download,
  FileText,
  CalendarDays,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

import { getHomework } from "../../services/studentHomeworkService";

export default function Homework() {
  const { profile } = useAuth();

  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    async function fetchHomework() {
      try {
        console.log(
          "Student Profile:",
          profile
        );

        console.log(
          "Searching Homework for Class:",
          profile.class
        );

        const data =
          await getHomework(profile.class);

        console.log(
          "Homework Returned:",
          data
        );

        setHomeworks(data);

      } catch (error) {

        console.error(
          "Homework Error:",
          error
        );

      } finally {

        setLoading(false);

      }
    }

    fetchHomework();
  }, [profile]);

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Homework...
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Homework

        </h1>

        {profile && (

          <p className="mt-2 text-slate-500">

            Class {profile.class}
            {" • "}
            {profile.board}

          </p>

        )}

      </div>

      {/* Empty */}

      {homeworks.length === 0 ? (

        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

          <h2 className="text-xl font-semibold">

            No homework available.

          </h2>

          <p className="mt-2 text-slate-500">

            Your teacher hasn't assigned any homework yet.

          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {homeworks.map((homework) => (

            <div
              key={homework.id}
              className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Icon */}

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">

                <FileText
                  size={30}
                  className="text-white"
                />

              </div>

              {/* Title */}

              <h2 className="text-xl font-bold">

                {homework.title}

              </h2>

              {/* Details */}

              <p className="mt-2 text-slate-500">

                Class {homework.class}

              </p>

              <p className="text-slate-500">

                {homework.subject}

              </p>

              <p className="text-slate-500">

                {homework.chapter}

              </p>

              {/* Due Date */}

              <div className="mt-4 flex items-center gap-2 text-red-600">

                <CalendarDays size={18} />

                <span className="font-semibold">

                  Due: {homework.dueDate}

                </span>

              </div>

              {/* Description */}

              <p className="mt-4 line-clamp-4 text-slate-600">

                {homework.description}

              </p>

              {/* Attachment */}

              {homework.attachmentUrl && (

                <a
                  href={homework.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >

                  <Download size={18} />

                  Download Attachment

                </a>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}